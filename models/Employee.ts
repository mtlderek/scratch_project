import {v4 as uuidv4} from "uuid";

export class Employee {
    firstname: string;
    lastname: string;
    email: string;
    id: string; // uuid

    constructor(firstname: string, lastname: string, email: string) {
        if (!firstname) {
            throw new Error("Missing first name")
        }
        if (!lastname) {
            throw new Error("Missing last name")
        }
        if (!email) {
            throw new Error("Missing email")
        }
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email
        this.id = uuidv4()
    }

    public static checkForExistingEmployeeByEmail(email: string, employees: Employee[]){
        /* This would normally just be a quick db check, or better just have email be a unique field, but since we're
         * in-memory storage this will have to suffice
         *
         * We throw an error here instead of returning a boolean because its only use case at the moment is to prevent
         * duplication and this is duplicating what a db would do should you try to insert a duplicate value in unique
         * constraint field.
         */
        if (employees.some(e => e.email === email)) {
            throw new Error('Employee already exists for employee with email: ' + email)
        }
    }

    public static checkForExistingEmployeeById(id: string, employees: Employee[]){
        // Using some() here, because it stops on the first matching result.
        return employees.some(e => e.id === id);
    }
}
