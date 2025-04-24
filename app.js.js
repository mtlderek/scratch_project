"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    res.send('success2');
});
app.listen(port, () => {
    console.log("Listening on port " + port); // todo: make this a nicer log statement
});
// todo: step one, make it use app not index DONE
// step 2: output to dist not ./
