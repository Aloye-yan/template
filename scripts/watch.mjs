// watch.mjs
import chokidar from 'chokidar';
import {spawn} from 'child_process';

const args = process.argv.splice(2);
const lang = args[0] || 'us';
// 监听view的文件夹路径
const watchPcPath = ['pc/views/**/index.(js|scss)', 'pc/views/*/index.html'];
const watchH5Path = ['h5/views/**/index.(js|scss)', 'h5/views/*/index.html']

// 监听templates的文件夹路径
const watchPcPathT = ['pc/templates/**/index.(js|scss)', 'pc/templates/*/index.html']
const watchH5PathT = ['h5/templates/**/index.(js|scss)', 'h5/templates/*/index.html'];

// 执行的打包命令
const buildCommandPc = 'npm run build:pc';
const buildCommandH5 = 'npm run build:h5';

const buildCommandPcT = 'npm run build:pct';
const buildCommandH5T = 'npm run build:h5t';

const watcherPc = chokidar.watch(watchPcPath);
const watcherH5 = chokidar.watch(watchH5Path);
const watcherPcT = chokidar.watch(watchPcPathT);
const watcherH5T = chokidar.watch(watchH5PathT);

watcherPc.on('change', (path) => {
  console.log(`File ${path} has been changed`);
  runBuildCommand('pc');
});
watcherH5.on('change', (path) => {
  console.log(`File ${path} has been changed`);
  runBuildCommand('h5');
})

watcherPcT.on('change', (path) => {
  console.log(`File ${path} has been changed`);
  runBuildCommand('pct');
});
watcherH5T.on('change', (path) => {
  console.log(`File ${path} has been changed`);
  runBuildCommand('h5t');
})

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
    return buildCommandPc;
  } else if (mode === 'h5') {
    return buildCommandH5;
  } else if (mode === 'pct') {
    return buildCommandPcT;
  } else if (mode === 'h5t') {
    return buildCommandH5T;
  }
}

