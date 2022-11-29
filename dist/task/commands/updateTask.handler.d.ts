import { ICommandHandler } from '@nestjs/cqrs';
import { UpdateTaskCommand } from './updateTask.command';
import { TasksEntityRepository } from '../repository/tasksEntity.repository';
export declare class UpdateTaskHandler implements ICommandHandler<UpdateTaskCommand> {
    private readonly repository;
    constructor(repository: TasksEntityRepository);
    execute(UpdateTaskCommand: UpdateTaskCommand): Promise<any>;
}
