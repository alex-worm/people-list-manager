const {Router} = require('express');
const Person = require('../models/Person');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const people = await Person.find();
        res.json(people);
    } catch (e) {
        res.status(500).json({message: 'Something wrong, try again...'});
    }
});

router.post('/create', async (req, res) => {
    try {
        const {name, age} = req.body;

        const person = new Person({
            name, age
        });

        await person.save();

        res.status(201).json({person});
    } catch (e) {
        res.status(500).json({message: 'Something wrong, try again...'});
    }
});

router.delete('/delete:id', async (req, res) => {
    try {
        await Person.deleteOne({_id: req.params.id}, err => {
            if (err) throw new Error(err);
        });

        res.status(200).json({deleted: req.params.id});
    } catch (e) {
        res.status(500).json({message: 'Something wrong, try again...'});
    }
});

module.exports = router;
