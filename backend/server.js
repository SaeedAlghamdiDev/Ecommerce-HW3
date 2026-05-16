express = require("express");
app = express();

app.get('/', (req,res) =>{
    res.send("I should have memorized this by now");
});

app.listen(8000, () =>{
    console.log("Server is running at port 8000.")
});