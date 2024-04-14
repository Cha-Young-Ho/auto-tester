import { DatabaseConfig, readDatabaseConfigFromYaml } from '../../config/config';
import * as mysql from 'mysql';
import { PoolConnection } from 'mysql';
import { sql } from './sql';
import path from 'path';
import { DBType } from '../db.type';
import { Task } from '../../src/task/TaskController';
let pool: mysql.Pool;
let connection: PoolConnection;

initializeMySQLPool();
function initializeMySQLPool(): void {
    if(!pool) {
        const configPath = path.resolve(__dirname, '../../env/resource.yaml');
        const config = readDatabaseConfigFromYaml<DatabaseConfig>(configPath.toString(), DBType.MYSQL);
        pool = mysql.createPool({
            connectionLimit: 10, // 연결 풀의 최대 연결 수를 설정합니다.
            host: config.host,
            port: config.port,
            user: config.user,
            password: config.password,
            database: config.database
        });
    }
}
export const mysqlImpl : sql = {
    // databaseFunctions.ts
    async getConnection() {
        connection = await new Promise<PoolConnection>((resolve, reject) => {
            pool.getConnection((error, connection) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(connection);
                }
            });
        });
    },

    async findTaskById(id : number) {
        const query = 'SELECT * FROM ec2_instance WHERE id = ?';
        const params = [id];
        await this.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(query, params, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    const task = results.length > 0 ? {
                        id: results[0].id,
                        name: results[0].name,
                        age: results[0].age
                    } : null;
                    resolve(task);
                }
            });
        });
    },

    async findTasksByGroupId(id : number) {
        const query = 'SELECT * FROM ec2_instance';

        return new Promise((resolve, reject) => {
            connection.query(query, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    },

    async getAllTasks() {
        const query = 'SELECT * FROM ec2_instance';
        return await new Promise((resolve, reject) => {
            connection.query(query, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    const tasks : Task[] = [];
                    for (let i = 0; i < results.length; i++)
                        tasks.push({
                            id: results[i].id,
                            tag: results[i].tag,
                            instanceType: results[i].instance_type,
                            status: results[i].status,
                            created: results[i].created,
                            updated: results[i].updated
                        });
                    resolve(tasks);
                }
                    
            })
        });
        
    }

}