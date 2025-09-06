import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/api/v1/',async (req, res)=>{
    res.send("Hello from Exness");
});

app.get('/',(req, res)=>{
    res.send("Hello World");
})

app.listen(PORT,()=>{
    console.log(`Server actively listening on PORT: ${PORT}`);
});