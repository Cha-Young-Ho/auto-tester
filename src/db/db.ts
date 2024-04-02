import { DatabaseConfig } from '../config/config';
import { DBType } from './db.type';

export interface dbs{
    getConnection: (field : DBType) => any;
}
