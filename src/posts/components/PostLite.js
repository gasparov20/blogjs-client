import Paper from "@mui/material/Paper";
import "./Post.css";

const PostLite = (props) => {
  const convertMongoDate = (date) => {
    // 2021-12-02T18:28:33.463Z
    let time = date.substring(11, 16);
    let year = date.substring(0, 4);
    let month = date.substring(5, 7);
    let day = date.substring(8, 10);
    return `${time} ${month}/${day}/${year}`;
  };

  return (
    <div style={{ margin: "50px" }}>
      <Paper className="center-div" style={{ padding: "30px" }} elevation={2}>
        <div className="post-header">
          <p
            style={{
              fontSize: "24px",
              fontWeight: "500",
              marginLeft: "20px",
              marginRight: "50px",
            }}
          >
            {props.title}
          </p>
          <p style={{ fontSize: "14px", fontStyle: "italic" }}>
            {props.author}
          </p>
          <div style={{ flexGrow: 1 }}></div>
          <p style={{ fontSize: "18px", float: "right", marginRight: "20px" }}>
            {convertMongoDate(props.date)}
          </p>
        </div>
        <p
          style={{
            fontSize: "18px",
          }}
        >
          {props.postBody}
        </p>
      </Paper>
    </div>
  );
};

export default PostLite;
