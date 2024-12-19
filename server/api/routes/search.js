const express = require('express');
const app = express.Router();

const { User } = require('../../db');
const { authUser } = require('../../middleware/auth');

/**
 * @path /api/search
 * @method GET
 */
app.get('/', authUser(), async (req, res) => {
    const query = new RegExp(req.query.q.replace(/\s+/g, ' ').trim());

    if (!query) {
        return res.status(400).json({ message: 'Query is required' });
    }

    try {
        const results = await User.find({ 
            $or: [
                { first_name: { $regex: query, $options: 'i' } }, 
                { last_name: { $regex: query, $options: 'i' } },
                { full_name: { $regex: query, $options: 'i' } },
                { nickname: { $regex: query, $options: 'i' } },
                { "metadata.company_name": { $regex: query, $options: 'i' } },
            ] 
        });

        return res.status(200).json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = app;
