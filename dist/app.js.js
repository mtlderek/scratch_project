"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Employee_1 = require("./models/Employee");
const Recognition_1 = require("./models/Recognition");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
let employees = [];
let recognitions = [];
app.post('/employees/batch', (req, res) => {
    let successfulInsertions = [];
    let failedInsertions = [];
    req.body.forEach(function (value) {
        try {
            let emp = new Employee_1.Employee(value.firstname, value.lastname, value.email);
            Employee_1.Employee.checkForExistingEmployeeByEmail(value.email, employees);
            successfulInsertions.push(emp);
            employees.push(emp);
        }
        catch (error) {
            let message = 'Unknown Error';
            if (error instanceof Error) {
                message = error.message;
            }
            value.failure_reason = message;
            failedInsertions.push(value);
        }
    });
    if (successfulInsertions.length === 0) {
        res.statusCode = 400;
    }
    res.send({
        "numberOfEmployeesAdded": successfulInsertions.length,
        "successfulInsertions": successfulInsertions,
        "failedInsertions": failedInsertions
    }); // 200, despite some failures, however we permit partially code requests that result in db insertion
});
app.post('/recognitions', (req, res) => {
    try {
        let { employeeId, message, points } = req.body;
        let recognition = new Recognition_1.Recognition(employeeId, message, points);
        if (!Employee_1.Employee.checkForExistingEmployeeById(employeeId, employees)) {
            res.statusCode = 400;
            res.send(`No matching employee with id: ${employeeId} within employee list`);
        }
        else {
            recognitions.push(recognition);
            res.send(`Employee has been recognized at the timestamp:  ${recognition.timestamp}`); // 200
            res.send(recognition); // 200
        }
    }
    catch (error) {
        let message = 'Unknown Error';
        if (error instanceof Error) {
            message = error.message;
        }
        res.statusCode = 400;
        res.send(`Unable to recognize employee due to: ${message}`);
    }
});
app.get('/', (req, res) => {
    res.send('Test Get');
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
