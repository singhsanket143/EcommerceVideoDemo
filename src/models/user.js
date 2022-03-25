const sqlConnection = require("../services/sqlConnection");
const bcrypt = require("bcrypt");
const auth = require("../util/auth");

function signup(data, cb) {
    let sql = `INSERT INTO Users
               (Username, Password, CreatedAt, UpdatedAt)
               VALUES (? , ? , now(), now())
    `;
    let values = [];
    values.push(data.username);
    values.push(data.password);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function strongSignup(data, cb) {
    let sql = ` INSERT INTO Users
                (Username, Password, CreatedAt, UpdatedAt)
                Values (? , ? , now(), now())
    `;
    let values = []
    values.push(data.username);
    bcrypt.hash(data.password, 8, function(err, hash) {
        if(err) {
            console.log(err);
            return;
        }
        values.push(hash);
        sqlConnection.executeQuery(sql, values, function(err, result) {
            cb(err, result);
        });
    });
}

function login(data, cb) {
    let sql = `SELECT ID as UserId, Username, Password, UserType 
               FROM Users where
               Username = ?
    `;
    let values = [];
    values.push(data.username);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        if(data.password == result[0].password) {
            cb(err, result);
        } else {
            cb(err, [])
        }
    })
}

function strongLogin(data, cb) {
    let sql = ` SELECT ID as UserId, Username, Password
                FROM Users WHERE
                Username = ?
    `;
    let values = [];
    values.push(data.username);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        const isValid = bcrypt.compareSync(data.password, result[0].Password);
        if(isValid) {
            const token = auth.newToken(result[0]);

            const response = [
                {
                    UserId: result[0].UserId,
                    Username: result[0].Username,
                    authToken: token,
                }
            ];
            cb(err, response);
        } else {
            cb(err, []);
        }
    });
}

function getUsersSignupDetails(data, cb) {
    let sql = `SELECT ID as UserId, Username, UserType
               FROM Users WHERE
               Username = ? AND Password = ?
    `;
    let values = [];
    values.push(data.username);
    values.push(data.password);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    })
}

function getUserById(id, cb) {
    let sql = ` SELECT ID as UserId, Username
                FROM Users WHERE
                ID = ?
    `;
    let values = [id];
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    })
}

module.exports = {
    signup, 
    login, 
    getUsersSignupDetails, 
    strongSignup, 
    strongLogin, 
    getUserById
}