import "./NavCard.scss";
import { IoArrowForwardOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const NavCard = ({title, description}: any) => {
  return (
    <div className="card-container">
    <div className="left">
    <div>{title}</div>
    <div>{description}</div>
    </div>
    <div className="right">
        <Link to="/ai">
        <IoArrowForwardOutline size={20} />
        </Link>
    </div>
</div>
  )
}

export default NavCard