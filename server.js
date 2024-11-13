import app from './app/app.js';
import http from 'http'

const server = http.createServer(app);
const PORT = 5000;
server.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`);
});