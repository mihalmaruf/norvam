import {
  MdOutlineGridView,
  MdOutlineLogout,
  MdOutlinePeople,
  MdOutlineShoppingBag,
} from "react-icons/md";
import { WiStars } from "react-icons/wi";
import { CgNotes } from "react-icons/cg";
import { LuListTodo } from "react-icons/lu";
import "./Sidebar.scss"
import logo from "../../assets/norvam.png"
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/AuthProvider";

const Sidebar = () => {


  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const logOut = async () => {

    try {
      await userContext?.logout();
      navigate('/signin');
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  return (
    <div>
      <nav className="sidebar">
        <div className="sidebar_top">
          <div className="sidebar_brand">
            <Link to="/">
              <img src={logo} />
            </Link>
            <span className="sidebar_brand_text">Norvam</span>
          </div>
        </div>
        <div className="sidebar_body">
          <div className="sidebar_menu">
            <ul className="menu_list">
              <li className="menu_item">
                <Link to="/">
                  <span className="menu_link_icon">
                    <MdOutlineGridView size={18} />
                  </span>
                  <span className="menu_link_text">Dashboard</span>
                </Link>
              </li>
              <li className="menu_item">
                <Link to="/ai">
                  <span className="menu_link_icon">
                    <WiStars size={20} />
                  </span>
                  <span className="menu_link_text">Ai Prompt</span>
                </Link>
              </li>
              <li className="menu_item">
                <Link to="/tasks">
                  <span className="menu_link_icon">
                    <LuListTodo size={20} />
                  </span>
                  <span className="menu_link_text">Tasks</span>
                </Link>
              </li>
              <li className="menu_item">
                <Link to="/notes">
                  <span className="menu_link_icon">
                    <CgNotes size={20} />
                  </span>
                  <span className="menu_link_text">Notes</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="sidebar_menu sidebar_menu2">
            <ul className="menu_list">
              <li className="menu_item">

                <span className="menu_link_icon">
                  <MdOutlinePeople size={20} />
                </span>
                <span className="menu_link_text">Profile</span>
              </li>
              <li className="menu_item">

                <span className="menu_link_icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu_link_text" onClick={logOut} >Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <nav className="bottom-nav">
        <Link to="/" className="nav-item">
          <MdOutlineGridView size={18} />
          <span className="mobile-name">Dashboard</span>
        </Link>
        <Link to="/" className="nav-item">
          <WiStars size={20} />
          <span className="mobile-name">Ai Help</span>
        </Link>
        <Link to="/" className="nav-item">
          <LuListTodo size={20} />
          <span className="mobile-name">Tasks</span>
        </Link>
        <Link to="/" className="nav-item">
          <CgNotes size={18} />
          <span className="mobile-name">Notes</span>
        </Link>
        <Link to="/" className="nav-item">
          <MdOutlineShoppingBag size={20} />
          <span className="mobile-name">Profile</span>
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar