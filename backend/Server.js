import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import summarizeRouter from './routes/summarize.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());
app.use('/api', summarizeRouter);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
