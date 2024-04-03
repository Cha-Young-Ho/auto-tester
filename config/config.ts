import * as fs from 'fs';
import * as yaml from 'js-yaml';

export interface DatabaseConfig {
    host: string;
    port: number;
    user?: string;
    password?: string;
    database?: string;
    type: string;
}

// YAML 파일에서 데이터베이스 정보 읽기
export const readDatabaseConfigFromYaml = <T>(filePath: string, field: string): T => {
    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const yamlData : any = yaml.load(fileContents);
        const fieldValue = yamlData[field] as T; // 지정한 필드의 값 추출
        return fieldValue;
    } catch (error) {
        console.error('Error reading YAML file:', error);
        throw new Error('Failed to read YAML file');
    }
};

