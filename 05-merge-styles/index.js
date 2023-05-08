const fs = require('fs').promises;
const path = require('path');

// async function f() {

//     try {
//       let response = await fetch('http://no-such-url');
//     } catch(err) {
//       alert(err); // TypeError: failed to fetch
//     }
//   }
//   f();


async function mergeStyles() {
  try {
    const styles = path.join(__dirname, 'styles');
    const bundle = path.join(__dirname, 'project-dist/bundle.css');

    const files = await fs.readdir(styles);
    const css = files.filter((file) => path.extname(file) === '.css');

    let result = '';
    await Promise.all(css.map(async (file) => {
      const filePath = path.join(styles, file);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      result += fileContent;
    }));

    await fs.writeFile(bundle, '');
    console.log('Bundle очищен');

    await fs.appendFile(bundle, result);
    console.log('Файлы объединены');

  } catch (err) {
    console.log(err);
  }
}
mergeStyles();