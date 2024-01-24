function UpdateItem(props) {
  return (
    <div
      className="d-flex flex-row m-1 align-items-center"
      style={{ fontSize: "1.3em" }}
    >
      <props.icon style={{ color: props.iconColor, fontSize: "1.5em" }} />
      <p className="me-3 my-2">{props.message}</p>
    </div>
  );
}

export default UpdateItem;
