const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const apiRouter = require("./routes/api");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // middleware which helps us to parse any data in form of json coming from frontend

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.use('/api', apiRouter);

app.listen(port, () => {
    console.log("Server started successfully");
});