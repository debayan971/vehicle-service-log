const  mongoose = require("mongoose");
const serviceRecordSchema = new mongoose.Schema({

vehicleNo: {
        type: String,
        required: true
    },

    serviceType: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    cost: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("ServiceRecord", serviceRecordSchema);


