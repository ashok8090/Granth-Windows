const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ReactNativeWebView", {
  postMessage(message) {
    ipcRenderer.send("granth-msg", String(message));
  },
});

contextBridge.exposeInMainWorld("__granthVersion", "1.0.0");
