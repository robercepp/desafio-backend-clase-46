process.on('message', msg => {
    if (msg) {
        calculo(msg)
    } else {
        calculo(100000000)
    }
})

const calculo = (cant = 10000) => {
    let numbers = []
    let resultado = []
    for (let i = 0; i < cant; i++) {
        let rand = Math.random() * 1000;
        rand = Math.floor(rand)
        numbers.push(rand)
    }
    const frequency = numbers.reduce((acc, item) => {
        acc[item] = acc[item] ? acc[item] + 1 : 1
        return acc
    }, {})
    Object.entries(frequency).forEach(entry => {
        const [key, value] = entry
        resultado.push({ 'Numero': key, 'Ocurrencias': value })
    })
   
    process.send(resultado)
    process.exit()
}