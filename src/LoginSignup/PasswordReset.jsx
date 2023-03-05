import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { env } from "../environment";
const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [but, setBut] = useState(false);
  const [message, setMessage] = useState();

  const setVal = (e) => {
    setEmail(e.target.value);
  };

  const sendLink = async (e) => {
    e.preventDefault();
    setBut(true);
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
    } else {
      const res = await fetch(`${env.apiurl}/users/sendpasswordlink`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.statusCode === 200) {
        setEmail("");
        setMessage(true);
        // setBut(false);
      } else {
        toast.error("Invalid User", {
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
          <div className="form_heading">
            <h1>Enter Your Email</h1>
          </div>

          {message ? (
            <p style={{ color: "green", fontWeight: "bold" }}>
              password reset link send Successfully in Your Email
            </p>
          ) : (
            ""
          )}
          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                onChange={setVal}
                name="email"
                id="email"
                placeholder="Enter Your Email Address"
              />
            </div>

            <button className="btn" onClick={sendLink} disabled={but}>
              Send
            </button>
          </form>
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default PasswordReset;
