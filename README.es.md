# Buk
Una red social singular

## Idiomas
- [Inglés](README.md)
- [Español](README.es.md)

## Setup
Clona el proyecto e instala las dependencias:

```sh
$ git clone https://github.com/martinval11/buk
$ cd buk
$ npm install
```

Ahora necesitamos crear un archivo `.env.local` para configurar la base de datos y otras funcionalidades:

```
NEXT_PUBLIC_SUPABASE_URL= {TU URL DE SUPABASE}
NEXT_PUBLIC_SUPABASE_KEY= {LA CLAVE DE TU BASE DE DATOS DE SUPABASE}
NEXT_PUBLIC_USERS_TABLE= {NOMBRE DE LA TABLA PARA LOS USUARIOS}
NEXT_PUBLIC_POSTS_TABLE= {NOMBRE DE LA TABLA  PARA LOS POSTS}
NEXT_PUBLIC_SECRET_KEY= {CLAVE PARA ENCRIPTAR Y DESENCRIPTAR DATOS}
```

Luego, ejecuta el siguiente comando para iniciar el servidor de desarrollo:

```sh
$ npm run dev
   ▲ Next.js 14.0.3
   - Local:        http://localhost:3000
   - Environments: .env.local

 ✓ Ready in 7.2s
```

## Scripts disponibles:
- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye el proyecto para producción
- `npm run start`: Inicia el servidor de producción
- `npm run test`: Ejecuta los tests con Cypress

## Tecnologías usadas
- Next.js
- Mantine
- Supabase
- TypeScript
- Cypress

## Un poco de contexto
Buk es la continuación de [Mitter](https://github.com/martinval11/Mitter), Lo tuve que abandonar debido a su complejidad.