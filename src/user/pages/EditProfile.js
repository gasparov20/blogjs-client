import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import {
  LinearProgress,
  Avatar,
  Paper,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useImageUpload } from "../../shared/hooks/image-upload-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { AlertContext } from "../../shared/context/alert-context";
import Welcome from "../../posts/components/Welcome";

const EditProfile = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const alert = useContext(AlertContext);
  const [busy, setBusy] = useState(true);
  const [user, setUser] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const filePickerRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [changeImage, setChangeImage] = useState(false);
  const [removeDisabled, setRemoveDisabled] = useState(false);
  const [removeImage, setRemoveImage] = useState(false);

  const [formState, inputHandler] = useImageUpload(
    {
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const fetchData = useCallback(async () => {
    setBusy(true);
    let responseData;
    try {
      responseData = await sendRequest(
        `${process.env.REACT_APP_SERVER_URL}/users/id/${auth.userId}`,
        "GET",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}
    if (responseData.image === "") {
      setPreviewUrl("");
      setRemoveDisabled(true);
    } else {
      setPreviewUrl(`${process.env.REACT_APP_STATIC_URL}${responseData.image}`);
      setRemoveDisabled(false);
    }
    setUser(responseData);
    setBusy(false);
  }, [auth.token, id, sendRequest]);

  // Retrieve user when mounted
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const convertMongoDate = (date) => {
    let time = date.substring(11, 16);
    let year = date.substring(0, 4);
    let month = date.substring(5, 7);
    let day = date.substring(8, 10);
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let imageIsValid = isValid;
    if (event.target.files && event.target.files.length !== 0) {
      setRemoveImage(false);
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      setChangeImage(true);
      setRemoveDisabled(false);
      imageIsValid = true;
    } else {
      setIsValid(false);
      setChangeImage(false);
      imageIsValid = false;
    }
    setRemoveImage(false);
    inputHandler("image", pickedFile, imageIsValid);
  };

  // update user in database
  const handleSave = async () => {
    if (!removeImage && changeImage && (!file || !isValid)) {
      return;
    }
    setBusy(true);
    let responseData;
    try {
      const formData = new FormData();
      formData.append("image", formState.inputs.image.value);
      formData.append("removeImage", removeImage);
      responseData = await sendRequest(
        `${process.env.REACT_APP_SERVER_URL}/users/${auth.userId}`,
        "PUT",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      setBusy(false);
      alert.setSavedAlert();
      navigate("/");
    } catch (err) {}
  };

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleUpload = () => {
    setAnchorEl(null);
    filePickerRef.current.click();
  };

  const handleMirror = () => {
    setAnchorEl(null);
    console.log("TO DO");
  };

  const handleRemove = () => {
    setAnchorEl(null);
    setRemoveDisabled(true);
    setRemoveImage(true);
    setPreviewUrl("");
  };

  return (
    <>
      {busy ? (
        <LinearProgress />
      ) : (
        <>
          <Paper style={{ padding: "30px" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <input
                  id={auth.userId}
                  ref={filePickerRef}
                  style={{ display: "none" }}
                  type="file"
                  accept=".jpg,.png,.jpeg"
                  onChange={pickedHandler}
                />
                <Avatar
                  sx={{ width: "150px", height: "150px", marginBottom: "20px" }}
                  src={previewUrl}
                />
                <Button
                  color="primary"
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  Change Profile Picture
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleUpload}>Upload</MenuItem>
                  <MenuItem disabled={true} onClick={handleMirror}>
                    From URL
                  </MenuItem>
                  <MenuItem disabled={removeDisabled} onClick={handleRemove}>
                    Remove
                  </MenuItem>
                </Menu>
                <br />
              </div>
              <div style={{ margin: "30px" }}>
                <p style={{ fontWeight: "600" }}>
                  {user.firstName} {user.lastName}
                </p>
                <p>Location: </p>
                <p>Joined: {convertMongoDate(user.joined)}</p>
              </div>
              <div style={{ margin: "30px" }}>
                <p>User bio</p>
              </div>
            </div>
          </Paper>
          <div style={{ display: "flex", margin: "30px" }}>
            <LoadingButton
              color="primary"
              onClick={() => {
                handleSave(false);
              }}
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              sx={{ margin: "auto" }}
            >
              Save
            </LoadingButton>
          </div>
        </>
      )}
    </>
  );
};

export default EditProfile;
