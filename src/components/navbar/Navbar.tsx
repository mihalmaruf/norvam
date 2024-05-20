import { ImSun } from "react-icons/im";
import { BsFillMoonFill } from "react-icons/bs";
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch } from 'react-icons/md';
import './Navbar.scss';

const Navbar = ({ changeTheme, currentTheme }: any) => {
  return (
    <div className="container">
      <div className="title">Welcome User</div>
      <div className="menu">
        <div className="search">
          <MdSearch />
        </div>
        <div className="icons">
        <div className="mode" onClick={changeTheme}>
            {currentTheme === "dark" ? (
              <ImSun className="light" />
            ) : (
              <BsFillMoonFill className="dark" />
            )}
          </div>
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
