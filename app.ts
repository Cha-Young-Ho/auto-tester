import express, { Application, Request, Response } from 'express'
import path from 'path';

const app: Application = express()

const port: number = 3001
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index'); // index.pug 파일을 렌더링합니다.
});

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})