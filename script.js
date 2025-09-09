document.addEventListener('DOMContentLoaded', () => {
    // --- 获取所有需要操作的HTML元素 ---
    const guidedSelect = document.getElementById('guided-select');
    const guidedPlayBtn = document.getElementById('guided-play-btn');
    const guidedPauseBtn = document.getElementById('guided-pause-btn');
    const ambienceSelect = document.getElementById('ambience-select');
    const volumeSlider = document.getElementById('volume-slider');
    const timerInput = document.getElementById('timer-input');
    const timerStartBtn = document.getElementById('timer-start-btn');
    const timerStopBtn = document.getElementById('timer-stop-btn');
    const timerDisplay = document.getElementById('timer-display');
    const aiInput = document.getElementById('ai-input');
    const aiTalkBtn = document.getElementById('ai-talk-btn');
    const aiPlayBtn = document.getElementById('ai-play-btn');
    const aiStopBtn = document.getElementById('ai-stop-btn');
    const aiResponseText = document.getElementById('ai-response-text');
    const loadingSpinner = document.getElementById('loadingSpinner');

    // --- 创建音频播放器 ---
    const guidedAudio = new Audio();
    const ambienceAudio = new Audio();
    ambienceAudio.loop = true;
    const bellAudio = new Audio('audio/bell.mp3');
    
    // --- 语音合成控制 ---
    let speechSynthesis = window.speechSynthesis;
    let currentUtterance = null;
    let isUserStopped = false; // 标记是否是用户主动停止

    // --- 引导冥想功能 ---
    guidedSelect.addEventListener('change', () => {
        guidedAudio.src = guidedSelect.value;
    });
    
    guidedPlayBtn.addEventListener('click', () => {
        if (guidedAudio.src) {
            guidedAudio.play();
        } else {
            alert('请先选择一个冥想练习！');
        }
    });
    
    guidedPauseBtn.addEventListener('click', () => {
        guidedAudio.pause();
    });

    // --- 背景音功能 ---
    ambienceSelect.addEventListener('change', () => {
        const selectedAmbience = ambienceSelect.value;
        if (selectedAmbience) {
            ambienceAudio.src = selectedAmbience;
            ambienceAudio.play();
        } else {
            ambienceAudio.pause();
            ambienceAudio.src = '';
        }
    });
    
    volumeSlider.addEventListener('input', () => {
        ambienceAudio.volume = volumeSlider.value;
    });

    // --- 计时器功能 ---
    let timerInterval = null;
    let totalSeconds = parseInt(timerInput.value) * 60 || 300;
    
    function updateTimerDisplay() {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    timerStartBtn.addEventListener('click', () => {
        const minutes = parseInt(timerInput.value);
        if (isNaN(minutes) || minutes <= 0) return alert('请输入一个有效的分钟数！');
        
        clearInterval(timerInterval);
        totalSeconds = minutes * 60;
        updateTimerDisplay();
        
        timerInterval = setInterval(() => {
            totalSeconds--;
            updateTimerDisplay();
            
            if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                bellAudio.play();
                alert('冥想结束！');
            }
        }, 1000);
    });
    
    timerStopBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        totalSeconds = parseInt(timerInput.value) * 60;
        updateTimerDisplay();
    });
    
    timerInput.addEventListener('change', () => {
        if (!timerInterval) {
            totalSeconds = parseInt(timerInput.value) * 60;
            updateTimerDisplay();
        }
    });
    
    updateTimerDisplay();

    // --- AI 交流功能 ---
    aiTalkBtn.addEventListener('click', async () => {
        const userPrompt = aiInput.value.trim();
        if (!userPrompt) return alert('请输入你的冥想需求！');

        // 重置状态
        stopSpeech();
        aiPlayBtn.disabled = true;
        aiPlayBtn.textContent = '▶️ 播放';
        aiStopBtn.disabled = true;
        aiTalkBtn.disabled = true;
        aiTalkBtn.textContent = '思考中...';
        aiResponseText.textContent = '冥想导师正在为你准备引导语...';
        loadingSpinner.style.display = 'block';
        
        try {
            // 获取文本
            const textResponse = await fetch('http://localhost:3000/generate-meditation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: userPrompt })
            });
            
            if (!textResponse.ok) {
                const errorData = await textResponse.json();
                throw new Error(errorData.error || `API错误: ${textResponse.statusText}`);
            }
            
            const textData = await textResponse.json();
            aiResponseText.textContent = textData.meditationText;

            // 尝试获取音频（现在使用本地语音合成）
            const ttsResponse = await fetch('http://localhost:3000/text-to-speech', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: textData.meditationText })
            });
            
            const ttsData = await ttsResponse.json();
            
            if (ttsData.success) {
                aiPlayBtn.disabled = false;
                aiStopBtn.disabled = false;
            } else {
                console.warn('TTS服务不可用:', ttsData.message);
                aiResponseText.textContent = `${textData.meditationText}\n\n[注: ${ttsData.message}]`;
            }

        } catch (error) {
            console.error('AI 交互错误:', error);
            aiResponseText.textContent = `抱歉，服务出现问题：${error.message}`;
        } finally {
            aiTalkBtn.disabled = false;
            aiTalkBtn.textContent = '生成引导语';
            loadingSpinner.style.display = 'none';
        }
    });

    // --- 语音合成功能 ---
    function speakText(text) {
        if (speechSynthesis) {
            stopSpeech(); // 先停止当前语音
            
            currentUtterance = new SpeechSynthesisUtterance(text);
            currentUtterance.lang = 'zh-CN';
            currentUtterance.rate = 0.9;
            currentUtterance.pitch = 1.0;
            currentUtterance.volume = 1.0;
            
            // 语音开始事件
            currentUtterance.onstart = () => {
                aiPlayBtn.textContent = '⏸️ 暂停';
                aiStopBtn.disabled = false;
                isUserStopped = false;
            };
            
            // 语音结束事件
            currentUtterance.onend = () => {
                aiPlayBtn.textContent = '▶️ 播放';
                aiStopBtn.disabled = true;
                currentUtterance = null;
                isUserStopped = false;
            };
            
            // 语音错误事件
            currentUtterance.onerror = (event) => {
                // 不显示用户主动停止导致的错误
                if (!isUserStopped) {
                    console.error('语音合成错误:', event.error);
                    // 不显示错误信息在界面上
                }
                aiPlayBtn.textContent = '▶️ 播放';
                aiStopBtn.disabled = true;
                currentUtterance = null;
                isUserStopped = false;
            };
            
            speechSynthesis.speak(currentUtterance);
            return true;
        }
        return false;
    }
    
    // 停止语音合成
    function stopSpeech() {
        if (speechSynthesis && speechSynthesis.speaking) {
            isUserStopped = true;
            speechSynthesis.cancel();
            aiPlayBtn.textContent = '▶️ 播放';
            aiStopBtn.disabled = true;
            currentUtterance = null;
        }
    }
    
    // 暂停/继续语音合成
    function toggleSpeech() {
        if (speechSynthesis) {
            if (speechSynthesis.speaking && !speechSynthesis.paused) {
                speechSynthesis.pause();
                aiPlayBtn.textContent = '▶️ 继续';
            } else if (speechSynthesis.speaking && speechSynthesis.paused) {
                speechSynthesis.resume();
                aiPlayBtn.textContent = '⏸️ 暂停';
            } else if (aiResponseText.textContent && aiResponseText.textContent !== '冥想导师正在为你准备引导语...') {
                speakText(aiResponseText.textContent);
            }
        }
    }

    // 播放按钮点击事件
    aiPlayBtn.addEventListener('click', () => {
        toggleSpeech();
    });

    // 停止按钮点击事件
    aiStopBtn.addEventListener('click', () => {
        stopSpeech();
    });

    // 检查浏览器是否支持语音合成
    if (!speechSynthesis) {
        aiResponseText.textContent = '您的浏览器不支持语音合成功能，请使用最新版本的Chrome、Firefox或Edge浏览器。';
        aiPlayBtn.disabled = true;
        aiStopBtn.disabled = true;
    }
});