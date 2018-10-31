const express = require("express");

var isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/register");
}

module.exports = isLoggedIn; 