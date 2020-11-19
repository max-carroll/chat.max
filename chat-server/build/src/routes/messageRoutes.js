"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMessage = void 0;
exports.postMessage = (req, res) => {
    res.send(`I received your POST request. This is what you sent me: ${req.body.post}`);
};
