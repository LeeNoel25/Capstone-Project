import { NavLink } from "react-router-dom";

export default function TopNavBar() {
  return (
    <nav
      style={{ flexDirection: "column" }}
      className=""
    >
      <ul className="">
        <li className="">
          <NavLink className="" to="/products">
            Browse Products
          </NavLink>
        </li>
        <li className="">
          <NavLink className="" to="/booking">
            booking Booking
          </NavLink>
        </li>
        <li className="">
          <NavLink className="" to="/maps">
            Locate Us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
