# Desafío Backend - Nodejs
Este proyecto es la resolución de un challenge backend utilizando Nodejs puro, aplicando arquitectura hexagonal, validaciones con Zod, y pruebas unitarias con Jest.

## Dependencias 
```bash
"dependencies": {
    "bcryptjs": "^3.0.2",
    "dotenv": "^16.5.0",
    "express": "^5.1.0",
    "express-session": "^1.18.1",
    "ip": "^2.0.1",
    "jsonwebtoken": "^9.0.2",
    "mysql": "^2.18.1",
    "zod": "^3.24.3"
}
```

### 1. Instalar dependencias  
```bash
 npm install
```

### 2. Crear archivo .env
 Existe archivo de ejemplo: .env.example

### 3. Importar base de datos 
 Archivo a ejecutar ubicado en src/scripts/challenge_db.sql

## 4. Ejecutar servidor o test
``` bash

npm run dev 
npm test

```

## Endpoints implementados

Empresas

- GET /api/empresas/transferencias-recientes
- GET /api/empresas/adhesiones-recientes
- POST /api/empresas/adhesion


Usuarios (Agregado extra no completo)

- POST /api/auth/register 
- POST /api/auth/login

