const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express();
// middleware
app.use(cors())
app.use(express.json())
 app.use("/serviceRecords", require("./routes/ServiceRoutes"));
//mongodb connection
mongoose.connect("mongodb://127.0.0.1:27017/vehicleservicedb")
.then(()=>{
      console.log("MongoDB Connected");
})
.catch((err)=>{
    console.log(err);

});
//test route
app.get("/",(req,res)=>{
    res.send("Vehicle Service Log API is Runnig.........");
});
//start server
const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
