const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
var cors = require('cors')
const saltRounds = 10;
var http = require("http");
const User = require("../models/userModel");



const adduser = async  (req, res) =>{
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
            //await User.connect();
            const user = await User.findOne({ email: req.body.email });
            if (user) {
              console.log("-> User Already Exists");
              res.status(400).send("User Already Exists");
            } else {
              // Bcrypting password
              getHashValue(req.body.password, function (response) {
                req.body.password = response;
              });
              const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
              });
              await newUser.save();
              res.send("User added successfully");
            }
          } catch (e) {
            console.error(e);
          } 
        //   finally {
        //     await User.close();
        //   }
        }
  };

const updateuser = async  (req, res) =>{
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
  
        // await User.connect();
        let result = await User.findOne({
          email: email,
        });
  
        if (result) {
          result.name = req.body.name;
          result.password = hashedPassword;
  
          const filter = { email: email };
          const options = { upsert: false };
  
          const isUpdated = await User.updateOne(filter, { $set: { name: result.name, password: result.password } }, options);
  
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
      } 
    //   finally {
    //     await User.close();
    //   }
    } else {
      res.status(400).send("Enter valid details");
    }
  };

const getuserbyemailId =  async  (req, res) => {
    try {
    //   await User.connect();
      const result = await User.findOne({
        email: req.params.emailId,
      });
  
      if (!result) {
        res.status(404).send("User not found");
      } else {
        res.send(result);
      }
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error");
    } 
    // finally {
    //   await User.close();
    // }
  };

const getuser = async  (req, res) =>{
    try {
      const result = await User.find({});
      console.log(result);
      let list = [];
      await result.forEach((item) => list.push(item));
      res.send(list);
    } catch (e) {
      console.error(e);
    } 
    // finally {
    //   await User.close();
    // }
  };

const deleteuser = async  (req, res) => {
    try {
      const query = { email: req.params.emailId };
    //   await User.connect();
      const resultone = await User.findOne({email: req.params.emailId,})
  
      if(!resultone){
        res.status(404).send("User not found");
      }
      else{
        const result = await User.deleteOne(query);
      if (result.deletedCount == 1) {
        res.send("Deleted Successfully");
      } else {
        res.send("Deletion Failed");
      }
      }
    } catch (e) {
      console.error(e);
    }
  };

  function getHashValue(plainPassword, callback) {
    bcrypt.hash(plainPassword, saltRounds, function (err, hash) {
      console.log(hash);
      callback(hash);
    });
  };

  function checkUserExists(myPlaintextPassword, hash, callback) {
    bcrypt.compare(myPlaintextPassword, hash).then(function (result) {
      console.log(result);
      callback(result);
    });
  };

  module.exports ={adduser,updateuser,getuserbyemailId,getuser,deleteuser};



