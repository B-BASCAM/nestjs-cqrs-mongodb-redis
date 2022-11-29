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
exports.RedisManager = void 0;
const common_1 = require("@nestjs/common");
const celery = require("celery-node");
let RedisManager = class RedisManager {
    constructor(redisBroker, redisBackendAdr) {
        this.redisBrokerAdr = redisBroker;
        this.redisBackendAdr = redisBackendAdr;
    }
    async sendMessage(taskName, taskData) {
        try {
            const client = celery.createClient(this.redisBrokerAdr, this.redisBackendAdr);
            client.conf.TASK_PROTOCOL = 1;
            const task = client.createTask(taskName);
            task.applyAsync(taskData);
        }
        catch (err) {
        }
    }
};
RedisManager = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String, String])
], RedisManager);
exports.RedisManager = RedisManager;
//# sourceMappingURL=redisManager.js.map