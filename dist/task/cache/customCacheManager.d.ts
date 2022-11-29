import { Cache } from 'cache-manager';
export declare class customCacheManager {
    private cacheManager;
    constructor(cacheManager: Cache);
    cache(key: string, item: string, ttl?: number): Promise<void>;
    getCached(T: any, key: string): Promise<any>;
}
