const User = require("../models/user");
const auth = require("../util/auth");
function signup(req, res) {
    let data = req.body;
    if(data.username && data.password) {
        User.getUsersSignupDetails(data, function(err, result) {
            if(err) {
                console.log(err);
                return res.status(500).send({
                    message: "Error during signup",
                    success: false
                });
            }
            if(result.length > 0) {
                return res.status(409).send({
                    success: false,
                    message: "User already exists"
                });
            } else {
                User.strongSignup(data, function(err, result) {
                    if(err) {
                        console.log(err);
                        return res.status(500).send({
                            success: false,
                            message: "Error during signup"
                        });
                    }
                    return res.status(200).send({
                        message: "Successfully signed up",
                        success: true,
                    });
                });
            }

        });
    } else {
        return res.status(400).send({
            message: "Username or password is missing!",
            success: false
        })
    }
}

function login(req, res) {
    let data = req.body;
    if(data.username && data.password) {
        User.strongLogin(data, function(err, result) {
            if(err) {
                console.log(err);
                return res.status(500).send({
                    success: false,
                    message: "Something went wrong not able to login"
                });
            }
            if(result.length == 0) {
                return res.status(404).send({
                    success: false,
                    message: "Username or password is incorrect"
                });
            }
            return res.status(200).send({
                success: true,
                message: "Successfully logged in",
                response: result
            });
        });
    } else {
        return res.status(400).send({
            success: false,
            message: "Username of password not present"
        })
    }
}   

function isAuthenticated(req, res, next) {
    const token = req.headers.auth;
    let response;
    try {
        response = auth.verifyToken(token);
    } catch(err) {
        console.log(err);
        return res.status(401).send({
            message: "Invalid token",
            success: false
        })
    }
    User.getUserById(response.id, function(err, result) {
        if(err) {
            return res.status(401).send({
                message: "Invalid user",
                success: false
            });
        }
        req.user = result;
        next();
    });
}

module.exports = {
    signup, 
    login, 
    isAuthenticated
}