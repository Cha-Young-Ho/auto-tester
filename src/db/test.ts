import { DatabaseConfig } from '../config/config';
import * as mysql from 'mysql';
import memcached from 'memcached';
import { PoolConnection } from 'mysql';
let pool: mysql.Pool;

function initializeMySQLPool(config: DatabaseConfig): void {
    pool = mysql.createPool({
        connectionLimit: 10, // 연결 풀의 최대 연결 수를 설정합니다.
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database
    });
}

// databaseFunctions.ts
function getMySQLConnection(config: DatabaseConfig): Promise<PoolConnection> {
    if(!pool) {
        initializeMySQLPool(config);
        
    }
    return new Promise<PoolConnection>((resolve, reject) => {
        pool.getConnection((error, connection) => {
            if (error) {
                reject(error);
            } else {
                resolve(connection);
            }
        });
    });
}
  
  function getRedisConnection(config: DatabaseConfig): any {
    // Redis 데이터베이스에 대한 연결을 생성하는 코드
    return `Redis connection with config: ${JSON.stringify(config)}`;
  }
  
  function getMemcachedConnection(config: DatabaseConfig): any {
    return new memcached(config.host + ':' + config.port);
  }
  export { getMySQLConnection, getRedisConnection, getMemcachedConnection };
  