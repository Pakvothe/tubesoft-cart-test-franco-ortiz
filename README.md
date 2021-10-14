# Tubesoft cart test

## Instalación

Necesitarás tener [Docker](https://docs.docker.com/get-docker/)
y [Docker-Compose](https://docs.docker.com/compose/install/) instalads en tu PC

Clonar el [repositorio](https://github.com/Pakvothe/tubesoft-cart-test-franco-ortiz).

```bash
git clone https://github.com/Pakvothe/tubesoft-cart-test-franco-ortiz.git
```

## Ejecutar la App

En la carpeta raíz del repositorio, ejecutar los siguientes comandos:

> En distribuciones Linux es probable que tengas que usar "sudo" antes de los comandos

```bash
docker-compose up --build
```

Luego de terminar la instalación del contenedor la aplicación estará disponible en:

Frontend:

> http://localhost:3000/

Backend:

> http://localhost:3001/

## Ejecutar los test

Frontend:

En el directorio ./client ejecutar los siguientes comandos:

```bash
yarn
yarn test
```

Backend:

En el directorio ./api ejecutar los siguientes comandos:

```bash
yarn
yarn test
```

## Detener la App

Al terminar de usar la app ejecutar el siguiente comando para detener Docker:

```bash
docker-compose down
```

## Contacto

fr.dv.ortiz@gmail.com
