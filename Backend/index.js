const http = require('http');
const expressApplication = require('./app');
const connectMongoDB = require('./models/index');
const PORT=process.env.PORT ?? 8000;
require('dotenv').config(); 

const uri = process.env.MONGO_URI;

async function init(){
    try{
        await connectMongoDB(process.env.MONGODB_URI);
        console.log("Mongo db is connected");
        const server = http.createServer(expressApplication);

        server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    }catch(err){
        console.error('Error at starting server ', err);
        process.exit(1);
    }
}

init();
