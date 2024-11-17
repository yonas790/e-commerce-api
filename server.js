import app from './app/app.js';
import http from 'http'

const server = http.createServer(app);

server.listen(process.env.PORT, ()=>{
    console.log(`server is running at ${process.env.PORT}`);
});