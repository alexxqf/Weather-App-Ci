# Weather App - CI/CD 🌍

Aplicación de consola para consultar el tiempo (Vigo) desarrollada en Node.js 20. Este proyecto implementa un pipeline completo de Integración y Despliegue Continuo (CI/CD) con GitHub Actions.

## 🚀 Estado del proyecto

![CI Tests](https://github.com/alexxqf/Weather-App-Ci/actions/workflows/ci.yml/badge.svg)
![Release & Build](https://github.com/alexxqf/Weather-App-Ci/actions/workflows/release.yml/badge.svg)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/alexxqf/Weather-App-Ci)

## 📦 Descargas (Ejecutables)

Gracias al pipeline de CD, puedes usar la aplicación sin tener instalado Node.js. Descarga el archivo según tu sistema en la sección de [Releases](https://github.com/alexxqf/Weather-App-Ci/releases):

*   **Linux**: `weather-app-ci-linux`
*   **Windows**: `weather-app-ci-win.exe`
*   **macOS**: `weather-app-ci-macos-arm64` o `weather-app-ci-macos-x64`

## 🧪 Desarrollo Local

Si quieres ejecutar los tests o ver la cobertura de código en tu máquina:

```bash
# Instalar dependencias
npm install

# Ejecutar tests
npm test

# Ver informe de cobertura
npm run test:coverage

# 🛠️ Tecnologías utilizadas

*   **Runtime**: Node.js 20
*   **Testing**: Jest
*   **Linter**: ESLint
*   **Empaquetado**: @yao-pkg/pkg
*   **Automatización**: GitHub Actions

# 📄 Licencia

Este proyecto es para fines educativos bajo la licencia MIT.
