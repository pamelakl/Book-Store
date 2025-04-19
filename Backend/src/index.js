const dotenv = require('dotenv');
dotenv.config();

const config = require('config');
if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

const {connectToMongoDB, disconnectFromMongoDB, initDB} = require('./databases/mongoose.db')

const signals = ['SIGINT', 'SIGTERM', 'SIGHUP'];
const gracefulShutdown = (signal, server) => {
    //Logic for the shutdown of the server
    process.on(signal, async () => {
        server.close();
        await disconnectFromMongoDB();
        console.log('Server was shut down successfully!');
        process.exit(0)
    })
}

const app = require('./app');

const PORT = config.get('port');

const server = app.listen(PORT, async () => {
    await connectToMongoDB();
    await initDB();
    console.log(`Server is running on port: ${PORT}`);

    for(let signal of signals){
        gracefulShutdown(signal, server);
    }
});

