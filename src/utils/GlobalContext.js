import React, { createContext, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import axios from "axios";

export const GlobalContext = createContext(null);

const GlobalContextProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [serviceError, setServiceError] = useState(false);
  const [lastResponse, setLastResponse] = useState(false);
  const [isRevision, setIsRevision] = useState(null);
  const [pageTitle, setPageTitle] = useState("");

  const axiosInstance = useMemo(
    () =>
      axios.create({
        // baseURL: SERVER_URL,
        // headers: {
        //   "Content-Type": "application/json",
        //   Accept: "*/*",
        //   "Access-Control-Allow-Origin": "*",
        //   //   common: {
        //   //     Authorization: `Bearer ${token}`,
        //   //   },
        // },
      }),
    []
  );

  useEffect(() => {
    setLoadingScreen(true);

    axiosInstance.interceptors.request.use((config) => {
      setLoadingScreen(true);
      return config;
    });

    axiosInstance.interceptors.response.use(
      (response) => {
        setLoadingScreen(false);
        setLastResponse(response.request.responseURL.includes("refresh"));
        return response?.data?.data ?? response?.data ?? response;
      },
      (error) => {
        if (error.response) {
          if (error.response.status === 401) {
            if (location.pathname !== routes.login.url) {
              location.href = routes.login.url;
            }
          }
          setLoadingScreen(false);
        } else if (error.request) {
          console.log("Request Error:", error.request);
        } else {
          console.log("Error:", error.message);
        }

        if (error?.response?.data) {
          setServiceError(
            error?.response?.data?.code || error?.response?.data?.description
          );
        }

        // return Promise.reject(error);
      }
    );
  }, [axiosInstance]);

  const fetcher = async (url) => {
    setLoadingScreen(true);
    try {
      const response = await axiosInstance.get(url);
      setLoadingScreen(false);
      return response?.data?.data || response?.data || response;
    } catch (reponseError) {
      const error = new Error("Bir hata oluştu.");
      setLoadingScreen(false);
      error.code =
        reponseError?.response?.data?.code ||
        reponseError?.response?.data?.description;
      throw error;
    }
  };

  const swrOptions = {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    // Diğer SWR seçeneklerini buraya ekleyebilirsiniz
  };

  const useGetData = (url) => {
    const { data, error, mutate, isValidating } = useSWR(
      url,
      fetcher,
      swrOptions
    );

    return {
      data,
      error,
      isLoading: !data && !error,
      mutate,
      isValidating,
    };
  };

  return (
    <GlobalContext.Provider
      value={{
        loading,
        useGetData,
        setLoading,
        axios: axiosInstance,
        serviceError,
        setServiceError,
        loadingScreen,
        setLoadingScreen,
        isRevision,
        setIsRevision,
        pageTitle,
        setPageTitle,
      }}
    >
      {!loading && props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
