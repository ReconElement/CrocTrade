import express from 'express';
const auth = express.Router();

auth.get('/signup', async (req, res)=>{
    const {email, password} = req.body;
    
})