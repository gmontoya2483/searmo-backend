# SeArmoElFulbito- Backen Server

## Descripción

Backend REST API de la aplicación **SeArmoElFulbito**.

## Recostruir módulos de Node
```
npm install
```

## Generar carpeta de distribución
```
tsc -w
```

## Levantar servidor
```
nodemon dist/
```

ó

```
node dist/
```

## Variables de Entorno

Se debe crear un archivo llamado ``.env`` que debe estar en la raiz del proyecto. El contenido de este archivo debe ser el siguiente:   

```textmate
NODE_ENV=
searmo_api_port=
searmo_api_db_connection_url=
searmo_api_jwtPrivateKey=
searmo_api_sendGridApiKey=
searmo_api_sendGridFromEmail=
``` 

> **NOTA:** Para desarrollo, setear la variable de entorno NODE_ENV=development


#### Logger (winston)

```json5
"logger": {
"LOG_FILE": "logs/searmo_backend.log", //Ruta del archivo de logs de express
"LOG_FILE_EXCEPTIONS": "logs/searmo_backend_exceptions.log", //Ruta del archivo de logs de excepciones
"LOG_GENERAL_LEVEL": "info", // Nivel de general de Errores. Salida por consola
"LOG_FILE_LEVEL": "warm", //Nivel de Errores que se van a guardar en archivo
"LOG_FILE_EXCEPTIONS_LEVEL": "error" //Nivel de Error de excepciones que se van a guardar en archivo de log de excepcione
},
```

> **Niveles de error Soportados**
> * ``error: 0``
> * ``warn: 1``
> * ``info: 2``
> * ``http: 3,``
> * ``verbose: 4``
> * ``debug: 5``
> * ``silly: 6``

> **NOTA:** Los niveles de error se definen el los archivos de configuracion ``config\default.json``


### Sendgrid para envio de notificaciones

Para el servicio de notificaciones y envio de mail se utilizó el servicio de Sendgrid de twilio  

[Twilio SendGrid](https://sendgrid.com/)


Para habilitar las notificaciones, se debe setear los siguientes parametros dentro del archivo de configuracion:

```json5
"notification": {
"NOT_BASE_URL": "http://localhost:3000", // url de base para los link en las notificaciones
"NOT_AVAILABLE": true // Habilita o deshabilita el envio de notificaciones
}
```

> **NOTA:** Al finalizar el frontend, **NOT_BASE_URL** deberia ser enviado a una url del frontend


## Postman Project:

Se adjunto dentro de la carpeta ``postman_project``, el archivo para importar el proyecto de Postman.

