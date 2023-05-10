const fs = require("fs");
const path = require("path");

const distPath = path.join(__dirname, "project-dist");
const assetsPath = path.join(__dirname, "assets");
const cssPath = path.join(__dirname, "styles");

async function copyFolders(old, newPath) {
  const items = await fs.promises.readdir(old, { withFileTypes: true });
  items.forEach(async (item) => {
    if (item.isDirectory()) {
      await fs.promises.mkdir(
        path.join(newPath, item.name),
        { recursive: true }
      );
      await copyFolders(
        path.join(old, item.name),
        path.join(newPath, item.name),
        newPath + "/" + item.name
      );
    } else {
      await fs.promises.copyFile(
        path.join(old, item.name),
        path.join(newPath, item.name)
      );
    }
  });
}

async function buildStyles(old, newPath) {
  const writeStreamCss = fs.createWriteStream(path.join(newPath, "style.css"));
  const files = await fs.promises.readdir(old);
  files.forEach(async (file) => {
    if (path.parse(file).ext === ".css") {
      const readStreamCss = fs.createReadStream(path.join(old, file), "utf-8");
      readStreamCss.pipe(writeStreamCss);
    }
  });
}

const templatePath = path.join(__dirname, "template.html");
const componentsPath = path.join(__dirname, "components");
async function buildHtml(templatePath, componentsPath, distPath) {
  const template = await fs.promises.readFile(templatePath, "utf-8");
  const components = await fs.promises.readdir(componentsPath, { withFileTypes: true });

  let html = template;
  let headerName,
      articleName,
      footerName;

  for (const component of components) {
    const componentPath = path.join(componentsPath, component.name);
    console.log(component.name)
    if (component.isDirectory()) {
      await buildHtml(templatePath, componentPath, distPath);
    } else {
      const componentContent = await fs.promises.readFile(componentPath, "utf-8");

      if (component.name === "header.html") {
        headerName = component.name;
        html = html.replace("{{header}}", componentContent);
      } else if (component.name === "articles.html") {
        articleName = component.name;
        html = html.replace("{{articles}}", componentContent);
      } else if (component.name === "footer.html") {
        footerName = component.name;
        html = html.replace("{{footer}}", componentContent);
      } else if (component.name === 'about.html') {
        aboutName = component.name;
        html = html.replace("{{about}}", componentContent);
      }
    }
  }

  await fs.promises.writeFile(path.join(distPath, "index.html"), html);
  console.log('Create html')
}

buildHtml(templatePath, componentsPath, distPath);

async function assembleProject() {
  try {
    await fs.promises.access(distPath, fs.constants.F_OK);
  } catch (error) {
    await fs.promises.mkdir(distPath, { recursive: true });
  }

  await buildStyles(cssPath, distPath);
  console.log("CSS files built");
  await fs.promises.mkdir(path.join(distPath, "assets"), { recursive: true });
  console.log("Assets folder created");
  await copyFolders(assetsPath, path.join(distPath, "assets"));
  console.log("Assets copied to project-dist/assets");
  await buildHtml(templatePath, componentsPath, distPath);
}

assembleProject();