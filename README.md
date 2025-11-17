# Mi Inventario App

A next-js application generated with ZEUS.

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
 - Java 17 (JDK) y Android Studio (para Android)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the local development URL.

## Android (Capacitor)

Este proyecto está listo para Android con Capacitor. Tras construir la web (Next.js exporta a 
`out`), usa los siguientes comandos:

1) Añadir la plataforma Android (crea la carpeta `android/` con Gradle Wrapper real):
```bash
npx cap add android
```

2) Sincronizar cambios de la web a Android:
```bash
npx cap sync android
```

3) Compilar (usa firma solo si haces release):
```bash
npx cap build android
```

4) Compilación de Debug directa con Gradle Wrapper:
```bash
./android/gradlew -p android assembleDebug
# En Windows PowerShell:
./android/gradlew.bat -p android assembleDebug
```

Artefactos:
- APK debug: `android/app/build/outputs/apk/debug/app-debug.apk`
- Para release firmado: configura keystore y ejecuta `assembleRelease`.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server (if applicable)
- `npm run lint` - Run the linter

## Project Structure

This project follows the standard next-js structure and conventions.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
