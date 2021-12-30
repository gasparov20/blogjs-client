import { useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserPost from "./UserPost";
import DeleteDialog from "../../posts/components/DeleteDialog";
import { AuthContext } from "../../shared/context/auth-context";

export default function PostsAccordion(props) {
  const [expanded, setExpanded] = useState(false);
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const convertMongoDate = (date) => {
    let time = date.substring(11, 16);
    let year = date.substring(0, 4);
    let month = date.substring(5, 7);
    let day = date.substring(8, 10);
    return `${time} ${month}/${day}/${year}`;
  };

  // sends request to server to delete a post
  const deleteHandler = useCallback(
    async (event) => {
      const responseData = await sendRequest(
        `/api/posts/${props.post.id}`,
        "DELETE",
        JSON.stringify({
          creatorID: auth.userId,
        }),
        {
          Authorization: "Bearer " + auth.token,
          "Content-Type": "application/json",
        }
      );
      props.callback();
    },
    [sendRequest, auth.token, props]
  );

  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography
          sx={{
            fontWeight: "600",
            paddingLeft: "10px",
            paddingRight: "50px",
          }}
        >
          {props.post.title}
        </Typography>
        <div style={{ flexGrow: 1 }}></div>
        <Typography sx={{ color: "text.secondary" }}>
          {convertMongoDate(props.post.createdAt)}
        </Typography>
        {((auth.userType && auth.userType === "admin") ||
          (auth.userId &&
            (auth.userId === props.post.creatorID ||
              auth.userId === props.post.creatorID))) && (
          <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            <DeleteDialog type="post" callback={deleteHandler} />
          </div>
        )}
      </AccordionSummary>
      <AccordionDetails>
        <UserPost post={props.post} />
      </AccordionDetails>
    </Accordion>
  );
}
