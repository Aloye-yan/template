// watch.mjs
import chokidar from 'chokidar';
import {spawn} from 'child_process';

const args = process.argv.splice(2);
const lang = args[0].split(',')[0]
const choice = args[0].split(',')[1]
const page = args[0].split(',')[2]

console.log(`lang: ${lang}, choice: ${choice}, page: ${page}`);

// 监听view的文件夹路径
const watchPath = [`${choice}/views/${page}/*/index.(js|scss)`, `${choice}/views/*/index.html`];

// 监听templates的文件夹路径
const watchPathT = [`${choice}/templates/**/index.(js|scss)`, `${choice}/templates/*/index.html`];

// 执行的打包命令
const buildCommand = `npm run build:${choice}`;
const buildCommandT = `npm run build:${choice}t`;

const watcher = chokidar.watch(watchPath);
const watcherT = chokidar.watch(watchPathT);

watcher.on('change', (path) => {
  console.log(`File ${path} has been changed`);
  runBuildCommand(`${choice}`);
});
watcherT.on('change', (path) => {
  console.log(`File ${path} has been changed`);
  runBuildCommand(`${choice}t`);
});

const runBuildCommand = (mode) => {
  const command = handleGetBuildCommand(mode);
  const build = `npm run generate -- ${lang}`;

  const buildProcess = spawn(command, {shell: true});

  buildProcess.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  buildProcess.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  buildProcess.on('close', (code) => {
    console.log(`Build process exited with code ${code}`);
    spawn(build, {shell: true});
  });
}

const handleGetBuildCommand = (mode) => {
  if (mode === 'pc') {
    return buildCommand;
  } else if (mode === 'h5') {
    return buildCommand;
  } else if (mode === 'pct') {
    return buildCommandT;
  } else if (mode === 'h5t') {
    return buildCommandT;
  }
}

