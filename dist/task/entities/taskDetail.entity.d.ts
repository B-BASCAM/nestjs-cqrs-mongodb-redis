import { ObjectID } from 'typeorm';
export declare class TaskDetailEntity {
    _id: ObjectID;
    taskId: ObjectID;
    matchedFilePath: string;
}
