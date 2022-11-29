"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const createTask_handler_1 = require("./createTask.handler");
const updateTask_handler_1 = require("./updateTask.handler");
const createTaskDetail_handler_1 = require("./createTaskDetail.handler");
exports.CommandHandlers = [createTask_handler_1.CreateTaskHandler, updateTask_handler_1.UpdateTaskHandler, createTaskDetail_handler_1.CreateTaskDetailHandler];
//# sourceMappingURL=index.js.map