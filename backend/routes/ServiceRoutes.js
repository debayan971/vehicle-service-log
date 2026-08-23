const express = require("express");
const router = express.Router();

const ServiceRecord = require("../models/ServiceRecord");

// POST - Create a new service record
router.post("/", async (req, res) => {
    try {
        const record = new ServiceRecord(req.body);
        const savedRecord = await record.save();

        res.status(201).json(savedRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET - All service records
router.get("/", async (req, res) => {
    try {
        const records = await ServiceRecord.find();
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET - Single service record by ID
router.get("/:id", async (req, res) => {
    try {
        const record = await ServiceRecord.findById(req.params.id);

        if (!record) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.json(record);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT - Update service record
router.put("/:id", async (req, res) => {
    try {
        const updatedRecord = await ServiceRecord.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedRecord) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.json(updatedRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE - Delete service record
router.delete("/:id", async (req, res) => {
    try {
        const deletedRecord = await ServiceRecord.findByIdAndDelete(req.params.id);

        if (!deletedRecord) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.json({ message: "Record deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;