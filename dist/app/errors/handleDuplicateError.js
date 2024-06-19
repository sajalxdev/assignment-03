"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorSources = [
        {
            path: "",
            message: `${extractedMessage} already exists!`,
        },
    ];
    return {
        statusCode: 400,
        message: "Duplicate Error",
        errorSources,
    };
};
exports.default = handleDuplicateError;
