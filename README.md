# ग्रंथ प्रबंधन — Windows (Flutter)

Native Flutter desktop port of the Android app for Windows.

## Setup

1. Install Flutter 3.35+ with Windows desktop support:
   ```bash
   flutter config --enable-windows-desktop
   ```

2. Clone this repository:
   ```bash
   git clone https://github.com/ashok8090/Granth-Windows.git
   cd Granth-Windows
   ```

3. Copy the Flutter source from the Android project:
   - Copy `lib/`, `assets/`, `pubspec.yaml`, `analysis_options.yaml`, `test/` from your Flutter-Granth project into this folder (overwrite if needed).

4. Generate the Windows runner (required once):
   ```bash
   flutter create --platforms=windows .
   ```

5. Get dependencies and run:
   ```bash
   flutter pub get
   flutter run -d windows
   ```

6. Build release:
   ```bash
   flutter build windows --release
   ```
   Output: `build/windows/x64/runner/Release/`

## Notes

- This repo is prepared for the Flutter desktop version.
- Some Android-only features (certain Firebase plugins, native highlighter activity, background notifications) may need additional desktop configuration or will fall back gracefully.
- WebView, file system, catalog, PDF, and search features work on Windows.
- Assets and fonts provide full Devanagari support.
- The previous Electron wrapper is replaced by this Flutter approach for native performance.

## Original Android repo

Base is the Flutter Android app (same package `com.wnm.granthprabandhan`).
