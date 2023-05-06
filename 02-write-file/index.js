const fs = require('fs');
const path = require('path');
const readline = require('readline');
// const {stdin, stdout} = require('process');
// 1. Импорт всех требуемых модулей.
// 2. Создание потока записи в текстовый файл
// 3. Вывод в консоль приветственного сообщения
// 4. Ожидание ввода текста пользователем, с дальнейшей проверкой ввода на наличие ключевого слова **exit**
// 5. Запись текста в файл
// 6. Ожидание дальнейшего ввода
// 7. Реализация прощального сообщения при остановке процесса

// Читаю текст из консоли
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Создаю новый файл в директории
fs.writeFile(path.join(__dirname, 'text2.txt'), '', (err) => {
  if (err) throw err;
});


console.log('Здравствуйте! Введите текст и он запишется в файл "text2.txt"... ');
// Вывожу в консоль либо exit, либо текст для записи
rl.on('line', (input) => {
    if (input === 'exit') {
        rl.close();
      } else {
        fs.appendFile(path.join(__dirname, 'text2.txt'), input, (err) => {
          if (err) throw err;
        });
        rl.prompt();
      }
    });

// Завершение работы программы
rl.on('close', () => {
  console.log('До свидания! Успехов в изучении Node.js');
  process.exit(0);
});

// Вывод приглашения на ввод текста
rl.prompt();