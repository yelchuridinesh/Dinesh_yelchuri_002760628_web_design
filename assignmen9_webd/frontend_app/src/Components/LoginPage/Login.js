//import { PromiseProvider } from "mongoose";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [navigate, setNavigate] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // const handleSubmit = () => {
  //   fetch("http://localhost:3001/user/validate", {
  //     method: "PUT",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: email,
  //       password: pass,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.message === "User Validation Successful") {
  //         setNavigate(true);
  //       }
  //     });
  // };

  const handleSubmit = () => {
    fetch(`http://localhost:3001/user/${email}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.password === pass) {
          setNavigate(true);
        }
        else {
          setErrorMessage("Invalid email or password.");
        }
      });
  };
  

  return (
    <>
      {navigate ? <Navigate to="/about" /> : ""}
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-dark text-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "400px" }}
            >
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-4">
                  Please enter your Email and Password!
                </p>

                <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter Email"
                id="email"
                name="email"
                className="form-control"
                />
                <br/>

                <input
                    onChange={(e) => {
                        setPass(e.target.value);
                    }}
                    type="password"
                    placeholder=" Enter Password"
                    id="password"
                    name="password"
                className="form-control"
                    />
                    <br/>


        <button onClick={() => handleSubmit()} type="submit" className="btn btn-primary">
          Login
        </button>

                <br />

                <h1 style={{ display: "none" }} id="loginMessage"></h1>
                <div>
                <p className="mb-0">Don't have an account? <a href="#!" class="text-white-50 fw-bold">Sign Up</a></p>
              </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}
