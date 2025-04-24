"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recognition = void 0;
const uuid_1 = require("uuid");
class Recognition {
    constructor(employeeId, message, points) {
        if (!employeeId) {
            throw new Error("Missing employeeId");
        }
        if (!message) {
            throw new Error("Missing message");
        }
        if (!points) {
            throw new Error("Missing points");
        }
        if (points < 0) {
            throw new Error("Points value must be positive");
        }
        this.employeeId = employeeId;
        this.message = message;
        this.points = points;
        this.timestamp = Date.now();
        this.id = (0, uuid_1.v4)();
    }
}
exports.Recognition = Recognition;
