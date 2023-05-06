const fs = require('fs');
const path = require('path');
fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        console.log(`File name is:${file}, file extname is:${path.extname(file)}\n`);
    });
})

// fs.stat(path.join(__dirname, 'secret-folder'), (err, status) => {
//    if(err) throw err; // не удалось получить данные статуса
//    if(status.isFile()){
//       console.log('Это простой файл');
//    }
// });


