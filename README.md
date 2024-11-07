<h1 align='center'> Virtual Market</h1>

![image](https://github.com/user-attachments/assets/43e951ac-10b2-407a-adc7-86fde7c10ee1)

## Descripción
Este proyecto esta dividido en 2 partes:
- Parte 1: Frontend - React app
- Parte 2: Backend - RESTful Services in Java

## Requisitos previos
Antes de comenzar, asegúrate de tener instalado lo siguiente:
- Node.js
- Yarn (como gestor de paquetes)
- Java (para el backend)
- Maven (para gestionar las dependencias del backend)

##  Configuración de entorno
### Paso 1: Clonar proyecto con submodulos
``` bash
git clone --recurse-submodules https://github.com/lcasan/virtual-market.git
cd virtual-market
```

### Paso 2: Inicializar API
1. Cambia al directorio del submódulo descargado:

```bash
cd restful-api
```

2. Sigue las instrucciones detalladas a partir del Paso 2 en el [repositorio de la API](https://github.com/lcasan/restful-api).

Esto asegurará que la API esté correctamente configurada y lista para interactuar con la aplicación frontend.

### Paso 3: Instalar dependencias
```bash
yarn install
```

### Paso 4: Correr cliente
```bash
yarn dev
```
