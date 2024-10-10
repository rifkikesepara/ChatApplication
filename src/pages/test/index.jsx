import { Button, DataTable, List, Text } from "react-native-paper";
import Stack from "../../components/Stack";
import TextField from "../../components/TextField";
import { useFormik } from "formik";
import Accordion from "../../components/Accordion";
import useGlobal from "../../utils/useGlobal";
import { useEffect, useState } from "react";

const numberOfItemsPerPageList = [2, 3, 4];

const Test = () => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(4);
  const gContext = useGlobal();
  const { data, mutate } = gContext.useGetData(
    "http://192.168.1.189:8080/users"
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, data?.length);

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  const handleDelete = (id) => {
    gContext.axios
      .delete(`http://192.168.1.189:8080/users?id=${id}`)
      .then((res) => {
        console.log(res);
        mutate();
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = (values) => {
    gContext.axios
      .post("http://192.168.1.189:8080/users", {
        ...values,
      })
      .then((data) => {
        mutate();
        formik.resetForm();
      })
      .catch((err) => console.log(err));
  };

  const formik = useFormik({
    initialValues: { name: "", age: "", email: "" },
    onSubmit: onSubmit,
  });

  return (
    <Stack direction="column" style={{ width: "95%" }} spacing={8}>
      <Accordion title="Add User">
        <Stack direction="column" style={{ width: "100%" }} spacing={8}>
          <TextField
            label="Name"
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            onChangeText={(text) => formik.setFieldValue("name", text)}
          />
          <TextField
            label="Age"
            value={formik.values.age}
            error={formik.touched.age && Boolean(formik.errors.age)}
            onChangeText={(text) => formik.setFieldValue("age", text)}
          />
          <TextField
            label="E-Mail"
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            onChangeText={(text) => formik.setFieldValue("email", text)}
          />
          <Button
            mode="contained"
            style={{ width: "100%" }}
            onPress={formik.handleSubmit}
          >
            Add User
          </Button>
        </Stack>
      </Accordion>
      <Accordion title="Users" expanded={true}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Age</DataTable.Title>
            <DataTable.Title>Email</DataTable.Title>
            <DataTable.Title numeric>Delete</DataTable.Title>
          </DataTable.Header>
          {data?.slice(from, to).map((item, index) => {
            return (
              <DataTable.Row key={index}>
                <DataTable.Cell>{item.name}</DataTable.Cell>
                <DataTable.Cell>{item.age}</DataTable.Cell>
                <DataTable.Cell>{item.email}</DataTable.Cell>
                <DataTable.Cell numeric>
                  <Button onPress={() => handleDelete(item.id)}>delete</Button>
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(data?.length / numberOfItemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${data?.length}`}
            showFastPaginationControls
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={numberOfItemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            selectPageDropdownLabel={"Rows per page"}
          />
        </DataTable>
      </Accordion>
    </Stack>
  );
};

export default Test;
