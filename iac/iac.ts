import { exec } from 'child_process';

export interface iac{
    findTasksByGroupId: (groupId : number) => any;
    findTaskById: (id : number) => any;
    createTasksByContents: (contents: any) => any;
    updateTasksByContents: (contents: any[]) => any;
    deleteTasksByGroupId: (groupId : number) => any;
}