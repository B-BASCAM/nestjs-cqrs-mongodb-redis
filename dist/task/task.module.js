"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("./entities/task.entity");
const tasksEntity_repository_1 = require("./repository/tasksEntity.repository");
const index_1 = require("./queries/index");
const index_2 = require("./commands/index");
const index_3 = require("./events/index");
const nestjs_1 = require("@automapper/nestjs");
const task_controller_1 = require("./task.controller");
const config_1 = require("@nestjs/config");
const customCacheManager_1 = require("./cache/customCacheManager");
const redisManager_1 = require("./queue/redisManager");
const taskDetail_entity_1 = require("./entities/taskDetail.entity");
const redisManager = {
    useFactory: (configService) => {
        return new redisManager_1.RedisManager(configService.get('REDIS_BROKER', 'redis://myredis:6379/0'), configService.get('REDIS_BACKEND', 'redis://myredis:6379/0'));
    },
    provide: redisManager_1.RedisManager,
    inject: [config_1.ConfigService]
};
let FilesModule = class FilesModule {
};
FilesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cqrs_1.CqrsModule,
            typeorm_1.TypeOrmModule.forFeature([task_entity_1.TaskEntity, taskDetail_entity_1.TaskDetailEntity]),
            nestjs_1.AutomapperModule,
            config_1.ConfigModule,
            common_1.CacheModule.register({ max: 10, isGlobal: true })
        ],
        controllers: [task_controller_1.FilesController],
        providers: [
            tasksEntity_repository_1.TasksEntityRepository,
            ...index_1.QueryHandlers,
            ...index_2.CommandHandlers,
            ...index_3.EventHandlers,
            customCacheManager_1.customCacheManager,
            redisManager,
        ],
    })
], FilesModule);
exports.FilesModule = FilesModule;
//# sourceMappingURL=task.module.js.map