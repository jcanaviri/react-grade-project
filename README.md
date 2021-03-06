# Estimate App β

### Autor:
π§βπ *Nombre:* Josue Miguel Canaviri Martinez

πββοΈ *Carrera:* Ing. Ciencias de la ComputaciΓ³n

### Requisitos del Sistema π»:
* π½ Nodejs v16.14.2 
* π yarn 1.22.19 

### Requisitos del Proyecto π:
* βοΈ Conocer un poco react
* π€ Contar con una cuenta en supabase
* ποΈ Saber un poco de base de datos relacionales

### Pasos para reproducir el Proyecto πΆββοΈ:

```shell
# Clonamos el proyecto
$ git clone https://github.com/jcanaviri/react-grade-project.git
```

```shell
# Accedemos al proyecto y instalamos las dependencias necesarios
$ cd react-grade-project
$ yarn
```

> En este punto se debe haber creado una cuenta nueva en Supabase y crear un nuevo proyecto en el dashboard puede llamarse con cualquier nombre

![Supabase Logo](https://raw.githubusercontent.com/supabase/supabase/master/packages/common/assets/images/supabase-logo-wordmark--dark.svg#gh-dark-mode-only)

> Supabase es un BaaS(Backend as a Service) que proporciona un amplia lista de servicios de forma gratuita. π

> Pero no todos son gratuitos como por ejemplo el backup a la base de datos π­. Asi que para este punto es necesario que se cree la base de datos en el editor de supabase bajo el siguiente diagrama:

![Diagrama de la Base de Datos](./src/assets/database.png)



```shell
# Copiamos las credenciales proporcionadas por Supabase al archivo de variables
$ cp .env.example .env # Copia el archivo de variables de ejemplo
```

El archivo debe ser llenado de la siguiente forma:

![variables de entorno](./src/assets/enviroment.png)

Una vez hechas estos pasos ya estamos listos para correr el proyecto π§βπ»:
```shell
$ yarn dev
```
Y ya esta ππ
