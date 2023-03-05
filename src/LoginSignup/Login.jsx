import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../login-signup.css";
import { env } from "../environment";
import { Context } from "../Context.js";
const Login = () => {
  const [passShow, setPassShow] = useState(false);
  const [but, setBut] = useState(false);
  const [a, setA] = useContext(Context);
  let navigate = useNavigate();
  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const loginuser = async (e) => {
    setBut(true);
    e.preventDefault();
    const { email, password } = inpval;
    if (email === "") {
      toast.error("email is required!", {
        position: "top-center",
      });
      setBut(false);
    } else if (!email.includes("@")) {
      toast.warning("includes @ in your email!", {
        position: "top-center",
      });
      setBut(false);
    } else if (password === "") {
      toast.error("password is required!", {
        position: "top-center",
      });
      setBut(false);
    } else if (password.length < 6) {
      toast.error("password must be 6 char!", {
        position: "top-center",
      });
      setBut(false);
    } else {
      const data = await fetch(`${env.apiurl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const res = await data.json();
      if (res.statusCode === 200) {
        toast.success(res.message, { position: "top-center" });

        sessionStorage.setItem("token", res.token);
        setTimeout(() => {
          setBut(false);
          navigate("/dashboard");
        }, 3000);
      } else {
        toast.error(res.message, {
          position: "top-center",
        });
        setBut(false);
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading ">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are you glad you are back. Please login.</p>
            <p className="mt-0 mb-0">Login mail: karthikrajaamd@gmail.com</p>
            <p className="mb-0 mt-0">Password: karthikraja</p>
          </div>

          <form>
            <div className="form_input mt-0">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={inpval.email}
                onChange={setVal}
                name="email"
                id="email"
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  onChange={setVal}
                  value={inpval.password}
                  name="password"
                  id="password"
                  placeholder="Enter Your password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <button className="btn" onClick={loginuser} disabled={but}>
              Login
            </button>
            <p>
              Don't have an Account?
              <NavLink
                onClick={() => {
                  setA("Signup");
                }}
              >
                Sign Up
              </NavLink>
            </p>
            <p style={{ color: "black", fontWeight: "bold" }}>
              Forgot Password
              <NavLink
                onClick={() => {
                  setA("Reset");
                }}
              >
                Click Here
              </NavLink>
            </p>
          </form>
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default Login;
