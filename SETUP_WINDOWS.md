# Convert Android Flutter app → Windows Desktop

## Steps

1. Install Flutter 3.35+ and Visual Studio 2022 (with Desktop development with C++).

2. Enable Windows desktop:
   ```bash
   flutter config --enable-windows-desktop
   ```

3. Clone this repo and copy assets:
   ```bash
   git clone https://github.com/ashok8090/Granth-Windows.git
   cd Granth-Windows
   # Copy the entire assets/ folder from your Android Flutter project
   cp -r /path/to/Flutter-Granth-main/assets .
   ```

4. Generate the Windows runner:
   ```bash
   flutter create --platforms=windows .
   ```

5. Get packages and run:
   ```bash
   flutter pub get
   flutter run -d windows
   ```

6. Build installer-ready release:
   ```bash
   flutter build windows --release
   ```
   The .exe and supporting files are in `build/windows/x64/runner/Release/`.

## What works on Windows
- Full catalog, topics, granths, pramans
- Offline page download and PDF generation
- Hindi/Devanagari search and UI
- AI chat (via the public Worker)
- File open/share (using desktop file dialogs)

## What is Android-only (already guarded)
- Native Photo Highlighter Activity
- Firebase Analytics/Crashlytics/Auth/Messaging
- Google Sign-In
- Background download notifications

The app will run cleanly without those features on Windows.
