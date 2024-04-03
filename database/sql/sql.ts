import { DatabaseConfig } from '../../config/config';
import { DBType } from '../db.type';

export interface sql{
    getConnection: () => any;
    findTaskById: (id : number) => any;
    findTasksByGroupId: (groupId : number) => any;
}
