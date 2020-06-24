const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
// const mongoose = require("mongoose");
const url = "mongodb://localhost:27017";

module.exports = {
  signup: function (name, email, password) {
    MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, client) {
        if (err) throw err;

        var db = client.db("Blog");

        db.collection("user").insertOne(
          {
            name: name,
            email: email,
            password: password,
          },
          function (findErr, client) {
            if (findErr) throw findErr;
            assert.equal(findErr, null);
            console.log("Saved the user sign up details.");
            // client.close();
          }
        );
      }
    );
  },

  getUserInfo: function (username, callback) {
    MongoClient.connect(url, function (err, db) {
      db.collection("user").findOne({ email: username }, function (
        err,
        result
      ) {
        if (result == null) {
          callback(false);
        } else {
          callback(result);
        }
      });
    });
  },

  updateProfile: function (name, password, username, callback) {
    MongoClient.connect(url, function (err, db) {
      db.collection("user").updateOne(
        { email: username },
        { $set: { name: name, password: password } },
        function (err, result) {
          if (err == null) {
            callback(true);
          } else {
            callback(false);
          }
        }
      );
    });
  },

  validateSignIn: function (username, password, callback) {
    MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, client) {
        if (err) throw err;

        var db = client.db("Blog");

        db.collection("user").findOne(
          { email: username, password: password },
          function (findErr, client) {
            if (findErr) throw findErr;
            if (client == null) {
              console.log("returning false");
              callback(false);
            } else {
              console.log("returning true");
              callback(true);
            }
          }
        );
      }
    );
  },
};
