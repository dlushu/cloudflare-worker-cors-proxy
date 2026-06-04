# 🌐 Cloudflare Worker CORS Proxy

一个基于 Cloudflare Workers 的轻量级 CORS 代理，解决前端跨域请求问题。

## ✨ 特性

- 🚀 **即部署即用** - 无需配置，部署到 Cloudflare Workers 即可使用
- 🔄 **全方法支持** - 支持 GET、POST、PUT、DELETE、OPTIONS 等所有 HTTP 方法
- 📦 **全请求体支持** - 自动转发 JSON、表单、文件等请求体
- 🔐 **协议限制** - 仅允许 HTTP/HTTPS，确保安全
- 🌍 **完整 CORS 头** - 自动添加跨域响应头，支持预检请求
- ⚡ **高性能** - 基于 Cloudflare 全球网络，延迟极低

## 🎯 使用场景

- **前端 API 调试** - 解决本地开发时的跨域问题
- **第三方服务集成** - 调用不支持 CORS 的第三方 API
- **静态网站数据获取** - GitHub Pages 等静态站点获取外部数据
- **临时代理需求** - 快速搭建一个代理服务

## 🚀 一键部署

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/dlushu/cloudflare-worker-cors-proxy)


## 🛠 手动部署

### 1️⃣ 创建 Worker

1. 打开 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages**
2. 点击 **创建 Worker**
3. 删除默认代码
4. 完整复制项目中的 `_worker.js` 代码
5. 点击 **保存并部署**

### 2️⃣ 绑定自定义域名（可选）

在 Worker 管理页面 → **触发器** → **自定义域** 添加你的域名

## 📖 使用方法

### 基础使用
