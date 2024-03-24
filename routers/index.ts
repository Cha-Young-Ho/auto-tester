import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index'); // index.pug 파일을 렌더링하여 응답
});

export default router;