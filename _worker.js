// Cloudflare Worker CORS Proxy

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // 获取请求URL
  const url = new URL(request.url);
  let targetUrl = url.searchParams.get('url');
  
  // 如果没有提供url参数，返回使用说明
  if (!targetUrl) {
    return new Response(
      JSON.stringify({
        error: 'Missing "url" parameter',
        usage: 'GET /?url=https://example.com/api/data',
        example: 'https://your-worker.dev/?url=https://api.example.com/users'
      }, null, 2),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
        }
      }
    );
  }

  // 验证URL格式
  try {
    new URL(targetUrl);
  } catch (e) {
    return new Response(
      JSON.stringify({ error: 'Invalid URL provided' }, null, 2),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }

  // 限制只能代理HTTP/HTTPS协议
  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    return new Response(
      JSON.stringify({ error: 'Only HTTP and HTTPS protocols are allowed' }, null, 2),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }

  // 准备转发请求的配置
  const requestMethod = request.method;
  const requestHeaders = new Headers(request.headers);
  
  // 创建新的请求头，移除可能导致问题的头部
  const forwardHeaders = new Headers();
  const allowedHeaders = ['content-type', 'authorization', 'accept', 'origin', 'x-requested-with'];
  
  for (const header of allowedHeaders) {
    const value = requestHeaders.get(header);
    if (value) {
      forwardHeaders.set(header, value);
    }
  }
  
  // 添加必要的头部
  forwardHeaders.set('user-agent', 'CORS-Proxy-CloudflareWorker/1.0');
  
  // 处理请求体（用于POST、PUT等）
  let body = null;
  if (requestMethod !== 'GET' && requestMethod !== 'HEAD') {
    try {
      body = await request.arrayBuffer();
    } catch (e) {
      // 如果没有请求体，忽略错误
    }
  }

  // 转发请求到目标服务器
  let response;
  try {
    response = await fetch(targetUrl, {
      method: requestMethod,
      headers: forwardHeaders,
      body: body,
      redirect: 'follow'
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch target URL',
        details: error.message 
      }, null, 2),
      {
        status: 502,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }

  // 克隆响应以读取内容
  const responseBody = await response.arrayBuffer();
  const responseHeaders = new Headers(response.headers);
  
  // 添加CORS头部
  responseHeaders.set('Access-Control-Allow-Origin', '*');
  responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  responseHeaders.set('Access-Control-Expose-Headers', '*');
  
  // 返回带有CORS头的响应
  return new Response(responseBody, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders
  });
}

// 处理OPTIONS预检请求
export async function handleOptions(request) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Max-Age': '86400'
    }
  });
}
