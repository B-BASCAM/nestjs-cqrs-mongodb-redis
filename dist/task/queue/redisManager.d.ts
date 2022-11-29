export declare class RedisManager {
    redisBrokerAdr: string;
    redisBackendAdr: string;
    constructor(redisBroker: string, redisBackendAdr: string);
    sendMessage(taskName: string, taskData: string[]): Promise<void>;
}
