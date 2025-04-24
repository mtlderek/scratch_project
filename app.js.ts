import express, { Request, Response } from 'express';
import {Employee} from "./models/Employee";
import {Recognition} from "./models/Recognition";

const app = express();
app.use(express.json())

const port: Number = 3000;

let employees: Employee[] = [];
let recognitions: Recognition[] = [];

app.post('/employees/batch', (req: Request, res: Response) => {
    let successfulInsertions: Employee[] = [];
    let failedInsertions: any[] = [];

    req.body.forEach(function (value: any) {
        try {
            let emp = new Employee(value.firstname, value.lastname, value.email)
            Employee.checkForExistingEmployeeByEmail(value.email, employees)
            successfulInsertions.push(emp);
            employees.push(emp);
        } catch (error) {
            let message = 'Unknown Error';
            if (error instanceof Error) {
                message = error.message;
            }
            value.failure_reason = message;
            failedInsertions.push(value);
        }
    })

    if (successfulInsertions.length === 0) {
        res.statusCode = 400
    }

    res.send({
        "numberOfEmployeesAdded": successfulInsertions.length,
        "successfulInsertions": successfulInsertions,
        "failedInsertions": failedInsertions
    }) // 200, despite some failures, however we permit partially code requests that result in db insertion
});

app.post('/recognitions', (req: Request, res: Response) => {
    try {
        let {employeeId, message, points} = req.body
        let recognition = new Recognition(employeeId, message, points)
        if (!Employee.checkForExistingEmployeeById(employeeId, employees)){
            res.statusCode = 400;
            res.send(`No matching employee with id: ${employeeId} within employee list`)
        } else {
            recognitions.push(recognition)
            res.send(`Employee has been recognized at the timestamp:  ${recognition.timestamp}`) // 200
            res.send(recognition) // 200
        }
    } catch (error) {
        let message = 'Unknown Error';
        if (error instanceof Error) {
            message = error.message;
        }
        res.statusCode = 400;
        res.send(`Unable to recognize employee due to: ${message}`)
    }
})

app.get('/', (req: Request, res: Response) => {
    res.send('Test Get')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})


