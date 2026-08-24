const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express();
// middleware
app.use(cors())
app.use(express.json())
 app.use("/serviceRecords", require("./routes/ServiceRoutes"));
//mongodb connection
mongoose.connect("mongodb://debayanmondal159_db_user:debayan123@ac-gn0tick-shard-00-00.uxb8ahb.mongodb.net:27017,ac-gn0tick-shard-00-01.uxb8ahb.mongodb.net:27017,ac-gn0tick-shard-00-02.uxb8ahb.mongodb.net:27017/vehicleservicedb?ssl=true&replicaSet=atlas-jp7ahw-shard-0&authSource=admin&appName=Cluster0")
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
