const app = require('./app');
const port = 5000;
const host = "127.0.0.1";
const server = app.listen(port, host, ()=> {
    console.log(`server running at ${server.address().port}`);
});