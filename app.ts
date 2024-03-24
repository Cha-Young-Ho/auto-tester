import express from 'express';
import path from 'path';
import indexRouter from './routers/index';
import taskRouter from './routers/task';

const app = express();

const port = 3000;
// 템플릿 엔진 설정
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 정적 파일 미들웨어 등록
app.use(express.static(path.join(__dirname, 'public')));

// 미들웨어 등록
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/task', taskRouter);

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});