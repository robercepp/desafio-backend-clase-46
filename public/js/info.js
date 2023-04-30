const socket = io();

const args = document.getElementById('args')
const plat = document.getElementById('plat')
const version = document.getElementById('version')
const memoria = document.getElementById('memoria')
const exe = document.getElementById('exe')
const id = document.getElementById('id')
const path = document.getElementById('path')
const processors = document.getElementById('processors')

// Escucho los mensajes enviados por el servidor
socket.on('info', data => {
    args.innerHTML = `Argumentos de entrada: <br> ${data.args}`
    plat.innerHTML = `Nombre de la plataforma: <br> ${data.plat}`
    version.innerHTML = `Versión de Node: <br> ${data.version}`
    memoria.innerHTML = `Memoria total reservada: <br> ${data.memoria}`
    exe.innerHTML = `Path de ejecución: <br> ${data.exe}`
    id.innerHTML = `Id del proceso: <br> ${data.id}`
    path.innerHTML = `Carpeta del proyecto: <br> ${data.path}`
    processors.innerHTML = `Cantidad de procesadores del sistema: ${data.numCPUs}`
})




