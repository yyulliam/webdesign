// Тестирование всех функций
console.log("=== Тестирование функций 9 варианта ===");

// 1. Проверка на отрицательное число
console.log("1. isNegative(-5):", isNegative(-5)); // true
console.log("   isNegative(10):", isNegative(10)); // false

// 2. Удаление пробелов
console.log("2. trimSpaces('  hello  '):", "'" + trimSpaces('  hello  ') + "'"); // 'hello'

// 3. Логическое "И НЕ"
console.log("3. andNot(true, true):", andNot(true, true)); // false
console.log("   andNot(true, false):", andNot(true, false)); // true

// 4. Проверка значения свойства
const person = { name: "John", age: 25 };
console.log("4. isValueEqual(person, 'name', 'John'):", isValueEqual(person, 'name', 'John')); // true
console.log("   isValueEqual(person, 'age', 30):", isValueEqual(person, 'age', 30)); // false

// 5. Проверка элемента в массиве
const numbers = [1, 2, 3, 4, 5];
console.log("5. contains(numbers, 3):", contains(numbers, 3)); // true
console.log("   contains(numbers, 6):", contains(numbers, 6)); // false

// 6. Проверка чётных чисел
console.log("6. logEven([1, 2, 3, 4, 5]):");
logEven([1, 2, 3, 4, 5]); // выведет 2 и 4

// 7. Квадраты чисел
console.log("7. squareNumbers([1, 2, 3, 4]):", squareNumbers([1, 2, 3, 4])); // [1, 4, 9, 16]