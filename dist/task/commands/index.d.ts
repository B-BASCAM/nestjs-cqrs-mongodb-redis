import { CreateTaskHandler } from './createTask.handler';
import { UpdateTaskHandler } from './updateTask.handler';
import { CreateTaskDetailHandler } from './createTaskDetail.handler';
export declare const CommandHandlers: (typeof CreateTaskHandler | typeof UpdateTaskHandler | typeof CreateTaskDetailHandler)[];
