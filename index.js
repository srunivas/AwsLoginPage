require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

var accessToken;
app.get('/', (request, response) => {
    if (response.statusCode === 200) {
        accessToken = jwt.sign("srinu", process.env.PROCESS_SECRET_TOKEN);
        console.log(accessToken);
        response.json("Welcome to hello world");
    } else {
        response.json("Server Error");
    }
})

app.get("/login", authorization, (request, response) => {
    if (response.statusCode === 200) {
        console.log(accessToken);
        return response.json("Authorized");
    } else {
        response.json(response.statusCode);
    }
})


function authorization(request, response, next) {
    var user = "srinu";
    if (response.statusCode === 200) {
        jwt.verify(accessToken, process.env.PROCESS_SECRET_TOKEN, (err, user) => {
            if (err) {
                console.log("not authorized");
                return response.json("un Authorized");
            } else {
                return response.json("Authorized");
            }
        })
    } else {
        return response.json(response.statusCode);
    }
}

app.listen(3000, function(request, response) { console.log("Server Started") });