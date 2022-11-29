import { IQueryHandler } from '@nestjs/cqrs';
import { TasksEntityRepository } from '../repository/tasksEntity.repository';
import { GetTaskDetailByIdQuery } from './getTaskDetailsById.query';
import { AutomapperProfile } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { customCacheManager } from '../cache/customCacheManager';
export declare class GetTaskDetailByIdHandler extends AutomapperProfile implements IQueryHandler<GetTaskDetailByIdQuery> {
    private readonly repository;
    private readonly customCacheManager;
    constructor(repository: TasksEntityRepository, customCacheManager: customCacheManager, mapper: Mapper);
    get profile(): (mapper: any) => void;
    execute(query: GetTaskDetailByIdQuery): Promise<any>;
}
