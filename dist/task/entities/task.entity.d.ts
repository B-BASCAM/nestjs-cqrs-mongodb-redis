import { ObjectID } from 'typeorm';
export declare class TaskEntity {
    _id: ObjectID;
    requestedFileName: string;
    status: string;
    progressPercentage: number;
    countOfMatchedFiles: number;
    createAt: string;
    updateAt: string;
    result: string;
}
