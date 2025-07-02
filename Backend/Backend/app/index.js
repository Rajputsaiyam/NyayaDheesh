const express = require('express');
const cors = require('cors');
const userRoutes = require('../routes/userRoutes')
//const authenticationMiddleware = require('../middleware/authMiddleware')
const documentRoutes = require('../routes/documentRotes')
const lawyerRoutes = require('../routes/lawyerRoutes')
const appointmentRoutes = require('../routes/appointmentRoutes')

const app = express();

app.use(cors());

app.use(express.json());
//app.use(authenticationMiddleware);

app.get('/', (req, res) => {
        res.json({status:"success", message:"Server is up an running"});
});

app.use('/api', userRoutes)
app.use('/api/document', documentRoutes)
app.use('/api/lawyer', lawyerRoutes)
app.use('/api/appointment', appointmentRoutes)


module.exports = app;