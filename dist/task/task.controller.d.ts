import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskReqDto, ShowTaskDetailReqDto, CreateTaskResDto, ShowTaskDetailResDto, UpdateTaskReqDto, CreateTaskDetailReqDto } from './dto/index';
import { ConfigService } from '@nestjs/config';
export declare class FilesController {
    private readonly commandBus;
    private readonly queryBus;
    private readonly configService;
    constructor(commandBus: CommandBus, queryBus: QueryBus, configService: ConfigService);
    createTask(params: CreateTaskReqDto): Promise<CreateTaskResDto>;
    showTaskDetail(params: ShowTaskDetailReqDto): Promise<ShowTaskDetailResDto>;
    updateTask(params: UpdateTaskReqDto): Promise<any>;
    createTaskDetail(params: CreateTaskDetailReqDto[]): Promise<any>;
}
