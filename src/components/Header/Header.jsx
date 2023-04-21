import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../utilities/members-service";

export default function Header({ setMember, member }) {
  const isSignedIn = !!member;
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = member || {};

  const handleLogout = (e) => {
    e.preventDefault();
    setMember(null);
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <div>
        <div id="navbarNav">
          <ul>
            {!isSignedIn && (
              <React.Fragment>
                <li>
                  <Link
                    className={location.pathname === "/login" ? "active" : ""}
                    to="/login"
                  >
                    Log In
                  </Link>
                </li>
                <li>
                  <Link
                    className={location.pathname === "/signup" ? "active" : ""}
                    to="/signup"
                  >
                    Register
                  </Link>
                </li>
              </React.Fragment>
            )}
            {!!member && (
              <li>
                <div
                  style={{
                    color: "white",
                    paddingRight: "0.5rem",
                    paddingLeft: "0.5rem",
                  }}
                >
                  Hello,{" "}
                  <em style={{ fontStyle: "italic" }}>{member.name}</em>
                </div>
              </li>
            )}
          </ul>

          {isSignedIn && (
            <ul>
              {["member"].includes(member.role) && (
  <li>
    <a
      id="navbarDropdownMenuLink"
      role="button"
      aria-expanded="false"
    >
      My Account
    </a>
    <ul aria-labelledby="navbarDropdownMenuLink">
      <li>
        <a onClick={() => navigate("/history")}>Upcoming Bookings</a>
      </li>
      <li>
        <a onClick={handleLogout}>Log Out</a>
      </li>
    </ul>
  </li>
)}
{["groomer", "admin"].includes(member.role) && (
  <li>
    <a
      id="navbarDropdownMenuLink"
      role="button"
      aria-expanded="false"
    >
      Admin Tools
    </a>
    <ul aria-labelledby="navbarDropdownMenuLink">
      {role === "admin" && (
        <React.Fragment>
          <li>
            <a onClick={() => navigate("/productpage")}>Product Portfolio</a>
          </li>
          <li>
            <a onClick={() => navigate("/adminlocation")}>Inventory Management</a>
          </li>
        </React.Fragment>
      )}
      {role === "admin" && (
        <React.Fragment>
          <li>
            <a onClick={() => navigate("/admin")}>Groomer Scheduling</a>
          </li>
        </React.Fragment>
      )}
      <li>
        <a onClick={handleLogout}>Log Out</a>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}