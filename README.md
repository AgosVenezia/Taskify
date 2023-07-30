
<div align="center">
<h1 align="center">
<img src="public/img/logorectangular.png" width="100" />
</h1>

<h3>Estado del deploy:</h3>

[![Netlify Status](https://api.netlify.com/api/v1/badges/5227ebf0-d2eb-4198-a054-a8902b1b268f/deploy-status)](https://taskify-react-grupo9.netlify.app/)

<h3>Desarrollado con el software y las herramientas detalladas a continuación:</h3>

<p align="center">
<img src="https://img.shields.io/badge/MongoDB-47A248.svg?style&logo=MongoDB&logoColor=white" alt="MongoDB" />
<img src="https://img.shields.io/badge/Express-000000.svg?style&logo=Express&logoColor=white" alt="Express" />
<img src="https://img.shields.io/badge/React-61DAFB.svg?style&logo=React&logoColor=black" alt="React" />
<img src="https://img.shields.io/badge/Node.js-green?logo=node.js" alt="Node.js" />

<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style&logo=Axios&logoColor=white" alt="Axios" />
<img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style&logo=Prettier&logoColor=black" alt="Prettier" />
<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style&logo=HTML5&logoColor=white" alt="HTML5" />
<img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style&logo=PostCSS&logoColor=white" alt="PostCSS" />
<img src="https://img.shields.io/badge/Autoprefixer-DD3735.svg?style&logo=Autoprefixer&logoColor=white" alt="Autoprefixer" />
<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style&logo=ESLint&logoColor=white" alt="ESLint" />
<img src="https://img.shields.io/badge/SemVer-3F4551.svg?style&logo=SemVer&logoColor=white" alt="SemVer" />
<img src="https://img.shields.io/badge/Markdown-000000.svg?style&logo=Markdown&logoColor=white" alt="Markdown" />
<img src="https://img.shields.io/badge/OpenAI-412991.svg?stylee&logo=OpenAI&logoColor=white" alt="OpenAI" />
<img src="https://img.shields.io/badge/JSON-000000.svg?style&logo=JSON&logoColor=white" alt="JSON" />
</p>

<img src="https://img.shields.io/github/languages/top/nnamregg/react-trello-clon?style&color=5D6D7E" alt="GitHub top language" />
<img src="https://img.shields.io/github/languages/code-size/nnamregg/react-trello-clon?style&color=5D6D7E" alt="GitHub code size in bytes" />
<img src="https://img.shields.io/github/commit-activity/m/nnamregg/react-trello-clon?style&color=5D6D7E" alt="GitHub commit activity" />
<img src="https://img.shields.io/github/license/nnamregg/react-trello-clon?style&color=5D6D7E" alt="GitHub license" />
</div>

---

<a id="toc"></a>

## :book: Tabla de Contenidos
- [:book: Tabla de Contenidos](#toc)
- [:round_pushpin: Descripción](#desc)
- [:gear: Características](#caracteristicas)
- [:moyai: Integrantes](#integrantes)
- [:bookmark_tabs: Documentación](#documentacion)
- [:file_folder: Estructura del proyecto](#estructura)
- [:rocket: Primeros pasos](#primeros-pasos)
- [:handshake: Contribuir](#contribuir)

---

<a id="desc"></a>

## :round_pushpin: Descripción

Taskify es una herramienta creada en React JS que permite gestionar cualquier tipo de tareas, personalizarlas según la importancia y necesidades del usuario. Las tablas contienen las tareas manteniendo un orden lo que permite tener un fácil acceso y optimizar tiempo además de tener un diseño sencillo lo que simplifica la vista. Se destaca que cualquier persona puede utilizar el servicio con solo registrarse como usuario.

---

<a id="caracteristicas"></a>

## :gear: Características

Esta aplicación fue desarrollada utilizando el stack MERN, que consiste en MongoDB, Express.js, React.js y Node.js. Proporciona funcionalidades completas de registro de usuarios, autenticación utilizando jsonwebtoken y almacenamiento seguro de contraseñas mediante el uso de técnicas de hasheo.

### Funciones principales

* Registro y Autenticación de Usuarios
* Edición y eliminación de Perfil
* Board de Tareas
* Categorización de Tareas
* Tema Personalizado

Por el lado del **frontend**, se utilizó [ReactJS](https://react.dev/reference/react) y [TailwindCSS](https://tailwindcss.com/docs/installation).

* Librerías adicionales:
  * [react-icons](https://www.npmjs.com/package/react-icons): Bundle de librerías de íconos (_fontawesome, materialdesign, heroicons_)
  * [react-router-dom](https://www.npmjs.com/package/react-router-dom): Enrutador de react
  * [react-toastify](https://www.npmjs.com/package/react-toastify): Componentes de notificaciones 
  * [flowbite](https://www.npmjs.com/package/flowbite): Componentes interactivos para tailwind
  * [flowbite-react](https://www.npmjs.com/package/flowbite-react): Componentes hechos para flowbite y tailwind

En el **backend**, implementa un entorno Express [serverless](https://www.npmjs.com/package/serverless-http) utilizando [netlify functions](https://docs.netlify.com/functions/overview/) para facilitar el deploy en dicha plataforma.

* Librerías adicionales:
  * [mongodb](https://www.npmjs.com/package/mongodb): Driver oficial de MongoDB para Node.js
  * [mongoose](https://www.npmjs.com/package/mongoose): Mapeo relacional de objetos para MongoDB
  * [express-async-handler](https://www.npmjs.com/package/express-async-handler): Middleware de manipulación de excepciones
  * [express-fileupload](https://www.npmjs.com/package/express-fileupload): Middleware para carga de archivos
  * [axios](https://www.npmjs.com/package/axios): Cliente HTTP
  * [bcryptjs](https://www.npmjs.com/package/bcryptjs): Hasheo y verificación de contraseñas
  * [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): Generador de tokens JSON
  * [cookie-parser](https://www.npmjs.com/package/cookie-parser): Parser de cookies



---

<a id="integrantes"></a>

## :moyai: Integrantes

| Nombre                            | Github                              |
|-----------------------------------|-------------------------------------|
| Germán Troncoso                   | https://github.com/nnamregg/        |
| Agostina Celina Venezia Napolillo | https://github.com/AgosVenezia/     |
| Verónica Pallas                   | https://github.com/VeronicaPallas/  |
| Victor Lisandro Formica           | https://github.com/Lisandrofor      |

---

<a id="documentacion"></a>

## :bookmark_tabs: Documentación

[Documentación del proyecto](https://docs.google.com/document/d/1JafNHYRwFPZZVwpnJ3gISTijmTb5_BBLVEATjfnFFMU/)

---

<a id="estructura"></a>

## :file_folder: Estructura del proyecto


```bash
repo
├── netlify
│   ├── edge-functions-import-map.json
│   └── functions
│       ├── api.js
│       ├── config
│       │   └── db.js
│       ├── controllers
│       │   ├── taskController.js
│       │   ├── tasklistController.js
│       │   └── userController.js
│       ├── middleware
│       │   ├── authMiddleware.js
│       │   └── errorMiddleware.js
│       ├── models
│       │   ├── tasklistModel.js
│       │   ├── taskModel.js
│       │   └── userModel.js
│       ├── routes
│       │   ├── tasklistRoutes.js
│       │   ├── taskRoutes.js
│       │   └── userRoutes.js
│       └── utils
│           ├── generateToken.js
│           └── uploadAvatar.js
├── netlify.toml
├── package.json
├── package-lock.json
├── public
│   ├── favicon
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── favicon.ico
│   │   └── site.webmanifest
│   ├── img
│   │   ├── background.jpg
│   │   ├── logocircular.png
│   │   └── logorectangular.png
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── README.md
├── src
│   ├── App.js
│   ├── App.test.js
│   ├── components
│   │   ├── AuthModal.js
│   │   ├── CustomLightbox.js
│   │   ├── Header.js
│   │   ├── ProfileCard.js
│   │   ├── ProfileForm.js
│   │   ├── TaskForm.js
│   │   ├── Task.js
│   │   ├── TasklistForm.js
│   │   └── Tasklist.js
│   ├── context
│   │   ├── boardContext.js
│   │   └── userContext.js
│   ├── index.css
│   ├── index.js
│   ├── reportWebVitals.js
│   ├── screens
│   │   ├── Board.js
│   │   ├── Home.js
│   │   └── Profile.js
│   ├── setupTests.js
│   └── utils
│       └── PrivateRoutes.js
└── tailwind.config.js

17 directorios, 55 archivos
```

---

<a id="primeros-pasos"></a>

## :rocket: Primeros pasos

### :heavy_check_mark: Requerimientos

Antes de comenzar, asegúrese de tener instalados los siguientes requisitos previos:
> - `node`

https://nodejs.org/en/download

> - `netlify-cli`

https://docs.netlify.com/cli/get-started/#installation

### :crystal_ball: Instalación

1. Clonar el repositorio:
```sh
git clone https://github.com/nnamregg/react-trello-clon
```

2. Navegar al directorio del proyecto:
```sh
cd react-trello-clon
```

3. Instalar las dependencias:
```sh
npm install
```

4. Configurar el entorno de desarrollo de netlify functions:
```toml
# Configuración por archivo ./netlify.toml
# https://docs.netlify.com/configure-builds/file-based-configuration/
[functions]
  external_node_modules = ["express"]
  node_bundler = "esbuild"
[[redirects]]
  force = true
  from = "/api/*"
  status = 200
  to = "/.netlify/functions/api/:splat"
```


### :video_game: Correr el servidor de desarrollo

```sh
netlify dev
```

---

<a id="contribuir"></a>

## :handshake: Contribuir

¡Las contribuciones son siempre bienvenidas! Siga estos pasos:
1. Bifurcar el repositorio del proyecto. Esto crea una copia del proyecto en su cuenta que puede modificar sin afectar el proyecto original.
2. Clone el repositorio bifurcado en su máquina local usando un cliente de Git como Git o GitHub Desktop.
3. Cree una nueva rama con un nombre descriptivo (por ejemplo, `new-feature-branch` or `bugfix-issue-123`).
```sh
git checkout -b new-feature-branch
```
4. Realice cambios en el código base del proyecto.
5. Confirme sus cambios en su rama local con un mensaje de confirmación claro que explique los cambios que ha realizado.
```sh
git commit -m 'Implementado nuevo feature.'
```
6. Envíe sus cambios a su repositorio bifurcado en GitHub usando el siguiente comando
```sh
git push origin new-feature-branch
```
7. Cree una nueva solicitud de extracción en el repositorio del proyecto original. En la solicitud de extracción, describa los cambios que ha realizado y por qué son necesarios. Los mantenedores del proyecto revisarán sus cambios y proporcionarán comentarios o los fusionarán en la rama principal.


