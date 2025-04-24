import {v4 as uuidv4} from "uuid";

export class Recognition {
    id: string;
    employeeId: string;
    message: string;
    points: number;
    timestamp: number;

    constructor(employeeId: string, message: string, points: number) {
        if (!employeeId) {
            throw new Error("Missing employeeId")
        }
        if (!message) {
            throw new Error("Missing message")
        }
        if (!points) {
            throw new Error("Missing points")
        }
        if (points < 0) {
            throw new Error("Points value must be positive")
        }
        this.employeeId = employeeId
        this.message = message
        this.points = points
        this.timestamp = Date.now()
        this.id = uuidv4()
    }
}