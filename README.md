## CORS Proxy - Cloudflare Worker

一个简单的 CORS 代理，解决前端跨域请求问题。


## 一键部署

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/dlushu/cloudflare-worker-cors-proxy)

### 基础用法
```
https://你的域名.workers.dev/?url=https://api.example.com/data
```

### POST 请求示例
```javascript
fetch('https://你的域名.workers.dev/?url=https://api.example.com/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'test' })
})
```

### curl 测试
```bash
# GET
curl "https://你的域名.workers.dev/?url=https://api.ipify.org?format=json"

# POST
curl -X POST "https://你的域名.workers.dev/?url=https://httpbin.org/post" \
  -H "Content-Type: application/json" \
  -d '{"key":"value"}'
```

## 参数说明

| 参数 | 必填 | 说明 |
|------|------|------|
| url | ✅ | 目标地址（需编码） |

## 特性

- ✅ 支持 GET、POST、PUT、DELETE、OPTIONS
- ✅ 自动添加 CORS 响应头
- ✅ 自动转发请求体
- ✅ 仅允许 HTTP/HTTPS

## 常见问题

**返回 400**：缺少 url 参数或 URL 格式错误

**返回 502**：目标服务器无法访问

## License

MIT
