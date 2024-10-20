import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const cleanFormatting = (text) => {
    return text.replace(/[*_~`]+/g, '');  
};
router.post('/summarize', async (req, res) => {
    const { text } = req.body; 
    if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Invalid input: text is required.' });
    }
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [{ text: `summarize ${text}` }]
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        console.log('Gemini API Response:', response.data); 
        const data = response.data;
        if (!data || !data.candidates || data.candidates.length === 0) {
            return res.status(500).json({ error: 'No response from Gemini API' });
        }
        let summary = data.candidates[0].content.parts[0].text || 'No summary available.';
        summary = cleanFormatting(summary); 

        res.json({ summary });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message); 
        res.status(500).json({ error: 'Failed to summarize text using Gemini API' });
    }
});
export default router;
