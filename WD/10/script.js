// ============================================
// Лабораторная работа №10 - Работа с jQuery
// ============================================

$(document).ready(function() {
    
    // ============================================
    // ЗАДАНИЕ 1: Основы селекторов и манипуляций
    // ============================================
    
    $('#jqueryActionBtn').click(function() {
        
        // 1. Изменить текст заголовка страницы
        $('#mainTitle').text('jQuery в действии! Задание выполнено');
        
        // 2. Покрасить все четные элементы списка в серый, нечетные — в белый
        // Четные по порядковому номеру: 2, 4, 6...
        // Нечетные по порядковому номеру: 1, 3, 5...
        
        $('#todoList li').each(function(index) {
            // index в jQuery: 0, 1, 2, 3, 4...
            // Порядковый номер: 1, 2, 3, 4, 5...
            const position = index + 1;
            
            if (position % 2 === 0) {
                // Четный элемент -> СЕРЫЙ цвет
                $(this).css({
                    'background-color': '#f5f5f5', // Серый
                    'border-left-color': '#95a5a6'
                });
            } else {
                // Нечетный элемент -> БЕЛЫЙ цвет
                $(this).css({
                    'background-color': '#ffffff', // Белый
                    'border-left-color': '#4a6fa5'
                });
            }
        });
        
        // 3. Добавить в конец списка новый пункт «Изучить jQuery»
        $('#todoList').append('<li><i class="fas fa-check-circle"></i> Изучить jQuery</li>');
        
        // Определяем цвет для нового элемента
        const totalItems = $('#todoList li').length;
        if (totalItems % 2 === 0) {
            // Если позиция четная -> СЕРЫЙ
            $('#todoList li:last').css({
                'background-color': '#f5f5f5',
                'border-left-color': '#95a5a6'
            });
        } else {
            // Если позиция нечетная -> БЕЛЫЙ
            $('#todoList li:last').css({
                'background-color': '#ffffff',
                'border-left-color': '#4a6fa5'
            });
        }
        
        // Анимация для нового элемента
        $('#todoList li:last').hide().fadeIn(800);
        
        // Блокируем кнопку после выполнения
        $(this).prop('disabled', true).html('<i class="fas fa-check"></i> Задание выполнено');
    });
    
    // ============================================
    // ЗАДАНИЕ 2: Работа с событиями и формами
    // ============================================
    
    // Проверка имени при потере фокуса
    $('#userName').blur(function() {
        if ($(this).val().trim() === '') {
            $(this).addClass('error-input');
            $('#nameError').text('Поле обязательно для заполнения');
        } else {
            $(this).removeClass('error-input');
            $('#nameError').text('');
        }
    });
    
    // Отправка формы
    $('#userForm').submit(function(e) {
        e.preventDefault();
        
        const userName = $('#userName').val().trim();
        
        if (userName === '') {
            $('#userName').addClass('error-input');
            $('#nameError').text('Введите имя перед отправкой');
            $('#userName').focus();
            return;
        }
        
        // Выводим приветствие
        $('#greetingMessage').html(`
            <h4>Привет, <span class="highlight">${userName}</span>!</h4>
            <p>Форма успешно обработана без перезагрузки страницы.</p>
        `);
        
        // Показываем сообщение
        $('#greetingMessage').slideDown(500);
        
        // Очищаем пароль
        $('#userPassword').val('');
    });
    
    // Сброс формы
    $('#resetFormBtn').click(function() {
        $('#userForm')[0].reset();
        $('#userName').removeClass('error-input');
        $('#nameError').text('');
        $('#greetingMessage').slideUp(300);
    });
});