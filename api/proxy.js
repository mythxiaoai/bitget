const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// 静态文件服务
app.use(express.static(path.join(__dirname, '../public')));

// 处理 OPTIONS 请求
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, X-API-KEY');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(200);
});

// 代理配置
const proxyOptions = {
    target: 'https://www.bitget.com',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
        '^/api': '', // 重写路径
    },
    onProxyReq: function(proxyReq, req, res) {
        // 添加必要的请求头
        proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        proxyReq.setHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8');
        proxyReq.setHeader('Accept-Language', 'en-US,en;q=0.5');
        proxyReq.setHeader('Connection', 'keep-alive');
        proxyReq.setHeader('Cache-Control', 'no-cache');
        proxyReq.setHeader('Host', 'www.bitget.com');
        proxyReq.setHeader('Origin', 'https://www.bitget.com');
        proxyReq.setHeader('Referer', 'https://www.bitget.com/');
    },
    onProxyRes: function (proxyRes, req, res) {
        // 处理响应头
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, Content-Length, X-Requested-With, X-API-KEY';
        proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
        proxyRes.headers['Access-Control-Max-Age'] = '86400'; // 24小时
    }
};

// 设置代理
app.use('/api', createProxyMiddleware(proxyOptions));

// Vercel 需要导出 app
module.exports = app;

// 如果直接运行此文件，则启动服务器
if (require.main === module) {
    app.listen(port, () => {
        console.log(`代理服务器运行在 http://localhost:${port}`);
    });
} 