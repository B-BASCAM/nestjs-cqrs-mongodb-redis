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
exports.CreateTaskHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const createTask_command_1 = require("./createTask.command");
const tasksEntity_repository_1 = require("../repository/tasksEntity.repository");
const nestjs_1 = require("@automapper/nestjs");
const core_1 = require("@automapper/core");
const task_entity_1 = require("../entities/task.entity");
const index_1 = require("../dto/index");
const status_enum_1 = require("../enums/status.enum");
const taskCreated_event_1 = require("../events/taskCreated.event");
const formatDate_1 = require("../helpers/formatDate");
let CreateTaskHandler = class CreateTaskHandler extends nestjs_1.AutomapperProfile {
    constructor(repository, eventBus, mapper) {
        super(mapper);
        this.repository = repository;
        this.eventBus = eventBus;
    }
    get profile() {
        return (mapper) => {
            (0, core_1.createMap)(mapper, task_entity_1.TaskEntity, index_1.CreateTaskResDto, (0, core_1.afterMap)((source, destination) => {
                destination.id = source._id.toString();
            }));
            (0, core_1.createMap)(mapper, index_1.CreateTaskReqDto, task_entity_1.TaskEntity, (0, core_1.beforeMap)((source, destination) => {
                destination.createAt = (0, formatDate_1.formatDate)(new Date()),
                    destination.updateAt = (0, formatDate_1.formatDate)(new Date()),
                    destination.progressPercentage = 0,
                    destination.status = status_enum_1.statusEnum.Waiting;
            }));
        };
    }
    async execute(createTaskCommand) {
        const { createTaskReqDto } = createTaskCommand;
        const taskEntity = this.mapper.map(createTaskReqDto, index_1.CreateTaskReqDto, task_entity_1.TaskEntity);
        const createdTaskEntity = await this.repository.createTask(taskEntity);
        const createTaskResDto = this.mapper.map(createdTaskEntity, task_entity_1.TaskEntity, index_1.CreateTaskResDto);
        this.eventBus.publish(new taskCreated_event_1.TaskCreatedEvent(createTaskResDto));
        return createTaskResDto;
    }
};
CreateTaskHandler = __decorate([
    (0, cqrs_1.CommandHandler)(createTask_command_1.CreateTaskCommand),
    __param(2, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [tasksEntity_repository_1.TasksEntityRepository,
        cqrs_1.EventBus, Object])
], CreateTaskHandler);
exports.CreateTaskHandler = CreateTaskHandler;
//# sourceMappingURL=createTask.handler.js.map