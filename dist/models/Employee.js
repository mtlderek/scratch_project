"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const uuid_1 = require("uuid");
class Employee {
    constructor(firstname, lastname, email) {
        if (!firstname) {
            throw new Error("Missing first name");
        }
        if (!lastname) {
            throw new Error("Missing last name");
        }
        if (!email) {
            throw new Error("Missing email");
        }
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.id = (0, uuid_1.v4)();
    }
    static checkForExistingEmployeeByEmail(email, employees) {
        /* This would normally just be a quick db check, or better just have email be a unique field, but since we're
         * in-memory storage this will have to suffice
         *
         * We throw an error here instead of returning a boolean because its only use case at the moment is to prevent
         * duplication and this is duplicating what a db would do should you try to insert a duplicate value in unique
         * constraint field.
         */
        if (employees.some(e => e.email === email)) {
            throw new Error('Employee already exists for employee with email: ' + email);
        }
    }
    static checkForExistingEmployeeById(id, employees) {
        // Using some() here, because it stops on the first matching result.
        return employees.some(e => e.id === id);
    }
}
exports.Employee = Employee;
