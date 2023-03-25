const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
var cors = require('cors')
const saltRounds = 10;
var http = require("http");


const uri =
"mongodb://localhost:27017/?directConnection=true";
//"localhost:27017";
const client = new MongoClient(uri);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.listen(3000, async function () {
  console.log("Server starting on port 3000");
});

app.get("/", function (req, res) {
  res.send("Build Successful!");
});

//POST method 

app.post("/user/create", async function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  var regExEmail = /([\w\.]+)@northeastern.edu/;
  var regexPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  if (name == "" || name == undefined) {
    res.send("Name cannot be empty, please check");
  } else if (email == "empty" || email == undefined) {
    res.send("Email cannot be empty, please check");
  } else if (!email.trim().match(regExEmail)) {
    res.send("Enter a valid Northeastern email address");
  } else if (password == "" || password == undefined) {
    res.send("Password cannot be empty, please check");
  } else if (!password.trim().match(regexPassword)) {
    res.send("Enter a valid password");
  } else {
    try {
      // Check if user already exists
      await client.connect();
      const user = await client
        .db("UserDb")
        .collection("User")
        .findOne({ email: req.body.email });
      if (user) {
        console.log("-> User Already Exists");
        res.status(400).send("User Already Exists");
      } else {
        // Bcrypting password
        getHashValue(req.body.password, function (response) {
          req.body.password = response;
        });
        const result = await client
          .db("UserDb")
          .collection("User")
          .insertOne(req.body);
        res.send("User added successfully");
      }
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
});

app.put("/user/edit", async function (req, res) {
  var regexPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  const email = req.body.email;
  if (
    req.body.name != "" &&
    req.body.password != "" &&
    req.body.password.trim().match(regexPassword)
  ) {
    try {
      var hashedPassword = await new Promise((resolve, reject) => {
        getHashValue(req.body.password, function (response) {
          if (response) {
            resolve(response);
          } else {
            reject("Error hashing password");
          }
        });
      });

      await client.connect();
      let result = await client.db("UserDb").collection("User").findOne({
        email: email,
      });

      if (result) {
        result.name = req.body.name;
        result.password = hashedPassword;

        const filter = { email: email };
        const options = { upsert: false };

        const isUpdated = await client
          .db("UserDb")
          .collection("User")
          .updateOne(filter, { $set: { name: result.name, password: result.password } }, options);

        if (isUpdated.modifiedCount > 0) {
          res.send("User updated successfully");
        } else {
          res.send("User not updated");
        }
      } else {
        res.status(404).send("User not found");
      }
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  } else {
    res.status(400).send("Enter valid details");
  }
});



app.put("/user/validate", async function (req, res) {
  var regexPassword =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  const email = req.body.email;
  if (
    req.body.email != "" &&
    req.body.password != "" &&
    req.body.password.trim().match(regexPassword)
  ) {
    try {
      // var hashedPassword;
      // getHashValue(req.body.password, function (response) {
      //   //console.log(`password--`, response);
      //   hashedPassword = response;
      // });
      var passwordMatches = false;

      await client.connect();
      let result = await client.db("UserDb").collection("User").findOne({
        email: email,
      });

      checkUserExists(req.body.password, result.password, function (response) {
        console.log('textPass--'+req.body.password+" hash--"+result.password+" resp--"+response)
        passwordMatches = response;
        if (
          result != undefined &&
          result != null &&
          result.email != undefined &&
          passwordMatches
        ) {
          console.log("User Validation Successful");
          res.send({"isValid":true,"message":"User Validation Successful"});
  
        } else if (!passwordMatches) {
          res.send({isValid:false,message:"Wrong Password"});
          //res.send("password didnot match");
        } else {
          res.send({"isValid":false,"message":"User not found"});
          //res.send("User not found");
        }
      });

      
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  } else {
    res.send({isValid:false,message:"Enter valid details"});
  }
});


// app.get("/user/:emailId", async function (req, res) {
//   try {
//     await client.connect();
//     const result = await client.db("UserDb").collection("User").findOne({
//       email: req.params.emailId,
//     });

//     if (!result) {
//       res.status(404).send("User not found");
//     } else {
//       res.send(result);
//     }
//   } catch (e) {
//     console.error(e);
//     res.status(500).send("Internal Server Error");
//   } finally {
//     await client.close();
//   }
// });

app.get("/user/getAll/", async function (req, res) {
  try {
    await client.connect();
    const result = await client.db("UserDb").collection("User").find({});
    console.log(result);
    let list = [];
    await result.forEach((item) => list.push(item));
    res.send(list);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
});



app.delete("/user/:emailId", async function (req, res) {
  try {
    const query = { email: req.params.emailId };
    await client.connect();
    const resultone = await client.db("UserDb").collection("User").findOne({email: req.params.emailId,})

    if(!resultone){
      res.status(404).send("User not found");
    }
    else{
      const result = await client
      .db("UserDb")
      .collection("User")
      .deleteOne(query);
    if (result.deletedCount == 1) {
      res.send("Deleted Successfully");
    } else {
      res.send("Deletion Failed");
    }
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
});

function getHashValue(plainPassword, callback) {
  bcrypt.hash(plainPassword, saltRounds, function (err, hash) {
    console.log(hash);
    callback(hash);
  });
}

function checkUserExists(myPlaintextPassword, hash, callback) {
  bcrypt.compare(myPlaintextPassword, hash).then(function (result) {
    console.log(result);
    callback(result);
  });
}

// bcrypt.compare(someOtherPlaintextPassword, hash).then(function(result) {
//     // result == false
// });
