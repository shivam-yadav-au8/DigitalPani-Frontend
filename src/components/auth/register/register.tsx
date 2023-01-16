import React, { FC, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./register.module.scss";
import env from "../../../env.json";
import { useNavigate } from "react-router-dom";

interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
  const [signUp, setsignUp] = useState({});
  const hisyory = useNavigate();
  const Signapi = (e) => {
    e.preventDefault();
    fetch(env.Basurl + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUp), // body data type must match "Content-Type" header
    })
      .then((d) => d.json())
      .then((d) => {
        if (d.user_data != undefined)
          localStorage.setItem("user", JSON.stringify(d));
        hisyory("/login");
      })
      .catch((err) => {
        console.log(err, "ye rha");
      });
  };
  return (
    <Fragment>
      <div className={styles.login}>
        <h2 className={styles.nonactive}>
          <Link to="/login"> sign in </Link>
        </h2>

        <h2 className={styles.active}> sign up </h2>
        <form className={styles.registerForm}>
          <input
            type="text"
            className={styles.text}
            name="username"
            onChange={(e) => setsignUp((s) => ({ ...s, name: e.target.value }))}
          />
          <span>Username</span>
          <input
            type="text"
            className={styles.text}
            name="email"
            onChange={(e) =>
              setsignUp((s) => ({ ...s, email: e.target.value }))
            }
          />
          <span>Email</span>
          <input
            type="text"
            className={styles.text}
            name="role"
            onChange={(e) => setsignUp((s) => ({ ...s, role: e.target.value }))}
          />
          <span>Role</span>
          <input
            type="text"
            className={styles.text}
            name="department"
            onChange={(e) =>
              setsignUp((s) => ({ ...s, department: e.target.value }))
            }
          />
          <span>Department</span>

          <br></br>

          <br></br>

          <input
            type="password"
            className={styles.text}
            name="password"
            onChange={(e) =>
              setsignUp((s) => ({ ...s, password: e.target.value }))
            }
          />
          <span>password</span>
          <br></br>

          <button onClick={Signapi} className={styles.signin}>
            Sign In
          </button>

          <hr></hr>

          <a href="jsncnjdcn" className={styles.forgotPassword}>
            Forgot Password?
          </a>
        </form>
      </div>
    </Fragment>
  );
};

export default Register;
