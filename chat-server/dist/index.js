"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const app = express_1.default();
const io = new socket_io_1.Server();
const port = process.env.PORT || 5000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// messages
app.post('/api/messages', (req, res) => {
    const { message } = req.body;
    io.emit("MessageReceived", message);
    res.send(`I received your POST request. This is what you sent me: ${req.body.post}`);
});
// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`));
io.on("connection", function (socket) {
    console.log("a user connected");
});
//# sourceMappingURL=index.js.map