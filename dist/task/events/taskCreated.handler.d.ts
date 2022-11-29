import { IEventHandler } from '@nestjs/cqrs';
import { TaskCreatedEvent } from './taskCreated.event';
import { RedisManager } from '../queue/redisManager';
export declare class TaskCreatedHandler implements IEventHandler<TaskCreatedEvent> {
    private readonly redisManager;
    constructor(redisManager: RedisManager);
    handle(event: TaskCreatedEvent): void;
}
