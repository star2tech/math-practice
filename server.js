const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY'; // Replace with your actual key

app.post('/ask', async (req, res) => {
    const topic = req.body.topic;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {role: 'system', content: 'You are a helpful math tutor.'},
                {role: 'user', content: `Teach me about ${topic} in simple terms.`}
            ]
        })
    });
    const data = await response.json();
    res.json({ answer: data.choices[0].message.content });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

