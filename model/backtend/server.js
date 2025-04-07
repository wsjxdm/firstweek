const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // 引入 cors 中间件

const app = express();
const port = 3000;
app.use(cors());
// 使用 body-parser 来解析请求体中的 JSON 数据
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
// 记录接收到的数据
let receivedData = null;

// 设置 POST 请求的路由
app.post('/api/submit', (req, res) => {
    receivedData = req.body; // 获取请求体中的 JSON 数据
    console.log('Received data:', receivedData); // 在控制台输出接收到的数据

    // 返回接收到的 JSON 数据给客户端
    res.json({
        status: 'success',
        message: 'Data received successfully',
        receivedData: receivedData
    });
});

// 设置 GET 请求的路由，直接返回获取到的数据
app.get('/api/submit', (req, res) => {
    if (receivedData) {
        res.json({
            receivedData: receivedData
        });
    } else {
        res.json({
            status: 'error',
            message: 'No data received yet'
        });
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
