import EditIcon from "@mui/icons-material/Edit";

function UserListItem(props) {
  return (
    <div className="d-flex flex-row m-2 align-items-center">
      <img
        src={`data:${props.dataType};charset=utf-8;base64,` + props.data}
        style={{
          height: "50px",
          width: "50px",
          borderRadius: "50%",
          objectFit: "cover",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
        alt="פרצוף"
      />
      <p
        className="me-3"
        style={{ margin: "0", fontWeight: "500", fontSize: "1.1em" }}
      >
        {props.name}
      </p>
      <div
        style={{ margin: "0", cursor: "pointer" }}
        className="align-self-stretch d-flex align-items-center m-2 me-4"
        onClick={props.onClick}
      >
        <EditIcon className="m-0" />
      </div>
    </div>
  );
}

export default UserListItem;
