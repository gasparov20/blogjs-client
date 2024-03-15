const ImageUpload = (props) => {
  return (
    <div>
      <input
        id={props.id}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
      />
      <div>
        <div>
          <img src="" alt="preview" />
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
