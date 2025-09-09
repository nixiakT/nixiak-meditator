# 🧘 心灵静域 (Mindful Sanctuary)

一个基于 AI 的个性化冥想指导网页应用，帮助用户在繁忙的生活中找到片刻的宁静与和谐。

[**🚀 访问线上应用 (Live Demo)**](https://nixiak-meditator-api.onrender.com)

![应用截图](https_link_to_your_screenshot.png) 
*请将这里的链接替换成你的应用截图链接*

---

## ✨ 主要功能 (Features)

* **🤖 AI 冥想伙伴**: 用户可以输入自己的感受或需求（如“压力很大”、“需要专注”），应用会通过调用通义千问 API，生成一段专属的、个性化的冥想引导语。
* **🗣️ 语音播报**: 生成的引导语可以通过浏览器内置的语音合成技术 (Text-to-Speech) 朗读出来，提供沉浸式体验。
* **🍃 环境音韵**: 提供多种高品质背景音（如雨声、森林、海浪），用户可以自由选择和调节音量，营造舒适的冥想氛围。
* **⏱️ 静心计时器**: 内置一个可自定义时长的冥想计时器，并在结束时有铃声提醒。
* **🎶 预设冥想练习**: 包含多个预设的引导冥想音频，适合快速开始一个练习。
* **💖 每日启示**: 提供一个“心灵启示”卡片功能，随机生成一句富有哲理的话语，给予用户灵感。
* **🌐 双语支持**: 应用界面和 AI 生成内容支持中英双语切换。

---

## 🛠️ 技术栈 (Tech Stack)

* **前端 (Frontend)**: HTML, CSS, 原生 JavaScript (Vanilla JS)
* **后端 (Backend)**: Node.js, Express.js
* **AI 服务 (AI Service)**: 阿里云百炼 DashScope (通义千问 `qwen-turbo`)
* **部署 (Deployment)**: Render

---

## 🚀 本地运行 (Getting Started)

如果你想在本地运行这个项目，请按照以下步骤操作：

1.  **克隆仓库**
    ```bash
    git clone [https://github.com/nixiaKT/nixiak-meditator.git](https://github.com/nixiaKT/nixiak-meditator.git)
    ```

2.  **进入项目目录**
    ```bash
    cd nixiak-meditator
    ```

3.  **安装依赖**
    ```bash
    npm install
    ```

4.  **设置环境变量**
    * 在项目根目录下创建一个名为 `.env` 的文件。
    * 在文件中添加你的阿里云 DashScope API Key，格式如下：
        ```
        DASHSCOPE_API_KEY=your_api_key_here
        ```

5.  **启动服务**
    ```bash
    npm start
    ```
    应用将会在 `http://localhost:3000` 上运行。

---
