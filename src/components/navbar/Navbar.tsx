import { ImSun } from "react-icons/im";
import { BsFillMoonFill } from "react-icons/bs";
import { MdOutlineChat, MdOutlineLogout, } from 'react-icons/md';
import './Navbar.scss';
import { useContext } from "react";
import { UserContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Navbar = ({ changeTheme, currentTheme }: any) => {
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
    <div className="container">
      <div className="title">Welcome User</div>
      <div className="menu">
        <div className="nav-bg">
        <MdOutlineChat />
        </div>
        <div className="icons">
        <div className="mode" onClick={changeTheme}>
            {currentTheme === "dark" ? (
              <ImSun className="light" />
            ) : (
              <BsFillMoonFill className="dark" />
            )}
          </div>
          <MdOutlineLogout onClick={logOut} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
