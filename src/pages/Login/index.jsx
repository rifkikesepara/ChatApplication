import { Alert, Keyboard, Pressable } from "react-native";
import { Button, Switch, Text } from "react-native-paper";
import Stack from "../../components/Stack";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "../../components/TextField";
import useGlobal from "../../utils/useGlobal";
import { useEffect, useState } from "react";

const Login = () => {
  const [open, setOpen] = useState(false);

  const gContext = useGlobal();
  const { data, mutate } = gContext.useGetData(
    open
      ? "http://192.168.1.6:8080/hello?name=rifki"
      : "https://run.mocky.io/v3/0928fdf5-59a1-4bdb-a8db-10e00d70592e"
  );

  useEffect(() => {
    mutate();
    // console.log(data);
  }, [open]);

  const onSubmit = (values) => {};

  const formik = useFormik({
    initialValues: { username: "", password: "" },
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
        style={{ backgroundColor: "red", width: "90%", height: "90%" }}
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Text>{data?.user || data?.content}</Text>
        <Stack
          direction="column"
          style={{ width: "80%" }}
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <TextField
            label="username"
            value={formik.values.username}
            error={formik.touched.username && Boolean(formik.errors.username)}
            onChangeText={(text) => formik.setFieldValue("username", text)}
          />
          <TextField
            label="password"
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            onChangeText={(text) => formik.setFieldValue("password", text)}
          />
          <Stack
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
            }}
            direction="row"
            spacing={10}
          >
            <Button mode="contained" onPress={submitNotification}>
              Login
            </Button>
            <Button
              buttonColor="black"
              mode="contained"
              onPress={formik.resetForm}
            >
              Reset
            </Button>
          </Stack>
          <Switch value={open} onValueChange={(v) => setOpen(v)} />
        </Stack>
      </Stack>
    </Pressable>
  );
};

export default Login;
