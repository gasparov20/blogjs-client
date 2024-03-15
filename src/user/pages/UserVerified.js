import { useEffect, useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Welcome from "../../posts/components/Welcome";

const UserVerified = () => {
  const { code } = useParams();
  const { sendRequest } = useHttpClient();
  const [time, setTime] = useState(4);
  const [busy, setBuy] = useState(true);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (time === 0) {
        fetchData();
      } else {
        setTime(time - 1);
      }
    }, 1000);
  }, [time]);

  const fetchData = useCallback(async () => {
    let responseData;
    try {
      responseData = await sendRequest(
        `${process.env.REACT_APP_SERVER_URL}/users/verified/${code}`,
        "GET"
      );
    } catch (err) {}

    console.log(responseData);

    auth.logout();

    auth.login(
      responseData.userId,
      responseData.token,
      responseData.userName,
      responseData.userType,
      null
    );
    navigate("/");
  }, [sendRequest]);

  return (
    <Welcome
      text={`Your account has been verified! You will be redirected in ${time} seconds...`}
    />
  );
};

export default UserVerified;
