const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'secret-folder');
fs.readdir(folder, {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    if (file.isFile()) {
      const filePath = path.join(folder, file.name);
      fs.stat(filePath, (err, stats) =>{
        if (err) throw err;

        const fileSizeInB = stats.size;
        const fileSizeInKB = fileSizeInB/1024;

        console.log(`${file.name.replace(/\.[^/.]+$/, '')} - ${path.extname(file.name).substring(1)} - ${fileSizeInKB}kb`);
      });
    }
  });
});



