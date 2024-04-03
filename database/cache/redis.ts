import { DatabaseConfig } from '../../config/config';

function getRedisConnection(config: DatabaseConfig): any {
    // Redis 데이터베이스에 대한 연결을 생성하는 코드
    return `Redis connection with config: ${JSON.stringify(config)}`;
}

export { getRedisConnection };