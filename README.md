# Development
Pasos para levantar la app en desarrollo

1. Levantantar la base de datos
```
docker compose up -d
```

2. Renombrar el .env.template a .env
3. Reemplazar las variables de entorno
4. Ejecutar el SEED para [crear la base de datos local][localhost:3000/api/seed]
# Prisma comands
```
npx prisma init
npx prisma migrate dev
npx prima generate
```
# Prod

# Stage