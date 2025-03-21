const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    // 개발 시엔 localhost 띄우고!!!
    win.loadURL('http://localhost:5173'); // Vite 개발 서버 포트라면 이렇게!!!
    // 또는
    // win.loadFile(path.join(__dirname, 'dist/index.html')); // 배포 시 이렇게!!!
}

app.whenReady().then(createWindow);
