import * as cdk from '@aws-cdk/core';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam';
import * as AWS from 'aws-sdk';

// AWS 자격 증명 설정
const credentials = new AWS.SharedIniFileCredentials({ profile: 'your-aws-profile' }); // AWS 자격 증명 프로필 지정
AWS.config.credentials = credentials;

// CDK 애플리케이션 정의
const app = new cdk.App();

// 스택 정의
const stack = new cdk.Stack(app, 'EcsStack');

// VPC 생성
const vpc = new ec2.Vpc(stack, 'MyVpc');

// ECS 클러스터 생성
const cluster = new ecs.Cluster(stack, 'MyCluster', {
  vpc
});

// ECS 작업 정의
const taskDefinition = new ecs.FargateTaskDefinition(stack, 'MyTaskDefinition');

// 컨테이너 정의
const container = taskDefinition.addContainer('MyContainer', {
  image: ecs.ContainerImage.fromRegistry('nginx'),
  memoryLimitMiB: 512,
  cpu: 256
});

// 컨테이너 포트 매핑
container.addPortMappings({
  containerPort: 80,
  hostPort: 80,
  protocol: ecs.Protocol.TCP
});

// ECS 서비스 역할 생성
const taskExecutionRole = new iam.Role(stack, 'MyTaskExecutionRole', {
  assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
});

// 태스크 실행 역할에 필요한 권한 부여
taskExecutionRole.addToPolicy(new iam.PolicyStatement({
  actions: ['ecr:GetAuthorizationToken'],
  resources: ['*'],
}));

// ECS 서비스 생성
new ecs.FargateService(stack, 'MyFargateService', {
  cluster,
  taskDefinition,
  desiredCount: 3, // 원하는 태스크 수
});

// 스택 배포
app.synth();
