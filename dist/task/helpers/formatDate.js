"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
const padToTwoDigits_1 = require("./padToTwoDigits");
const formatDate = (date) => {
    return ([
        (0, padToTwoDigits_1.padTo2Digits)(date.getDate()),
        (0, padToTwoDigits_1.padTo2Digits)(date.getMonth() + 1),
        date.getFullYear(),
    ].join('.') +
        ' ' +
        [
            (0, padToTwoDigits_1.padTo2Digits)(date.getHours()),
            (0, padToTwoDigits_1.padTo2Digits)(date.getMinutes()),
            (0, padToTwoDigits_1.padTo2Digits)(date.getSeconds()),
        ].join(':'));
};
exports.formatDate = formatDate;
//# sourceMappingURL=formatDate.js.map