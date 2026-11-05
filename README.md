# ग्रंथ प्रबंधन — Windows Desktop (Flutter)

Converted from the Android Flutter app for native Windows desktop.

## Quick start

1. Install Flutter 3.35+ and enable Windows:
   ```bash
   flutter config --enable-windows-desktop
   ```

2. Clone:
   ```bash
   git clone https://github.com/ashok8090/Granth-Windows.git
   cd Granth-Windows
   ```

3. Copy assets from the Android project (fonts, icons, structure.json, highlighter):
   ```bash
   # From your Flutter-Granth-main folder:
   cp -r assets .
   ```

4. Generate Windows runner (one time):
   ```bash
   flutter create --platforms=windows .
   ```

5. Run / build:
   ```bash
   flutter pub get
   flutter run -d windows
   # or
   flutter build windows --release
   ```

The release executable will be in `build/windows/x64/runner/Release/`.

## Notes
- Firebase, Google Sign-In, and native highlighter are Android-only and already guarded; they no-op on Windows.
- Core catalog, offline pages, PDF generation, search, and UI work on desktop.
- Window starts at 1280x720; you can edit `windows/runner/main.cpp` after generation to change size/title.
