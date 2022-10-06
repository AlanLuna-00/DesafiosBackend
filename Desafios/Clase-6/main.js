const express = require('express');

const getTime = () => {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 6 && hour < 12) {
        return 'Buenos dias';
    } else if (hour >= 12 && hour < 18) {
        return 'Buenas tardes';
    } else {
        return 'Buenas noches';
    }
}

const app = express();

app.get('/', (req, res) => {
    res.send(getTime());
});

app.listen(8080, () => {
    console.log(`Servidor escuchando en el puerto 8080`);
    console.log(`Hola, ${getTime()}`);
})