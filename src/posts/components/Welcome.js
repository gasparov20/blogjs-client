import Paper from "@mui/material/Paper";

const Welcome = (props) => {
  return (
    <div>
      <Paper elevation={2}>
        <p style={{ fontSize: "1.25rem", padding: "2rem" }}>{props.text}</p>
      </Paper>
    </div>
  );
};

export default Welcome;
