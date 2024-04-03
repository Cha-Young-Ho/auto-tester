import { DatabaseConfig } from '../../config/config';
import { DBType } from '../db.type';

export interface sql{
    getConnection: (field : DBType) => any;
}
