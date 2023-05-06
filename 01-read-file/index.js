//Модуль path предназначен для того, чтобы работать с путями в Node.js. При помощи него можно получить имя файла, расширение файла, имя папки, указать путь к файлу.
//Модуль fs (file system) нужен для работы с файлами и папками. Он умеет создавать и удалять файлы и папки, переименовывать их, записывать и считывать данные.
//__dirname - строка, которая содержит путь к текущей директории. Можем получить абсолютный путь на любои устройстве
const fs = require('fs');
const path = require('path');
//console.log(path.join(__dirname, 'text.txt'), 'utf-8') //C:\Users\kir38\OneDrive\Desktop\rs_school\HTML-builder\01-read-file\text.txt
const stream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
let result = '';
stream.on('data', chunk => result += chunk);
stream.on('end', () => console.log(`${result}`));
stream.on('error', error => console.log('Error', error.message));
