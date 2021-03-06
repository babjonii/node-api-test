const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

/**
 * Create
 */
app.post('/insert', (request, response) => {
    const { name } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.insertNewName(name);

    result
        .then(data => response.json({data: data}))
        .catch(err => console.log(err));
});

/**
 * Read
 */
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();
    result
        .then(data => response.json({data: data}))
        .catch(err => console.log(err));

});

/**
 * Update
 */

/**
 * Delete
 */
app.delete('/delete/:id',(request, response)=>{
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);

    result
        .then(data => response.json({success: data}))
        .catch(err => console.log(err))
})

app.listen(3001, "127.0.0.1", () => console.log('app is running'));
