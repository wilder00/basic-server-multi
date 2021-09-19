se instaló:

```
npm install express
npm isntall cors
npm isntall body-parser
npm i --save-dev @types/express
npm i --save-dev @types/cors

npm install socket.io
```

iniciar proyecto con typescript

```
tsc --init

#para que esté en modo observador, es decir pase de ts a js cada vez que haya cambios
tsc -w
```

para correr el projecto
```
node dist/
# o
nodemon dist/

# para nodemon requiere instalarlo de forma global 
npm install -g nodemon
```

Creando el tag en git

```
git tag -a v1.0.0 -m "REST server listo"
# para comprobar el tag
git tag
```

para subir el tag a github

```
git push --tags
```
