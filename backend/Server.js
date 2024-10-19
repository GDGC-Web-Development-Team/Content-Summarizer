import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import summarizeRoutes from './routes/summarize.js'; 
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());
app.use(bodyParser.json());
app.use('/api', summarizeRoutes); 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
