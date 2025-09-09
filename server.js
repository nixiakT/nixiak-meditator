import 'dotenv/config';
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

// --- 中间件和 CORS 设置 ---
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    next();
});
app.use(express.json());

// --- 文本生成 API (通义千问) ---
const dashscopeApiKey = process.env.DASHSCOPE_API_KEY;
app.post('/generate-meditation', async (req, res) => {
    const userPrompt = req.body.prompt;
    const systemInstruction = `You are a professional meditation guide. Your task is to generate a meditation script suitable for reading aloud, based on the user's needs. Please ensure the script is: - Calm, soothing, and mindful in tone. - Positive and avoids negative or sensitive topics. - Moderate in length, about 450-600 words, suitable for a 5-10 minute meditation. - Contains clear instructions, such as "close your eyes," "breathe deeply," "feel your body." - If the user simply says "start meditation" or a similar simple command, you can generate a general relaxation meditation. - If the user provides a specific theme, such as "sleep aid," "stress relief," or "focus," please elaborate on that theme. - Does not contain any Markdown formatting, only plain text. - Starts directly with the body of the script.`;
    const apiUrl = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation';
    const requestBody = { model: 'qwen-turbo', input: { messages: [{ role: 'system', content: systemInstruction }, { role: 'user', content: userPrompt }] } };
    try {
        if (!dashscopeApiKey) { throw new Error('DASHSCOPE_API_KEY is not set in .env file'); }
        const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${dashscopeApiKey}` }, body: JSON.stringify(requestBody) });
        if (!response.ok) { const errorBody = await response.text(); console.error('DashScope API Error:', response.status, errorBody); throw new Error(`API request failed with status ${response.status}`); }
        const result = await response.json();
        if (result.code) { console.error('DashScope API Error Response:', result); throw new Error(`Tongyi Qianwen API Error: ${result.message || 'Unknown error'}`); }
        const meditationText = result.output.text;
        res.json({ meditationText });
    } catch (error) {
        console.error('Error calling DashScope API directly:', error);
        res.status(500).json({ error: 'Failed to call Tongyi Qianwen, please check API key and server logs.' });
    }
});

// --- 文本转语音 API (使用本地语音合成) ---
app.post('/text-to-speech', async (req, res) => {
    const text = req.body.text;
    if (!text) {
        return res.status(400).json({ error: 'Text is required for TTS.' });
    }

    try {
        // 使用本地语音合成作为备选方案
        // 这里我们返回文本，让前端使用浏览器语音合成
        res.json({ 
            success: true, 
            message: '使用浏览器语音合成',
            text: text 
        });
    } catch (error) {
        console.error('Error with local TTS:', error);
        res.status(200).json({ 
            error: 'TTS service error', 
            message: '语音合成服务出错，请使用浏览器朗读功能',
            text: text 
        });
    }
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});