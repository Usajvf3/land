// Данные приложения
const appData = {
    cities: {
        "Київ": "https://t.me/+RMlpigdpE3AyY2Zi",
        "Харків": "https://t.me/+uQWmv7j7cedhMjMy", 
        "Львів": "https://t.me/+31_XY1Y-aYE4YWIy",
        "Вінниця": "https://t.me/+GHYrPA38EOQ3ZmY6",
        "Дніпро": "https://t.me/+Rw1BRG90Wks1OTUy",
        "Запоріжжя": "https://t.me/+WQWB7nz7QxI1Y2Uy",
        "Івано-Франківськ": "https://t.me/+ePe_h6hleHUyMTky",
        "Рівне": "https://t.me/+Tq5RTjWD7vI1MDAy",
        "Хмельницький": "https://t.me/+XFB6402ui180NTJi",
        "Одеса": "https://t.me/+oTsExadH5jhhMmQy",
        "Чернігів": "https://t.me/+mAkqZczkbe9jZmJi",
        "Луцьк": "https://t.me/+yBwK54796kRlMzUy",
        "Тернопіль": "https://t.me/+KLBHBzsVqq1hNTVi",
        "Чернівці": "https://t.me/+04x5NI8ivClkNDYy",
        "Ужгород": "https://t.me/+tcFm06_lzFo4OTVi",
        "Житомир": "https://t.me/+gvDgZ_hs639hYzIy",
        "Кривий Ріг": "https://t.me/+XZ4LZgbfSG4yMGVi",
        "Миколаїв": "https://t.me/+fZKoU-yC3dpmODBi",
        "Херсон": "https://t.me/+f2ujKCDnDs40YWIy",
        "Черкаси": "https://t.me/+RqcMyPvNEuY2ZTEy",
        "Полтава": "https://t.me/+bsxSWyluNhs5ZmIy",
        "Суми": "https://t.me/+Y6SfnlX_qqM1ZDcy",
        "Кропивницький": "https://t.me/+cAcqMs1nWL8wODAy"
    },
    questions: [
        {
            id: 1,
            question: "Оберіть своє місто:",
            type: "city",
            options: ["Київ", "Харків", "Львів", "Вінниця", "Дніпро", "Запоріжжя", "Івано-Франківськ", "Рівне", "Хмельницький", "Одеса", "Чернігів", "Луцьк", "Тернопіль", "Чернівці", "Ужгород", "Житомир", "Кривий Ріг", "Миколаїв", "Херсон", "Черкаси", "Полтава", "Суми", "Кропивницький"]
        },
        {
            id: 2,
            question: "Як довго у вас відсутня електроенергія?",
            options: ["Менше 2 годин", "2-4 години", "4-6 годин", "6-8 годин", "Більше 8 годин"]
        },
        {
            id: 3,
            question: "Яка температура у вашому домі?",
            options: ["Вище +18°C", "+15°C до +18°C", "+10°C до +15°C", "+5°C до +10°C", "Нижче +5°C"]
        },
        {
            id: 4,
            question: "Чи використовуєте ви генератор?",
            options: ["Так, постійно", "Так, іноді", "Планую купити", "Ні, не потрібен", "Немає можливості купити"]
        },
        {
            id: 5,
            question: "Скільки людей проживає у вашому домі?",
            options: ["1 людина", "2 людини", "3 людини", "4 людини", "5 і більше людей"]
        },
        {
            id: 6,
            question: "Який у вас тип опалення?",
            options: ["Централізоване", "Газове", "Електричне", "Твердопаливне", "Інше"]
        },
        {
            id: 7,
            question: "Чи є у вас запасні джерела світла?",
            options: ["Ліхтарики", "Свічки", "Power bank", "Все вищеперелічене", "Нічого немає"]
        },
        {
            id: 8,
            question: "Як часто відбуваються відключення у вашому районі?",
            options: ["Щодня", "Кілька разів на тиждень", "Раз на тиждень", "Кілька разів на місяць", "Рідко"]
        },
        {
            id: 9,
            question: "Чи готові ви до тривалих відключень?",
            options: ["Повністю готовий", "Частково готовий", "Готуюся", "Не дуже готовий", "Зовсім не готовий"]
        },
        {
            id: 10,
            question: "Оцініть роботу енергетиків:",
            options: ["Відмінно", "Добре", "Задовільно", "Погано", "Дуже погано"]
        }
    ]
};

// Состояние приложения
let currentQuestionIndex = 0;
let selectedCity = null;

// DOM элементы
const questionScreen = document.getElementById('questionScreen');
const loadingScreen = document.getElementById('loadingScreen');
const finalScreen = document.getElementById('finalScreen');
const questionNumber = document.getElementById('questionNumber');
const questionTitle = document.getElementById('questionTitle');
const optionsContainer = document.getElementById('optionsContainer');
const progressFill = document.getElementById('progressFill');
const loadingProgress = document.getElementById('loadingProgress');
const restartBtn = document.getElementById('restartBtn');

// Утилиты
function getRandomChannel() {
    const channels = Object.values(appData.cities);
    return channels[Math.floor(Math.random() * channels.length)];
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / appData.questions.length) * 100;
    progressFill.style.width = `${progress}%`;
}

function showScreen(screen) {
    questionScreen.classList.add('hidden');
    loadingScreen.classList.add('hidden');
    finalScreen.classList.add('hidden');
    
    screen.classList.remove('hidden');
}

function renderQuestion() {
    const question = appData.questions[currentQuestionIndex];
    
    questionNumber.textContent = `Питання ${currentQuestionIndex + 1} з ${appData.questions.length}`;
    questionTitle.textContent = question.question;
    
    // Очистить контейнер опций
    optionsContainer.innerHTML = '';
    
    // Создать кнопки опций
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        
        // ВАЖНО: window.open() вызывается прямо в обработчике click - это обеспечивает работу в Telegram WebApp
        button.addEventListener('click', (event) => {
            // Предотвращаем повторные клики
            button.disabled = true;
            
            // Определить канал для перехода
            let channelUrl;
            
            if (question.type === 'city') {
                // Первый вопрос - выбор города
                selectedCity = option;
                channelUrl = appData.cities[option];
            } else {
                // Остальные вопросы - случайный канал
                channelUrl = getRandomChannel();
            }
            
            // КРИТИЧНО: Открываем Telegram канал СРАЗУ при клике (без задержек)
            // Это гарантирует, что Telegram WebApp разрешит переход
            window.open(channelUrl, '_blank');
            
            // Создаем эффект ряби при клике
            createRippleEffect(event);
            
            // Переходим к следующему вопросу
            currentQuestionIndex++;
            
            if (currentQuestionIndex < appData.questions.length) {
                showLoadingScreen();
            } else {
                showFinalScreen();
            }
        });
        
        optionsContainer.appendChild(button);
    });
    
    updateProgress();
    
    // Анимация появления опций
    setTimeout(() => {
        animateOptionsIn();
    }, 100);
}

function createRippleEffect(event) {
    const button = event.target;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 10;
    `;
    
    button.style.position = 'relative';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function animateOptionsIn() {
    const options = document.querySelectorAll('.option-btn');
    options.forEach((option, index) => {
        option.style.opacity = '0';
        option.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            option.style.transition = 'all 0.4s ease';
            option.style.opacity = '1';
            option.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function showLoadingScreen() {
    showScreen(loadingScreen);
    
    // Сброс прогресса загрузки
    loadingProgress.style.width = '0%';
    loadingProgress.style.transition = '';
    
    // Запуск анимации прогресса
    setTimeout(() => {
        const loadingDuration = Math.random() * 7 + 8; // 8-15 секунд
        loadingProgress.style.transition = `width ${loadingDuration}s linear`;
        loadingProgress.style.width = '100%';
        
        // Переход к следующему вопросу
        setTimeout(() => {
            showScreen(questionScreen);
            renderQuestion();
        }, loadingDuration * 1000);
    }, 100);
}

function showFinalScreen() {
    showScreen(finalScreen);
}

function restartSurvey() {
    currentQuestionIndex = 0;
    selectedCity = null;
    showScreen(questionScreen);
    renderQuestion();
}

// Обработчики событий
restartBtn.addEventListener('click', restartSurvey);

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация снежинок с разными эффектами
    initializeSnowflakes();
    
    // Инициализация анимации лампочки в хедере
    initializeBulbAnimation();
    
    // Запуск первого вопроса
    renderQuestion();
});

// Дополнительные анимации для снежинок
function initializeSnowflakes() {
    const snowflakes = document.querySelectorAll('.snowflake');
    
    snowflakes.forEach((snowflake, index) => {
        // Случайный размер
        const size = Math.random() * 0.8 + 0.8; // 0.8 - 1.6
        snowflake.style.fontSize = `${size}em`;
        
        // Случайная прозрачность
        const opacity = Math.random() * 0.6 + 0.4; // 0.4 - 1.0
        snowflake.style.opacity = opacity;
        
        // Случайная задержка анимации
        const delay = Math.random() * 10; // 0 - 10s
        snowflake.style.animationDelay = `${delay}s`;
        
        // Случайная продолжительность анимации
        const duration = Math.random() * 8 + 8; // 8 - 16s
        snowflake.style.animationDuration = `${duration}s`;
    });
}

// Дополнительные эффекты для лампочки в хедере
function initializeBulbAnimation() {
    const bulbAnimation = document.querySelector('.bulb-animation');
    
    if (bulbAnimation) {
        // Добавляем случайные вариации к анимации лампочки
        setInterval(() => {
            const randomRotation = Math.random() * 360;
            bulbAnimation.style.setProperty('--rotation', `${randomRotation}deg`);
        }, 4000);
    }
}