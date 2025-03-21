require('dotenv').config();
const express = require('express');
const app = express();
const port = 3001;
const { sql, poolConnect, pool } = require('./db'); // db.js 가져오기!

app.use(express.json());

// 게시글 리스트
app.get('/board', async (req, res) => {
    const rowCount = req.query.rowCount || 100;
    try {
        await poolConnect;
        const request = pool.request();
        request.input('ROWCOUNT', sql.Int, rowCount);
        const result = await request.execute('JOB.dbo.KMJ_BOARD_LST');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('리스트 조회 실패');
    }
});

// 게시글 상세보기
app.get('/board/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await poolConnect;
        const request = pool.request();
        request.input('ID', sql.Int, id);
        const result = await request.execute('JOB.dbo.KMJ_BOARD_DETAIL');
        res.json(result.recordset[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('상세 조회 SP 실패!!!');
    }
});

// 게시글 작성
app.post('/board', async (req, res) => {
    console.log(req.body);
    const { title, content, writer } = req.body;
    try {
        await poolConnect;
        const request = pool.request();
        request.input('TITLE', sql.NVarChar, title);
        request.input('CONTENT', sql.NVarChar, content);
        request.input('WRITER', sql.NVarChar, writer);
        await request.execute('JOB.dbo.KMJ_BOARD_CREATE');
        res.send('게시글 등록 성공!!!');
    } catch (err) {
        console.error(err);
        res.status(500).send('등록 실패!!!');
    }
});

// 게시글 수정
app.put('/board/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        await poolConnect;
        const request = pool.request();
        request.input('ID', sql.Int, id);
        request.input('TITLE', sql.NVarChar, title);
        request.input('CONTENT', sql.NVarChar, content);
        await request.execute('JOB.dbo.KMJ_BOARD_UPDATE');
        res.send('수정 성공!!!');
    } catch (err) {
        console.error(err);
        res.status(500).send('수정 실패했다!!! ');
    }
});

// 게시글 삭제
app.delete('/board/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await poolConnect;
        const request = pool.request();
        request.input('id', sql.Int, id);
        await request.execute('JOB.dbo.KMJ_BOARD_DELETE');
        res.send('삭제 완료!!!');
    } catch (err) {
        console.error(err);
        res.status(500).send('삭제 실패... ');
    }
});

app.listen(port, () => {
    console.log(`${port} 포트에서 서버 실행 중이다!!!`);
});
