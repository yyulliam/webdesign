// ====================
// Часть 1: Три асинхронные функции с имитацией задач (4 балла)
// ====================

// Функция 1: Имитация загрузки профиля пользователя
async function loadUserProfile() {
    console.log("🔄 [Задача 1] Начало загрузки профиля пользователя...");
    
    // Имитация асинхронной задержки (2 секунды)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("✅ [Задача 1] Профиль пользователя загружен!");
    return {
        id: 101,
        name: "Анна Петрова",
        role: "Студент",
        group: "ИТ-21"
    };
}

// Функция 2: Имитация загрузки учебных материалов
async function loadStudyMaterials() {
    console.log("🔄 [Задача 2] Начало загрузки учебных материалов...");
    
    // Имитация асинхронной задержки (1.5 секунды)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("✅ [Задача 2] Учебные материалы загружены!");
    return [
        "Лекция по JavaScript",
        "Практическое задание по DOM",
        "Лабораторная работа №9"
    ];
}

// Функция 3: Имитация загрузки оценок
async function loadGrades() {
    console.log("🔄 [Задача 3] Начало загрузки оценок...");
    
    // Имитация асинхронной задержки (1 секунда)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("✅ [Задача 3] Оценки загружены!");
    return [
        { subject: "JavaScript", grade: 9 },
        { subject: "HTML/CSS", grade: 10 },
        { subject: "Алгоритмы", grade: 8 }
    ];
}

// Функция для запуска всех задач ПООЧЕРЕДНО с await
async function runAllTasks() {
    const tasksOutput = document.getElementById('tasksOutput');
    tasksOutput.innerHTML = '<p class="loading"><i class="fas fa-spinner fa-spin"></i> Запуск 3 асинхронных задач...</p>';
    
    console.log("🚀 ========= Запуск задач поочередно =========");
    
    try {
        // 1. Запускаем первую задачу и ждем её завершения
        const userProfile = await loadUserProfile();
        tasksOutput.innerHTML += `
            <div class="success">
                <strong>✓ Задача 1 завершена</strong><br>
                Пользователь: ${userProfile.name}<br>
                Группа: ${userProfile.group}
            </div>
        `;
        
        // 2. Запускаем вторую задачу после завершения первой
        const studyMaterials = await loadStudyMaterials();
        tasksOutput.innerHTML += `
            <div class="success">
                <strong>✓ Задача 2 завершена</strong><br>
                Загружено материалов: ${studyMaterials.length}<br>
                Последний: ${studyMaterials[studyMaterials.length - 1]}
            </div>
        `;
        
        // 3. Запускаем третью задачу после завершения второй
        const grades = await loadGrades();
        const averageGrade = (grades.reduce((sum, item) => sum + item.grade, 0) / grades.length).toFixed(1);
        
        tasksOutput.innerHTML += `
            <div class="success">
                <strong>✓ Задача 3 завершена</strong><br>
                Средний балл: ${averageGrade}<br>
                Предметов: ${grades.length}
            </div>
        `;
        
        // Итоговое сообщение
        tasksOutput.innerHTML += `
            <div class="success" style="background: #d4edda; margin-top: 15px;">
                <strong><i class="fas fa-check-circle"></i> Все 3 задачи выполнены успешно!</strong><br>
                <small>Время выполнения: ~4.5 секунды (сумма всех задержек)</small>
            </div>
        `;
        
        console.log("🎉 ========= Все задачи завершены =========");
        
    } catch (error) {
        tasksOutput.innerHTML = `<div class="error"><i class="fas fa-exclamation-circle"></i> Ошибка выполнения задач: ${error.message}</div>`;
        console.error("❌ Ошибка выполнения задач:", error);
    }
}

// ====================
// Часть 2: Загрузка постов с API (2 балла) - РУССКИЕ ДАННЫЕ
// ====================

async function loadPosts() {
    const postsOutput = document.getElementById('postsOutput');
    postsOutput.innerHTML = '<p class="loading"><i class="fas fa-spinner fa-spin"></i> Загрузка данных с API...</p>';
    
    console.log("📡 ========= Запрос к JSONPlaceholder API =========");
    
    try {
        // Используем fetch для получения данных с публичного API
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        
        // Проверяем успешность запроса
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        
        // Парсим JSON ответ
        const posts = await response.json();
        
        // РУССКИЕ заголовки для замены английских
        const russianTitles = [
            "Как я изучал JavaScript: от новичка к уверенному разработчику",
            "Асинхронное программирование на практике: async/await и промисы",
            "Работа с API в веб-разработке: Fetch, Axios и другие инструменты",
            "Создание интерактивного списка задач на чистом JavaScript",
            "Лабораторная работа по асинхронности: разбор заданий и решений"
        ];
        
        const russianBodies = [
            "Сегодня я хочу поделиться своим опытом изучения JavaScript. Начав с основ синтаксиса, я постепенно перешел к более сложным концепциям...",
            "Асинхронность - одна из ключевых концепций в современном JavaScript. Без понимания промисов и async/await сложно представить разработку...",
            "API позволяют получать данные с серверов и использовать их в веб-приложениях. В этой статье рассмотрим различные способы работы с API...",
            "Создание To-Do списка помогает понять основы работы с DOM, событиями и состоянием приложения. Это отличный проект для начинающих...",
            "В этой лабораторной работе мы изучаем async/await, работу с промисами и выполнение асинхронных запросов к внешним API..."
        ];
        
        // ВЫВОДИМ В КОНСОЛЬ (русские заголовки)
        console.log("📝 Заголовки постов (на русском):");
        posts.forEach((post, index) => {
            const russianTitle = russianTitles[index] || post.title;
            console.log(`Пост #${post.id}: ${russianTitle}`);
        });
        
        // Отображаем на странице
        let html = `
            <h4><i class="fas fa-newspaper"></i> Последние статьи о программировании:</h4>
            <ul>
        `;
        
        posts.forEach((post, index) => {
            const russianTitle = russianTitles[index] || post.title;
            const russianBody = russianBodies[index] || post.body;
            
            html += `
                <li>
                    <strong>#${post.id}: ${russianTitle}</strong><br>
                    <small>${russianBody.substring(0, 80)}...</small>
                </li>
            `;
        });
        
        html += '</ul>';
        html += `<p><small><i class="fas fa-info-circle"></i> Демонстрационные данные на русском языке (реальный API: jsonplaceholder.typicode.com)</small></p>`;
        
        postsOutput.innerHTML = html;
        
        console.log("✅ ========= Данные успешно загружены =========");
        
    } catch (error) {
        // Если API не доступен, покажем демо-данные
        console.error("❌ Ошибка загрузки постов:", error);
        
        // Демо-данные на русском (запасной вариант)
        const demoPosts = [
            { id: 1, title: "Основы JavaScript для начинающих", body: "JavaScript - это язык программирования для создания интерактивных веб-страниц..." },
            { id: 2, title: "Работа с DOM: создание динамических элементов", body: "Document Object Model позволяет JavaScript взаимодействовать с HTML..." },
            { id: 3, title: "Асинхронный JavaScript: Promise и async/await", body: "Асинхронное программирование позволяет выполнять задачи без блокировки..." },
            { id: 4, title: "Работа с API: получение данных с сервера", body: "Современные веб-приложения часто получают данные с внешних API..." },
            { id: 5, title: "Лабораторная работа по асинхронности", body: "В этой работе мы практикуем использование fetch, async/await и промисов..." }
        ];
        
        let demoHtml = `
            <h4><i class="fas fa-newspaper"></i> Статьи (демо-данные):</h4>
            <ul>
        `;
        
        demoPosts.forEach(post => {
            demoHtml += `
                <li>
                    <strong>#${post.id}: ${post.title}</strong><br>
                    <small>${post.body.substring(0, 80)}...</small>
                </li>
            `;
        });
        
        demoHtml += '</ul>';
        demoHtml += `<p><small><i class="fas fa-exclamation-triangle"></i> Используются демо-данные (API временно недоступно)</small></p>`;
        
        postsOutput.innerHTML = demoHtml;
        console.log("📝 Показаны демо-данные на русском языке");
    }
}

// ====================
// Часть 3: Получение курса валют с Belarusbank API (3 балла)
// ====================

async function loadCurrencyRates() {
    const currencyOutput = document.getElementById('currencyOutput');
    currencyOutput.innerHTML = '<p class="loading"><i class="fas fa-spinner fa-spin"></i> Получение курса валют с Belarusbank...</p>';
    
    console.log("🏦 ========= Запрос к Belarusbank API =========");
    
    try {
        // API Беларусбанка (публичное API курсов валют)
        const response = await fetch('https://belarusbank.by/api/kursExchange?city=Минск');
        
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        // ВЫВОДИМ В КОНСОЛЬ
        console.log("💰 Курсы валют от Беларусбанка:");
        
        if (data && data.length > 0) {
            const rates = data[0];
            console.log(`USD: покупка ${rates.USD_in}, продажа ${rates.USD_out}`);
            console.log(`EUR: покупка ${rates.EUR_in}, продажа ${rates.EUR_out}`);
            console.log(`RUB: покупка ${rates.RUB_in}, продажа ${rates.RUB_out}`);
            console.log(`PLN: покупка ${rates.PLN_in}, продажа ${rates.PLN_out}`);
            
            // Отображаем на странице
            const html = `
                <h4><i class="fas fa-chart-line"></i> Курсы валют в Минске (Беларусбанк)</h4>
                <div class="currency-grid">
                    <div class="currency-card">
                        <strong>🇺🇸 USD (Доллар США)</strong>
                        <div>Покупка: <span style="color: #27ae60;">${rates.USD_in} BYN</span></div>
                        <div>Продажа: <span style="color: #e74c3c;">${rates.USD_out} BYN</span></div>
                    </div>
                    
                    <div class="currency-card">
                        <strong>🇪🇺 EUR (Евро)</strong>
                        <div>Покупка: <span style="color: #27ae60;">${rates.EUR_in} BYN</span></div>
                        <div>Продажа: <span style="color: #e74c3c;">${rates.EUR_out} BYN</span></div>
                    </div>
                    
                    <div class="currency-card">
                        <strong>🇷🇺 RUB (Российский рубль)</strong>
                        <div>Покупка: <span style="color: #27ae60;">${rates.RUB_in} BYN</span></div>
                        <div>Продажа: <span style="color: #e74c3c;">${rates.RUB_out} BYN</span></div>
                    </div>
                    
                    <div class="currency-card">
                        <strong>🇵🇱 PLN (Польский злотый)</strong>
                        <div>Покупка: <span style="color: #27ae60;">${rates.PLN_in} BYN</span></div>
                        <div>Продажа: <span style="color: #e74c3c;">${rates.PLN_out} BYN</span></div>
                    </div>
                </div>
                <p><small><i class="fas fa-info-circle"></i> Данные предоставлены Беларусбанком. Город: Минск</small></p>
                <p><small><i class="fas fa-clock"></i> Время запроса: ${new Date().toLocaleTimeString()}</small></p>
            `;
            
            currencyOutput.innerHTML = html;
        } else {
            currencyOutput.innerHTML = '<div class="error"><i class="fas fa-exclamation-circle"></i> Нет данных о курсах валют</div>';
            console.log("❌ Нет данных о курсах валют");
        }
        
        console.log("✅ ========= Курсы валют загружены =========");
        
    } catch (error) {
        currencyOutput.innerHTML = `<div class="error"><i class="fas fa-exclamation-circle"></i> Ошибка загрузки: ${error.message}</div>`;
        console.error("❌ Ошибка загрузки курса валют:", error);
        
        // Демо-данные курса валют (запасной вариант)
        const demoHtml = `
            <h4><i class="fas fa-chart-line"></i> Курсы валют (демо-данные)</h4>
            <div class="currency-grid">
                <div class="currency-card">
                    <strong>🇺🇸 USD (Доллар США)</strong>
                    <div>Покупка: <span style="color: #27ae60;">3.25 BYN</span></div>
                    <div>Продажа: <span style="color: #e74c3c;">3.28 BYN</span></div>
                </div>
                
                <div class="currency-card">
                    <strong>🇪🇺 EUR (Евро)</strong>
                    <div>Покупка: <span style="color: #27ae60;">3.50 BYN</span></div>
                    <div>Продажа: <span style="color: #e74c3c;">3.53 BYN</span></div>
                </div>
                
                <div class="currency-card">
                    <strong>🇷🇺 RUB (Российский рубль)</strong>
                    <div>Покупка: <span style="color: #27ae60;">3.40 BYN</span></div>
                    <div>Продажа: <span style="color: #e74c3c;">3.42 BYN</span></div>
                </div>
                
                <div class="currency-card">
                    <strong>🇵🇱 PLN (Польский злотый)</strong>
                    <div>Покупка: <span style="color: #27ae60;">0.80 BYN</span></div>
                    <div>Продажа: <span style="color: #e74c3c;">0.82 BYN</span></div>
                </div>
            </div>
            <p><small><i class="fas fa-exclamation-triangle"></i> Демо-данные (API временно недоступно)</small></p>
        `;
        
        currencyOutput.innerHTML = demoHtml;
        console.log("💰 Показаны демо-данные курса валют");
    }
}

// ====================
// Инициализация при загрузке страницы
// ====================

document.addEventListener('DOMContentLoaded', () => {
    console.log("🌐 Страница загружена. Готовы асинхронные операции!");
    console.log("==============================================");
    console.log("Для выполнения лабораторной работы:");
    console.log("1. Нажмите 'Запустить 3 задачи поочередно'");
    console.log("2. Нажмите 'Загрузить посты' (русские данные)");
    console.log("3. Нажмите 'Получить курс валют'");
    console.log("==============================================");
    
    // Привязываем кнопки к функциям
    document.getElementById('runTasksBtn').addEventListener('click', runAllTasks);
    document.getElementById('loadPostsBtn').addEventListener('click', loadPosts);
    document.getElementById('loadCurrencyBtn').addEventListener('click', loadCurrencyRates);
});