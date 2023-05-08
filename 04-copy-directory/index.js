const fs = require('fs');
const path = require('path');
const directory = path.join(__dirname, 'files');
const copyDirectory = path.join(__dirname, 'copy-files');
const { promises: fsPromises } = require('fs');
//Для создания папок в NodeJS используется метод mkdir.
//В его первый аргумент передаётся название папки (относительный или абсолютный путь к ней), которую нужно создать.
//Второй параметр опционален и не работает в Windows. В нём можно записать права доступа на эту папку (числа).
//А в третьем параметре находится callback функция, которая возвращает ошибку.

//Для копирования используется метод "fs.copyFile".
//В его первый аргумент передаётся название файла (относительный или абсолютный путь к нему), который необходимо скопировать,
//а во втором пишется новый путь.

async function copyDir(directory, copyDirectory) {
  try {
    await fsPromises.rm(copyDirectory, {recursive: true});
    console.log('Папка copy-files удалена, т.к. была создана ранее');
  } catch (err) {}

  await fsPromises.mkdir(copyDirectory, {recursive: true});
  console.log('Создана папка');

  fs.readdir(directory, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach((file) =>{
      const srcPath = `${directory}/${file.name}`;
      const copyPath = `${copyDirectory}/${file.name}`;
      if (file.isDirectory()) {
        copyDir(srcPath, copyPath);
      } else {
        fs.copyFile(srcPath, copyPath, (err) => {
          if (err) throw err;
          console.log('Файл скопирован');
        });
      }
    });
  });
}

copyDir(directory, copyDirectory);