import logo from "../assets/logo.svg";
import "./Nav.scss";

const Nav = () => {
  return (
    <nav className="navigation">
      <div className="nav-content">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="button-container">
          <a href="#get-section">Users</a>
          <a href="#post-section">Sign Up</a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
