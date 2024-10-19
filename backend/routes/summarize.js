import express from 'express';
import fetch from 'node-fetch';
import axios from 'axios';

const router = express.Router();

router.post('/summarize', async (req, res) => {
    const { text, maxLength } = req.body; 
    if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Invalid input: text is required.' });
    }

    const maxLen = maxLength || 250; 
    const minLen = Math.min(180, maxLen); 

    try {
        const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                inputs: text,
                parameters: {
                    max_length: maxLen, 
                    min_length: minLen,  
                    do_sample: false,   
                    early_stopping: true, 
                },
            }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json({ error: errorData });
        }

        const data = await response.json();
        if (!data || data.length === 0 || !data[0].summary_text) {
            return res.status(500).json({ error: 'Invalid response from the summarization API' });
        }

        const summary = data[0].summary_text; 
        res.json({ summary });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to summarize text' });
    }
});

// New route for summarizing articles from a URL
router.get('/summarize-url', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'Invalid input: URL is required.' });
    }

    const options = {
        method: 'GET',
        url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
        params: { url, lang: 'en', engine: '2' },
        headers: {
            'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com',
            'x-rapidapi-key': process.env.RAPIDAPI_KEY, // Use an environment variable for your API key
        },
    };

    try {
        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching the summary from URL:', error);
        res.status(500).json({ error: 'Error fetching the summary from URL' });
    }
});

export default router;
