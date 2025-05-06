const cors = require('cors-anywhere');

const host = 'localhost';
const port = 8080;

cors.createServer({
    originWhitelist: [], // Permite todos los orígenes
    requireHeaders: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, () => {
    console.log(`CORS Anywhere corriendo en http://${host}:${port}`);
});
