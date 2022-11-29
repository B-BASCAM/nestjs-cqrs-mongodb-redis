import { MongoRepository, ObjectID, ObjectLiteral } from 'typeorm';
import { MongoFindManyOptions } from 'typeorm/find-options/mongodb/MongoFindManyOptions';
import { TaskEntity } from '../entities/task.entity';
import { TaskDetailEntity } from '../entities/taskDetail.entity';
export declare class TasksEntityRepository {
    private readonly taskRepository;
    private readonly taskDetailRepository;
    constructor(taskRepository: MongoRepository<TaskEntity>, taskDetailRepository: MongoRepository<TaskDetailEntity>);
    createTask(TaskEntity: TaskEntity): Promise<TaskEntity>;
    findTaskById(id: ObjectID): Promise<TaskEntity>;
    findTaskDetailByTaskId(options: MongoFindManyOptions): Promise<TaskDetailEntity[]>;
    updateOneTask(query: ObjectLiteral, update: ObjectLiteral): Promise<any>;
    createManyTaskDetail(taskDetailEntityList: TaskDetailEntity[]): Promise<any>;
}
