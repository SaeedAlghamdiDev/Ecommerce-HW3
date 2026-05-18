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

app.get('/getgrades/:studentNumber', (req, res) => {
    const studentNumber = req.params.studentNumber;
    pool.query("select students.id, students.name, courses.code AS \`course code\`, grades.grade from students left join grades on grades.id = students.id left join courses on grades.code = courses.code where students.id = ?" , [studentNumber], (err, result) => {

        if (err) {
            return console.log(err);
        } else{
            
            return res.json(result)}
    }    );
});

app.post('/addgrade', (req, res) => {
    const { studentNumber, courseCode, grade } = req.body;

    if (!studentNumber || !courseCode) {
        return res.status(400).json({ error: "Student number and course code are required" });
    }

    
    if (grade === "DELETE" || grade === null) {
        pool.query(
            "DELETE FROM grades WHERE id = ? AND code = ?",
            [studentNumber, courseCode],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Database error" });
                }
                return res.json({ success: true, message: "Grade deleted" });
            }
        );
    } else {
        
        pool.query(
            "INSERT INTO grades (id, code, grade) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE grade = ?",
            [studentNumber, courseCode, grade, grade],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Database error" });
                }
                return res.json({ success: true, message: "Grade updated successfully" });
            }
        );
    }
});


app.listen(8000, () => {
    console.log("Server is running at port 8000.")
});