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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskDetailHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const CreateTaskDetail_command_1 = require("./CreateTaskDetail.command");
const tasksEntity_repository_1 = require("../repository/tasksEntity.repository");
const core_1 = require("@automapper/core");
const nestjs_1 = require("@automapper/nestjs");
const dto_1 = require("../dto");
const taskDetail_entity_1 = require("../entities/taskDetail.entity");
let CreateTaskDetailHandler = class CreateTaskDetailHandler extends nestjs_1.AutomapperProfile {
    constructor(repository, mapper) {
        super(mapper);
        this.repository = repository;
    }
    get profile() {
        return (mapper) => {
            const { ObjectID } = require('mongodb').ObjectId;
            (0, core_1.createMap)(mapper, dto_1.CreateTaskDetailReqDto, taskDetail_entity_1.TaskDetailEntity, (0, core_1.afterMap)((source, destination) => {
                destination.taskId = ObjectID(source.taskId),
                    destination.matchedFilePath = source.matchedFilePath;
            }));
        };
    }
    async execute(CreateTaskDetailCommand) {
        const { createTaskDetailReqDtoList } = CreateTaskDetailCommand;
        var taskDetailList = createTaskDetailReqDtoList.map(createTaskDetailReqDto => this.mapper.map(createTaskDetailReqDto, dto_1.CreateTaskDetailReqDto, taskDetail_entity_1.TaskDetailEntity));
        return this.repository.createManyTaskDetail(taskDetailList);
    }
};
CreateTaskDetailHandler = __decorate([
    (0, cqrs_1.CommandHandler)(CreateTaskDetail_command_1.CreateTaskDetailCommand),
    __param(1, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [tasksEntity_repository_1.TasksEntityRepository, Object])
], CreateTaskDetailHandler);
exports.CreateTaskDetailHandler = CreateTaskDetailHandler;
//# sourceMappingURL=createTaskDetail.handler.js.map