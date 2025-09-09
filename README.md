# 🧘 Mindful Sanctuary

An AI-powered, personalized meditation guide web application designed to help users find moments of peace and harmony in their busy lives.

[**🚀 Live Demo**](https://nixiak-meditator-api.onrender.com)

<img width="1512" height="822" alt="Image" src="https://github.com/user-attachments/assets/9452d90b-fc85-4334-8530-696a09d83ebb" />

---

## ✨ Features

* **🤖 AI Meditation Partner**: Users can input their feelings or needs (e.g., "stressed," "need to focus"), and the app, powered by the Tongyi Qianwen API, generates a unique, personalized meditation script.
* **🗣️ Text-to-Speech Narration**: The generated script can be read aloud using the browser's built-in Speech Synthesis technology for an immersive experience.
* **🍃 Ambient Sounds**: A selection of high-quality background sounds (like rain, forest, ocean waves) that users can choose and adjust the volume for, creating a comfortable meditation environment.
* **⏱️ Mindful Timer**: A built-in, customizable meditation timer with a bell sound to mark the end of a session.
* **🎶 Preset Meditation Practices**: Includes several pre-recorded guided meditation audio files for quickly starting a practice.
* **💖 Daily Insights**: A "Wisdom Card" feature that generates a random, insightful quote to provide users with inspiration.
* **🌐 Bilingual Support**: The user interface and AI-generated content support both English and Chinese.

## 🛠️ Tech Stack

* **Frontend**: HTML, CSS, Vanilla JavaScript
* **Backend**: Node.js, Express.js
* **AI Service**: Alibaba Cloud DashScope (Tongyi Qianwen `qwen-turbo`)
* **Deployment**: Render

## 🚀 Getting Started (Local Setup)

To run this project locally, please follow these steps:

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/nixiaKT/nixiak-meditator.git](https://github.com/nixiaKT/nixiak-meditator.git)
    ```

2.  **Navigate to the project directory**
    ```bash
    cd nixiak-meditator
    ```

3.  **Install dependencies**
    ```bash
    npm install
    ```

4.  **Set up environment variables**
    * Create a file named `.env` in the root of the project.
    * Add your Alibaba Cloud DashScope API Key in the following format:
        ```
        DASHSCOPE_API_KEY=your_api_key_here
        ```

5.  **Start the server**
    ```bash
    npm start
    ```
    The application will be running at `http://localhost:3000`.

---
<br>

# 🧘 心灵静域

一个基于 AI 的个性化冥想指导网页应用，帮助用户在繁忙的生活中找到片刻的宁静与和谐。

[**🚀 访问线上应用 (Live Demo)**](https://nixiak-meditator-api.onrender.com)

<img width="1511" height="821" alt="Image" src="https://github.com/user-attachments/assets/2b0cb00e-4760-4749-a5f8-8ac5f1b0bcaa" />

---

## ✨ 主要功能

* **🤖 AI 冥想伙伴**: 用户可以输入自己的感受或需求（如“压力很大”、“需要专注”），应用会通过调用通义千问 API，生成一段专属的、个性化的冥想引导语。
* **🗣️ 语音播报**: 生成的引导语可以通过浏览器内置的语音合成技术 (Text-to-Speech) 朗读出来，提供沉浸式体验。
* **🍃 环境音韵**: 提供多种高品质背景音（如雨声、森林、海浪），用户可以自由选择和调节音量，营造舒适的冥想氛围。
* **⏱️ 静心计时器**: 内置一个可自定义时长的冥想计时器，并在结束时有铃声提醒。
* **🎶 预设冥想练习**: 包含多个预设的引导冥想音频，适合快速开始一个练习。
* **💖 每日启示**: 提供一个“心灵启示”卡片功能，随机生成一句富有哲理的话语，给予用户灵感。
* **🌐 双语支持**: 应用界面和 AI 生成内容支持中英双语切换。

## 🛠️ 技术栈

* **前端**: HTML, CSS, 原生 JavaScript (Vanilla JS)
* **后端**: Node.js, Express.js
* **AI 服务**: 阿里云百炼 DashScope (通义千问 `qwen-turbo`)
* **部署**: Render

## 🚀 本地运行

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
