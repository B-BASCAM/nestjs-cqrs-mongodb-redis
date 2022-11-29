import { CreateTaskResDto } from "../dto";
export declare class TaskCreatedEvent {
    readonly createTaskResDto: CreateTaskResDto;
    constructor(createTaskResDto: CreateTaskResDto);
}
