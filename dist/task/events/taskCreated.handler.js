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
exports.TaskCreatedHandler = void 0;
const events_handler_decorator_1 = require("@nestjs/cqrs/dist/decorators/events-handler.decorator");
const taskCreated_event_1 = require("./taskCreated.event");
const redisManager_1 = require("../queue/redisManager");
let TaskCreatedHandler = class TaskCreatedHandler {
    constructor(redisManager) {
        this.redisManager = redisManager;
    }
    handle(event) {
        const { createTaskResDto } = event;
        const taskName = "add";
        const taskData = [createTaskResDto.id, createTaskResDto.requestedFileName];
        this.redisManager.sendMessage(taskName, taskData);
    }
};
TaskCreatedHandler = __decorate([
    (0, events_handler_decorator_1.EventsHandler)(taskCreated_event_1.TaskCreatedEvent),
    __metadata("design:paramtypes", [redisManager_1.RedisManager])
], TaskCreatedHandler);
exports.TaskCreatedHandler = TaskCreatedHandler;
//# sourceMappingURL=taskCreated.handler.js.map