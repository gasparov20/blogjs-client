import Welcome from "../../posts/components/Welcome";

const AccessDenied = () => {
  const message = "You do not have permission to access this page.";
  return (
    <>
      <Welcome text={message} />
    </>
  );
};

export default AccessDenied;
