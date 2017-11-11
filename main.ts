import {app, BrowserWindow, screen} from "electron";
import {dbCalls} from "./datastore/nedb_service";
import * as fs from "fs";

const ipc = require('electron').ipcMain;

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

if (serve) {
  require('electron-reload')(__dirname, {});
}

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height
  });

  // and load the index.html of the app.
  win.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  if (serve) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}

const log = (msg: string) => {
  const logName = 'log/log.log';
  const logSize = 634880;
  const x = new Date();
  fs.appendFile(logName, x.toLocaleDateString() + ':' + x.toTimeString().substring(0, 9) + ' - ' + msg + '\n', err => {
    if (!err) {
      fs.stat(logName, (err2, stat) => {
        if (stat.size > logSize) {
          fs.rename(logName, 'log/' + new Date() + ' - old.log');
        }
      });
    }
  });
};

ipc.on('db_calls', (event, arg) => {
  log('[main] db_calls ' + JSON.stringify(arg));
  dbCalls(arg, function (err, data) {
    event.sender.send('db_returns', {err: err, doc: data, unq: arg['unq']});
    if (err) {
      log('[main] db_calls - returns ' + JSON.stringify({err: err}));
    }
    log('[main] db_calls - returns ' + JSON.stringify({data: data}).substring(0, 100));
  });
});

ipc.on('log_calls', (event, arg) => {
  log('[renderer] ' + arg['msg']);
});
