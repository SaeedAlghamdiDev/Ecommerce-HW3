const { createPool } = require("mysql2");
const { json } = require("sequelize");
const cors = require('cors');


express = require("express");
app = express();

app.use(cors());
app.use(express.json())

const pool = createPool({

    host: "localhost",
    user: "root",
    password: "121212",
    database: "ecommassignment2",
    connectionLimit: 10

})




app.get('/', (req, res) => {
    res.send("I should have memorized this by now");
});

app.get('/getgrades', (req, res) => {

    pool.query("select * from students", (err, result) => {

        if (err) {
            return console.log(err);
        } else
            return res.json(result)
    }    );
});



app.listen(8000, () => {
    console.log("Server is running at port 8000.")
});