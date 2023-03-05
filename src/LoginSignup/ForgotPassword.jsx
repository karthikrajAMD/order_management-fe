import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { env } from "../environment.js";
import { Context } from "../Context.js";

const ForgotPassword = () => {
  const { id, token } = useParams();
  const [a, setA] = useContext(Context);
  const history = useNavigate();

  const [data2, setData] = useState(false);
  const [but, setBut] = useState(false);
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const userValid = async () => {
    const res = await fetch(
      `${env.apiurl}/users/forgotpassword/${id}/${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (data.status === 200) {
      console.log("user valid");
    } else {
      history("*");
    }
  };

  const setval = (e) => {
    setPassword(e.target.value);
  };

  const sendpassword = async (e) => {
    e.preventDefault();
    setBut(true);
    if (password === "") {
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
      const res = await fetch(`${env.apiurl}/users/${id}/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.statusCode === 200) {
        toast.success(data.message);
        setPassword("");
        setMessage(true);
        setTimeout(() => {
          // setBut(false);
          navigate("/home");
        }, 3000);
        // navigate("/home");
      } else {
        toast.error("! Token Expired generate new LInk", {
          position: "top-center",
        });
        setBut(false);
      }
    }
  };

  useEffect(() => {
    userValid();
    setTimeout(() => {
      setData(true);
    }, 3000);
  }, []);

  return (
    <>
      {data2 ? (
        <>
          <section>
            <div className="form_data">
              <div className="form_heading">
                <h1>Enter Your NEW Password</h1>
              </div>

              <form>
                {message ? (
                  <p style={{ color: "green", fontWeight: "bold" }}>
                    Password Successfully Update{" "}
                  </p>
                ) : (
                  ""
                )}
                <div className="form_input">
                  <label htmlFor="password">New password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={setval}
                    name="password"
                    id="password"
                    placeholder="Enter Your new password"
                  />
                </div>

                <button className="btn" onClick={sendpassword} disabled={but}>
                  Send
                </button>
              </form>

              <ToastContainer />
            </div>
          </section>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default ForgotPassword;
