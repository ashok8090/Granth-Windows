const { app, BrowserWindow, clipboard, ipcMain, shell } = require("electron");
const fs = require("fs");
const path = require("path");

const chunks = new Map();

function libraryDir() {
  const dir = path.join(app.getPath("documents"), "Granth Prabandhan");
  fs.mkdirSync(dir, "recursive");
  return dir;
}

function safeName(name) {
  const base = path.basename(String(name || "granth.pdf")).replace(/[<>:"/\\|?*\u0000-\u001f]/g, " ").trim();
  return base || "granth.pdf";
}

function filePath(name) {
  return path.join(libraryDir(), safeName(name));
}

function tell(win, code) {
  if (!win || win.isDestroyed()) return;
  win.webContents.executeJavaScript(code).catch(() => undefined);
}

function finishChunk(win, message) {
  const bucket = chunks.get(message.id) || { parts: [], total: message.total, name: message.name };
  bucket.parts[message.index] = Buffer.from(message.data || "", "base64");
  bucket.total = message.total;
  chunks.set(message.id, bucket);
  const got = bucket.parts.filter(Boolean).length;
  if (got < bucket.total) return null;
  const target = filePath(bucket.name);
  fs.writeFileSync(target, Buffer.concat(bucket.parts));
  chunks.delete(message.id);
  return target;
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 640,
    title: "ग्रंथ प्रबंधन",
    icon: path.join(__dirname, "icon.png"),
    autoHideMenuBar: true,
    backgroundColor: "#1a120c",
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false,
    },
  });
  win.loadFile(path.join(__dirname, "web", "index.html"));
  return win;
}

app.whenReady().then(() => {
  const win = createWindow();

  ipcMain.on("granth-msg", (_event, raw) => {
    let message;
    try {
      message = JSON.parse(raw);
    } catch {
      return;
    }
    if (!message || typeof message.type !== "string") return;

    if (message.type === "save-chunk" || message.type === "share-chunk" || message.type === "open-chunk") {
      const saved = finishChunk(win, message);
      if (!saved) return;
      if (message.type === "open-chunk") shell.openPath(saved);
      else shell.showItemInFolder(saved);
      return;
    }

    if (message.type === "open-saved") {
      const saved = filePath(message.name);
      if (fs.existsSync(saved)) shell.openPath(saved);
      else tell(win, `window.__granthOpenMiss && window.__granthOpenMiss(${JSON.stringify(message.name)})`);
      return;
    }

    if (message.type === "share-saved" || message.type === "export-saved") {
      const saved = filePath(message.name);
      const hit = message.type === "share-saved" ? "__granthShareHit" : "__granthExportHit";
      const miss = message.type === "share-saved" ? "__granthShareMiss" : "__granthExportMiss";
      if (fs.existsSync(saved)) {
        tell(win, `window.${hit} && window.${hit}(${JSON.stringify(message.name)})`);
        if (message.type === "share-saved") shell.showItemInFolder(saved);
      } else {
        tell(win, `window.${miss} && window.${miss}(${JSON.stringify(message.name)})`);
      }
      return;
    }

    if (message.type === "share-text") {
      clipboard.writeText(message.text || message.url || "");
      return;
    }

    if (message.type === "open-url" && message.url) {
      shell.openExternal(message.url);
      return;
    }

    if (message.type === "open-mail" && message.email) {
      shell.openExternal(`mailto:${message.email}`);
    }
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
