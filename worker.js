// 处理CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With, X-API-KEY',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Max-Age': '86400',
};

// 处理OPTIONS请求
async function handleOptions(request) {
  return new Response(null, {
    headers: corsHeaders,
  });
}

// 处理代理请求
async function handleRequest(request) {
  // 处理OPTIONS请求
  if (request.method === 'OPTIONS') {
    return handleOptions(request);
  }

  const url = new URL(request.url);
  const targetUrl = new URL(url.pathname + url.search, TARGET_URL);

  // 创建新的请求
  const newRequest = new Request(targetUrl, {
    method: request.method,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache',
      'Host': 'www.bitget.com',
      'Origin': 'https://www.bitget.com',
      'Referer': 'https://www.bitget.com/',
    },
    body: request.body,
  });

  try {
    // 发送请求到目标服务器
    const response = await fetch(newRequest);
    
    // 创建新的响应
    const newResponse = new Response(response.body, response);
    
    // 添加CORS头
    Object.keys(corsHeaders).forEach(key => {
      newResponse.headers.set(key, corsHeaders[key]);
    });

    return newResponse;
  } catch (error) {
    return new Response('Error: ' + error.message, { status: 500 });
  }
}

// 注册事件监听器
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
}); 