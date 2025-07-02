// const http = require('http');
// const expressApplication = require('./app');
// const connectMongoDB = require('./models/index');
// const PORT=process.env.PORT ?? 8000;
// require('dotenv').config(); 

// const uri = process.env.MONGO_URI;

// async function init(){
//     try{
//         await connectMongoDB(process.env.MONGODB_URI);
//         console.log("Mongo db is connected");
//         const server = http.createServer(expressApplication);

//         server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//     }catch(err){
//         console.error('Error at starting server ', err);
//         process.exit(1);
//     }
// }

// init();


const app = require('./app');
const connectMongoDB = require('./models/index');
const serverless = require('serverless-http');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

let isConnected = false;

async function connectDBOnce() {
  if (!isConnected) {
    await connectMongoDB(uri);
    isConnected = true;
    console.log("MongoDB connected");
  }
}

const handler = async (req, res) => {
  await connectDBOnce(); // Ensure DB is connected before each request
  return serverless(app)(req, res);
};

module.exports = handler;
