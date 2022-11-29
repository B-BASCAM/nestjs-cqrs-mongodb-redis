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
exports.GetTaskDetailByIdHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const tasksEntity_repository_1 = require("../repository/tasksEntity.repository");
const getTaskDetailsById_query_1 = require("./getTaskDetailsById.query");
const nestjs_1 = require("@automapper/nestjs");
const core_1 = require("@automapper/core");
const showTaskDetailRes_dto_1 = require("../dto/showTaskDetailRes.dto");
const task_entity_1 = require("../entities/task.entity");
const customCacheManager_1 = require("../cache/customCacheManager");
let GetTaskDetailByIdHandler = class GetTaskDetailByIdHandler extends nestjs_1.AutomapperProfile {
    constructor(repository, customCacheManager, mapper) {
        super(mapper);
        this.repository = repository;
        this.customCacheManager = customCacheManager;
    }
    get profile() {
        return (mapper) => {
            (0, core_1.createMap)(mapper, task_entity_1.TaskEntity, showTaskDetailRes_dto_1.ShowTaskDetailResDto, (0, core_1.afterMap)((source, destination) => {
            }));
        };
    }
    async execute(query) {
        const { showTaskDetailReqDto } = query;
        const cachedValue = await this.customCacheManager.getCached((Promise), showTaskDetailReqDto.id + showTaskDetailReqDto.pageNumber);
        if (cachedValue) {
            return JSON.parse(cachedValue);
        }
        const { ObjectID } = require('mongodb').ObjectId;
        const taskEntitys = await this.repository.findTaskById(ObjectID(showTaskDetailReqDto.id));
        const showTaskDetailResDto = this.mapper.map(taskEntitys, task_entity_1.TaskEntity, showTaskDetailRes_dto_1.ShowTaskDetailResDto);
        if (showTaskDetailResDto) {
            const skipNumber = Number(showTaskDetailReqDto.pageNumber) > 0 ? (Number(showTaskDetailReqDto.pageNumber) - 1) * 50 : 0;
            const options = { where: { taskId: ObjectID(showTaskDetailReqDto.id) }, skip: skipNumber, take: 50 };
            const taskDetailEntity = await this.repository.findTaskDetailByTaskId(options);
            const matchedFilePath = taskDetailEntity.map(o => o.matchedFilePath);
            showTaskDetailResDto.matchedFilePaths = matchedFilePath;
            await this.customCacheManager.cache(showTaskDetailReqDto.id + showTaskDetailReqDto.pageNumber, JSON.stringify(showTaskDetailResDto), 3000);
        }
        return showTaskDetailResDto;
    }
};
GetTaskDetailByIdHandler = __decorate([
    (0, cqrs_1.QueryHandler)(getTaskDetailsById_query_1.GetTaskDetailByIdQuery),
    __param(2, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [tasksEntity_repository_1.TasksEntityRepository,
        customCacheManager_1.customCacheManager, Object])
], GetTaskDetailByIdHandler);
exports.GetTaskDetailByIdHandler = GetTaskDetailByIdHandler;
//# sourceMappingURL=getTaskDetailsById.handler.js.map