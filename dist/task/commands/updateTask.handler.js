"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const updateTask_command_1 = require("./updateTask.command");
const tasksEntity_repository_1 = require("../repository/tasksEntity.repository");
let UpdateTaskHandler = class UpdateTaskHandler {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(UpdateTaskCommand) {
        const { ObjectID } = require('mongodb').ObjectId;
        const { updateTaskReqDto } = UpdateTaskCommand;
        return this.repository.updateOneTask({ _id: ObjectID(updateTaskReqDto.id) }, {
            $set: {
                countOfMatchedFiles: updateTaskReqDto.countOfMatchedFiles,
                progressPercentage: updateTaskReqDto.progressPercentage,
                result: updateTaskReqDto.result,
                status: updateTaskReqDto.status,
                updateAt: updateTaskReqDto.updateAt,
            }
        });
    }
};
UpdateTaskHandler = __decorate([
    (0, cqrs_1.CommandHandler)(updateTask_command_1.UpdateTaskCommand),
    __metadata("design:paramtypes", [tasksEntity_repository_1.TasksEntityRepository])
], UpdateTaskHandler);
exports.UpdateTaskHandler = UpdateTaskHandler;
//# sourceMappingURL=updateTask.handler.js.map