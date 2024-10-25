import { Alert, Keyboard, Pressable, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useFormik } from "formik";
import * as yup from "yup";
import useGlobal from "../../utils/useGlobal";
import { useEffect, useState } from "react";
import TextField from "../../components/TextField";
import Stack from "../../components/Stack";
import CheckBox from "../../components/CheckBox";

const Login = () => {
  const [open, setOpen] = useState(false);

  const gContext = useGlobal();
  const { data, mutate } = gContext.useGetData(
    "http://192.168.1.189:8080/users"
  );

  useEffect(() => {
    mutate();
    console.log(data);
  }, [open, data]);

  const onSubmit = (values) => {};

  const formik = useFormik({
    initialValues: { username: "", password: "", rememberMe: true },
    validationSchema: yup.object({
      username: yup.string().required("Username required"),
      password: yup.string().required("Password Required"),
    }),
    onSubmit: onSubmit,
  });

  const submitNotification = () => {
    formik.handleSubmit();

    if (Object.values(formik.errors).length > 0 || !formik.values.username)
      Alert.alert("Uyarı", JSON.stringify(Object.values(formik.errors)));
  };

  return (
    <Pressable
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={Keyboard.dismiss}
    >
      <Stack
        style={{ width: "90%", height: "90%" }}
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        {/*<Text>{data?.user || data?.content}</Text>*/}
        <Stack
          direction="column"
          style={{ width: "80%", height: "80%" }}
          justifyContent="flex-start"
          alignItems="center"
          spacing={80}
        >
          <Text
            variant="displayLarge"
            style={{ fontWeight: 700, color: "#225aeb" }}
          >
            Login
          </Text>
          <Stack direction="column" alignItems="center" spacing={10}>
            <View style={{ width: "100%" }}>
              <Text>Email</Text>
              <TextField
                keyboardType="email-address"
                style={{ backgroundColor: "#ededed", borderRadius: 5 }}
                value={formik.values.username}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                onChangeText={(text) => formik.setFieldValue("username", text)}
              />
            </View>

            <Stack direction="column">
              <View style={{ width: "100%" }}>
                <Text>Password</Text>
                <TextField
                  keyboardType="name-phone-pad"
                  style={{ backgroundColor: "#ededed", borderRadius: 5 }}
                  value={formik.values.password}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  onChangeText={(text) =>
                    formik.setFieldValue("password", text)
                  }
                />
              </View>

              <Stack
                alignItems="center"
                width={"60%"}
                justifyContent="space-between"
              >
                <CheckBox
                  title="Remember Me"
                  color="#e1e2e2"
                  activeColor="black"
                  value={formik.values.rememberMe}
                  onPress={() =>
                    formik.setFieldValue(
                      "rememberMe",
                      !formik.values.rememberMe
                    )
                  }
                />
                <Button textColor="#225aeb">Forgot Password?</Button>
              </Stack>
            </Stack>
            <Button
              contentStyle={{ padding: 10 }}
              style={{
                borderRadius: 5,
                width: "95%",
                marginTop: 40,
              }}
              buttonColor="#225aeb"
              mode="contained"
              onPress={submitNotification}
            >
              Login
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Pressable>
  );
};

export default Login;
