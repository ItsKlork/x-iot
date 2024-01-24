import { useNavigate } from "react-router-dom";

function SidebarItem(props) {
  const navigate = useNavigate();

  function click() {
    navigate(props.path);
  }

  return (
    <div
      className="d-flex align-items-center m-1"
      onClick={click}
      style={{ cursor: "pointer", color: !props.active ? "#9195A8" : "white" }}
    >
      {<props.icon />}
      <p className="p-2 m-0">{props.name}</p>
    </div>
  );
}

export default SidebarItem;
