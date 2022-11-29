import { EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateTaskCommand } from './createTask.command';
import { TasksEntityRepository } from '../repository/tasksEntity.repository';
import { AutomapperProfile } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
export declare class CreateTaskHandler extends AutomapperProfile implements ICommandHandler<CreateTaskCommand> {
    private readonly repository;
    private readonly eventBus;
    constructor(repository: TasksEntityRepository, eventBus: EventBus, mapper: Mapper);
    get profile(): (mapper: any) => void;
    execute(createTaskCommand: CreateTaskCommand): Promise<any>;
}
