import React, { FC, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.scss";
import { useNavigate } from "react-router-dom";
import env from "../../../env.json";
interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const [login, setLogin] = useState({});
  const history = useNavigate();
  const LoginApi = (e) => {
    e.preventDefault();
    fetch(env.Basurl + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login), 
    })
      .then((d) => d.json())
      .then((d) => {
        localStorage.setItem("user", JSON.stringify(d));
        history("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <div className={styles.login}>
        <h2 className={styles.active}> sign in </h2>

        <h2 className={styles.nonactive}>
          <Link to="/register" className={styles.activeLink}>
            {" "}
            sign up{" "}
          </Link>
        </h2>
        <form className={styles.loginForm}>
          <input
            type="text"
            className={styles.text}
            name="email"
            onChange={(e) => setLogin((s) => ({ ...s, email: e.target.value }))}
          />
          <span>email</span>

          <br></br>

          <br></br>

          <input
            type="password"
            className={styles.text}
            name="password"
            onChange={(e) =>
              setLogin((s) => ({ ...s, password: e.target.value }))
            }
          />
          <span>password</span>
          <br></br>

          <button onClick={LoginApi} className={styles.signin}>
            Sign In
          </button>

          <hr></hr>

          <a href="samdsa" className={styles.forgotPassword}>
            Forgot Password?
          </a>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
