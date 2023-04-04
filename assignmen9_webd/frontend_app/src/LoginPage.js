import React, { useState, useEffect }  from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';

function LoginPage() {
  
  const [message, setMessage] = useState("");
  let result = [];

  useEffect(() => {
    fetch("http://localhost:3001/user")
      .then((res) => res.json())
      .then((data) => (result = data));
      // .then((data) => (console.log(data)));
  }, []);

  // async function getAllUsers() {
  //   var email = document.getElementById("email").value;
  //   var password = document.getElementById("password").value;
  //   console.log('ema-'+email+" pass-  "+password);
  //   console.log(result);
  //   if (result.findIndex((item) => item.email === email) >= 0)
  //     console.log("Yes");
  //   else console.log("No");
  //    var loginInfo = {email:email,password:password}
  //   //
  //   const response = await fetch("http://localhost:3001/user/validate", {
  //     method: 'PUT', // *GET, POST, PUT, DELETE, etc.
  //     mode: 'cors', // no-cors, *cors, same-origin
  //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: 'same-origin', // include, *same-origin, omit
  //     headers: {
  //       'Content-Type': 'application/json'
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     redirect: 'follow', // manual, *follow, error
  //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //     body: JSON.stringify(loginInfo) // body data type must match "Content-Type" header
  //   });
  //   //console.log(response.json());
  //    const datd = await response.json();
     
  // }

  async function validateUsers() {
    var resp = "";
    await getAllUsers(function (response) {
      resp = response;
      console.log(response);
    });

    var element = document.getElementById("loginMessage");
    if (resp.isValid) {
      element.style.color = "green";
      element.style.display = "block";
      element.innerHTML = "Login Successful";
    } else {
      element.style.color = "red";
      element.style.display = "block";
      element.innerHTML = "Login Unuccessful";
    }
  }

  async function getAllUsers(callback) {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var payload = { email: email, password: password };
    const response = await fetch("http://localhost:3001/user/validate", {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(payload),
    });
    await callback(await response.json());
  }
  
  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-4">Please enter your Email and Password!</p>

              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email Id' id='email' type='email' size="lg"/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='password' type='password' size="lg"/>

              {/* <MDBBtn outline className='mx-2 px-5' color='white' size='lg'>
                Login
              </MDBBtn> */}

              <button type="button" className="btn btn-primary" onClick={validateUsers}>
                Login
              </button>

                <br/>
              
        <h1 style={{ display: "none" }} id="loginMessage"></h1>
              {/* <div>
                <p className="mb-0">Don't have an account? <a href="#!" class="text-white-50 fw-bold">Sign Up</a></p>
              </div> */}
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default LoginPage;