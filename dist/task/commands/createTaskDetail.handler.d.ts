import { ICommandHandler } from '@nestjs/cqrs';
import { CreateTaskDetailCommand } from './CreateTaskDetail.command';
import { TasksEntityRepository } from '../repository/tasksEntity.repository';
import { Mapper } from '@automapper/core';
import { AutomapperProfile } from '@automapper/nestjs';
export declare class CreateTaskDetailHandler extends AutomapperProfile implements ICommandHandler<CreateTaskDetailCommand> {
    private readonly repository;
    constructor(repository: TasksEntityRepository, mapper: Mapper);
    get profile(): (mapper: any) => void;
    execute(CreateTaskDetailCommand: CreateTaskDetailCommand): Promise<any>;
}
