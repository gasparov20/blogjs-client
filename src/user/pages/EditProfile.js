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
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useImageUpload } from "../../shared/hooks/image-upload-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { AlertContext } from "../../shared/context/alert-context";
import Welcome from "../../posts/components/Welcome";
import ReactDOM from "react-dom";

const TextBox = (props) => {
  if (props.multiline === true) {
    return (
      <TextField
        multiline
        rows={5}
        label={props.label}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        variant="outlined"
        size="small"
        sx={{ margin: "10px", width: "auto" }}
      />
    );
  } else {
    if (props.error === true) {
      return (
        <TextField
          error
          helperText="Cannot be blank"
          label={props.label}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          variant="outlined"
          size="small"
          sx={{ margin: "10px" }}
        />
      );
    } else {
      return (
        <TextField
          label={props.label}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          variant="outlined"
          size="small"
          sx={{ margin: "10px" }}
        />
      );
    }
  }
};

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
  const [fName, setfName] = useState("");
  const [fNameError, setfNameError] = useState(false);
  const [fNameChanged, setfNameChanged] = useState(false);
  const [lName, setlName] = useState("");
  const [lNameChanged, setlNameChanged] = useState(false);
  const [lNameError, setlNameError] = useState(false);
  const [location, setLocation] = useState("");
  const [locationChanged, setLocationChanged] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [bio, setBio] = useState("");
  const [bioChanged, setBioChanged] = useState(false);

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
    setfName(responseData.firstName);
    setlName(responseData.lastName);
    setLocation(responseData.location);
    setBio(responseData.bio);
    setBusy(false);
  }, [auth.token, auth.userId, id, sendRequest]);

  // Retrieve user when mounted
  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
    let fnError = false,
      lnError = false,
      locError = false;

    if (!removeImage && changeImage && (!file || !isValid)) {
      return;
    }

    if (fNameError === true || lNameError === true || locationError === true) {
      return;
    }

    setBusy(true);
    let responseData;
    try {
      const formData = new FormData();
      if (fNameChanged === true) {
        formData.append("firstName", fName);
      }
      if (lNameChanged === true) {
        formData.append("lastName", lName);
      }
      if (locationChanged === true) {
        formData.append("location", location);
      }
      if (bioChanged === true) {
        formData.append("bio", bio);
      }
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
      //alert.setSavedAlert();
      //navigate("/");
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

  const handlefNameChange = (event) => {
    setfNameChanged(true);
    if (event.target.value === "") {
      setfNameError(true);
    } else {
      setfNameError(false);
      setfName(event.target.value);
    }
  };

  const handlelNameChange = (event) => {
    setlNameChanged(true);
    if (event.target.value === "") {
      setlNameError(true);
    } else {
      setlNameError(false);
      setlName(event.target.value);
    }
  };

  const handleLocationChange = (event) => {
    setLocationChanged(true);
    if (event.target.value === "") {
      setLocationError(true);
    } else {
      setLocationError(false);
      setLocation(event.target.value);
    }
  };

  const handleBioChange = (event) => {
    setBioChanged(true);
    setBio(event.target.value);
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "30px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TextBox
                    error={fNameError}
                    label="First name"
                    defaultValue={fName}
                    onChange={handlefNameChange}
                  />
                  <TextBox
                    error={lNameError}
                    label="Last name"
                    defaultValue={lName}
                    onChange={handlelNameChange}
                  />
                  <TextBox
                    error={locationError}
                    label="Location"
                    defaultValue={location}
                    onChange={handleLocationChange}
                  />
                </div>
                <TextBox
                  multiline={true}
                  label="Bio"
                  defaultValue={bio}
                  onChange={handleBioChange}
                />
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
