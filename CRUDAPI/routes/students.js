const express = require("express");
const router = express.Router();

const Student = require("../models/student");

// RESTFULL Endpoints
// GET, POST, PATCH, DELETE

// Middleware
const getStudent = async (req, res, next) => {
    let student;
    try {
        student = await Student.findById(req.params.id);
        if (student === null) {
            return res.status(404).json({ message: "Student not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.student = student;
    next();
};

// ------ GET ALL ROUTE ------ //
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    res.send("All students");
});

// ------ GET ONE ROUTER ------ //
router.get("/:id", getStudent, async (req, res) => {
    res.json(res.student);
    // res.send(`Student ID: ${req.params.id}`);
});

// ------ POST ROUTE ------ //
router.post("/", async (req, res) => {
    const student = new Student({
        name: req.body.name,
        class: req.body.class,
    });
    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ----- PATCH ROUTE ----- //
router.patch("/:id", getStudent, async (req, res) => {
    if (req.body.name != null) {
        res.student.name = req.body.name;
    }
    if (req.body.class) {
        res.student.class = req.body.class;
    }
    try {
        const updatedStudent = await res.student.save();
        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
//
router.delete("/:id", getStudent, async (req, res) => {
    try {
        await res.student.remove();
        res.json({ message: "Removed student" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
