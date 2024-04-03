import path from 'path';
import { DatabaseConfig, readDatabaseConfigFromYaml } from '../config/config';
import { DBType } from './db.type';
import { getMySQLConnection } from './sql/mysql';
import { getMemcachedConnection } from './cache/memcached';
import { getRedisConnection } from './cache/redis';
import { PoolConnection } from 'mysql';

const databaseFunctions: { [key: string]: Function } = {
  mysql: getMySQLConnection,
  redis: getRedisConnection,
  memcached: getMemcachedConnection
};

export const dbFunction = {
  async getConnection(field: DBType): Promise<PoolConnection> {
    const configPath = path.resolve(__dirname, '../env/resource.yaml');
    const config = readDatabaseConfigFromYaml<DatabaseConfig>(configPath.toString(), field);
  
    return await databaseFunctions[field](config);
  }
};

export default databaseFunctions;
