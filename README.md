# SeArmoElFulbito- Backen Server

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

> **NOTA:** Para desarrollo setear la variable de entorno NODE_ENV=development


#### Logger (winston)
* ``searmo_api_log_file`` - Ruta del archivo de logs de express (Default: 'logs/books_backend.log')
* ``searmo_api_log_file_exceptions`` - Ruta del archivo de logs de excepciones (Default: 'logs/books_backend_exceptions.log')
* ``searmo_apilog_general_level`` - Nivel de general de Errores. Salida por consola (Default: 'debug')
* ``searmo_api_log_file_level`` - Nivel de Errores que se van a guardar en archivo. (Default: 'warn')
* ``searmo_api_log_file_exceptions_level`` - - Nivel de Error de excepciones que se van a guardar en archivo de log de excepciones. (Default: 'error')

> **Niveles de error Soportados**
> * ``error: 0``
> * ``warn: 1``
> * ``info: 2``
> * ``http: 3,``
> * ``verbose: 4``
> * ``debug: 5``
> * ``silly: 6``

> **NOTA:** Los niveles de error se definen el los archivos de configuracion ``config\default.json``


