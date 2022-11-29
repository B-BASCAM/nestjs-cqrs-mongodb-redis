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
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("./dto/index");
const getTaskDetailsById_query_1 = require("./queries/getTaskDetailsById.query");
const createTask_command_1 = require("./commands/createTask.command");
const config_1 = require("@nestjs/config");
const updateTask_command_1 = require("./commands/updateTask.command");
const CreateTaskDetail_command_1 = require("./commands/CreateTaskDetail.command");
let FilesController = class FilesController {
    constructor(commandBus, queryBus, configService) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
        this.configService = configService;
    }
    async createTask(params) {
        let createTaskResDto;
        try {
            createTaskResDto = this.commandBus.execute(new createTask_command_1.CreateTaskCommand(params));
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(this.configService.get('ERROR_INTERNALSERVER', 'An Unknown Error Occured') + ": " + err);
        }
        return createTaskResDto;
    }
    async showTaskDetail(params) {
        let showTaskDetailResDto;
        try {
            showTaskDetailResDto = this.queryBus.execute(new getTaskDetailsById_query_1.GetTaskDetailByIdQuery(params));
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(this.configService.get('ERROR_INTERNALSERVER', 'An Unknown Error Occured') + ": " + err);
        }
        if (!(await showTaskDetailResDto)) {
            throw new common_1.NotFoundException(this.configService.get('ERROR_NOTFOUND', '404 Not Found'));
        }
        return showTaskDetailResDto;
    }
    async updateTask(params) {
        try {
            return this.commandBus.execute(new updateTask_command_1.UpdateTaskCommand(params));
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(this.configService.get('ERROR_INTERNALSERVER', 'An Unknown Error Occured') + ": " + err);
        }
    }
    async createTaskDetail(params) {
        try {
            return this.commandBus.execute(new CreateTaskDetail_command_1.CreateTaskDetailCommand(params));
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(this.configService.get('ERROR_INTERNALSERVER', 'An Unknown Error Occured') + ": " + err);
        }
    }
};
__decorate([
    (0, swagger_1.ApiCreatedResponse)({ type: index_1.CreateTaskResDto }),
    (0, common_1.Post)('createTask'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_1.CreateTaskReqDto]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "createTask", null);
__decorate([
    (0, common_1.Get)('showTaskDetail/:id/:pageNumber'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_1.ShowTaskDetailReqDto]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "showTaskDetail", null);
__decorate([
    (0, common_1.Put)('updateTask'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_1.UpdateTaskReqDto]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "updateTask", null);
__decorate([
    (0, swagger_1.ApiCreatedResponse)(),
    (0, common_1.Post)('createTaskDetail'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "createTaskDetail", null);
FilesController = __decorate([
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus,
        config_1.ConfigService])
], FilesController);
exports.FilesController = FilesController;
//# sourceMappingURL=task.controller.js.map