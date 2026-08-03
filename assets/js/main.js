const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).json({message: "Welcome to the API"});
})

app.get('/api/user', (req, res)=>{
    res.status(200).json({name: "GorillaWarrior", age: 20, country: "USA"});
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

