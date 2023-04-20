import { useState } from "react";
import { getMember } from "../../utilities/members-service";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm({ setMember }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loginTry, setLoginTry] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/member/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginTry),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Network error");
      }
      localStorage.setItem("token", JSON.stringify(data.token));
      const decoded = getMember();
      const Name = JSON.parse(window.atob(data.token.split(".")[1]));
      console.log(Name.member.name);
      console.log(Name.member.email);
      setMember(decoded);
      if (Name.member.role === "admin") {
        navigate("/productpage");
      } else {
        navigate("/");
      }

      console.log(decoded);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    setLoginTry({
      ...loginTry,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="form-container">
        <form onSubmit={handleLogin}>
          <fieldset>
            <legend>Login</legend>
            <label>
              Email:
              <input
                name="email"
                value={loginTry.email}
                onChange={handleChange}
              />
            </label>
            <label>
              Password:{" "}
              <input
                name="password"
                value={loginTry.password}
                onChange={handleChange}
                type="password"
              />
            </label>
            <button>Login</button>
            <Link to="/forgetpassword">
              <button>Forget Password</button>
            </Link>
          </fieldset>
        </form>
      </div>
      {error ? <p>&nbsp;{error}</p> : null}
    </div>
  );
}
