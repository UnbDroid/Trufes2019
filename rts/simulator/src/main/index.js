import { app, BrowserWindow } from 'electron'

// var http = require('http');
// Loading the file index.html displayed to the client
// var server = http.createServer();
// var io = require('socket.io').listen(server);

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // io.sockets.on('connection', function (socket) {
  //   // When the client connects, they are sent a message
  //   socket.emit('message', 'You are connected!');
  //
  //   // When a "message" is received (click on the button), it's logged in the console
  //   socket.on('encoders', function (enc1, enc2, enc3, enc4) {
  //       // The username of the person who clicked is retrieved from the session variables
  //       let encs = {
  //         enc1: enc1,
  //         enc2: enc2,
  //         enc3: enc3,
  //         enc4: enc4,
  //       }
  //       EventBus.$emit('encoder', encs);
  //       console.log("DEBUG" + JSON.stringify(encs));
  //   });
  // });
}


app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
