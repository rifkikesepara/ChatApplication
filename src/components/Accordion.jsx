import { List, Surface } from "react-native-paper";

const Accordion = ({ expanded, children, title = "" }) => {
  return (
    <List.Section style={{ width: "100%" }}>
      <List.Accordion
        expanded={expanded}
        style={{ backgroundColor: "red", borderRadius: 10 }}
        title={title}
        titleStyle={{ color: "white" }}
      >
        <Surface
          style={{
            padding: 8,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          {children}
        </Surface>
      </List.Accordion>
    </List.Section>
  );
};

export default Accordion;
