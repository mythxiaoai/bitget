# Bitget 静态镜像代理服务

## 项目介绍

这是一个基于Deno的轻量级代理服务，用于提供Bitget网站的本地静态镜像和远程资源代理。

## 功能特点

- 本地静态文件服务和远程资源代理自动切换
- 内置资源预连接和预加载优化
- 智能内容类型识别
- 长期缓存策略提升重复访问速度
- 详细日志记录便于调试
- 跨域资源访问支持

## 快速开始

### 前提条件

- 安装 [Deno](https://deno.land/#installation)

### Deno安装指南

#### macOS (使用Homebrew)
```bash
brew install deno
```

#### Windows (使用PowerShell)
```bash
iwr -useb https://deno.land/x/install/install.ps1 | iex
```

#### Linux
```bash
curl -fsSL https://deno.land/x/install/install.sh | sh
```

### 安装步骤

1. 克隆仓库
   ```bash
   git clone https://github.com/yourusername/bitget-mirror.git
   cd bitget-mirror
   ```

2. 运行服务器
   ```bash
   # 默认端口运行
   deno run --allow-net --allow-read main.ts
   
   # 或指定80端口运行
   sudo deno run --allow-net --allow-read main.ts
   ```

3. 访问服务
   - 80端口: [http://localhost](http://localhost)

### 常见问题解决

1. 如果遇到模块找不到的问题，请更新Deno到最新版本:
   ```bash
   deno upgrade
   ```

2. 如果出现"找不到名称'Deno'"的错误，可能是TypeScript类型定义问题，请添加导入:
   ```typescript
   // 在main.ts顶部添加
   import { Deno } from "https://deno.land/x/deno_types/deno.ns.ts";
   ```

3. 80端口需要管理员权限，普通用户可以使用80等高位端口，然后通过Nginx等工具进行端口转发。

## 项目结构
