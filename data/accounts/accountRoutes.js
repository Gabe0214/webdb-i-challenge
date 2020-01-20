const express = require('express')


const db = require('../dbConfig')
const router = express.Router();


// Get all ACCOUNTS 

router.get('/',  async (req, res, next) => {
    try {
           res.json(await db.select('*').from('accounts'))
    }  catch (err){
       next(err)
    }
}); 


// POST AN ACCOUNT 

router.post('/', async (req, res, next) => {
     try {
       const payload = {
           name: req.body.name,
           budget: req.body.budget
       }

  const [id] = await db('accounts').insert(payload)
 res.json(await db('accounts').where('id', id).first())
     } catch(err) {
       next(err)
     }
})



//  GET ACCOUNT BY ID 


router.get('/:id', async (req, res, next) => {
    try {
        res.json(await db('accounts').where('id', req.params.id).first())
      
    }  catch(err) {
         next(err)
    }
})


// DELETE ACCOUNT 


router.delete('/:id', async (req, res, next) => {
    try {
       await db('accounts').where('id', req.params.id).del()

       res.json(4)
    }  catch(err) {
        next(err)
    }
})

// PUT (UPDATE) ACCOUNT 


router.put('/:id', async (req, res, next) => {

    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }
       await db('accounts').where('id', req.params.id).update(payload)

       res.json(await db('accounts').where('id', req.params.id).first())

        }  catch(err) {
            console.log(err)
          next(err)
        }
})   



module.exports = router; 