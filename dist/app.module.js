"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("./task/entities/task.entity");
const task_module_1 = require("./task/task.module");
const classes_1 = require("@automapper/classes");
const nestjs_1 = require("@automapper/nestjs");
const config_1 = require("@nestjs/config");
const taskDetail_entity_1 = require("./task/entities/taskDetail.entity");
const configModule = config_1.ConfigModule.forRoot({
    isGlobal: true,
});
const autoMapperModule = nestjs_1.AutomapperModule.forRoot({
    strategyInitializer: (0, classes_1.classes)(),
});
const typeOrmModule = typeorm_1.TypeOrmModule.forRootAsync({
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: async (configService) => ({
        type: 'mongodb',
        host: configService.get('TYPEORM_HOST', 'mongodb'),
        username: 'admin',
        password: 'admin',
        database: 'test',
        entities: [task_entity_1.TaskEntity, taskDetail_entity_1.TaskDetailEntity],
        synchronize: true,
        authSource: 'admin',
    }),
});
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [configModule, autoMapperModule, typeOrmModule, task_module_1.FilesModule],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map