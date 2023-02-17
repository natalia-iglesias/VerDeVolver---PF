const { Router } = require('express');
const { chargeDbVdVs, vdvCreate, getVdV,getByIdVdV, upDateVdV, deleteVdV} = require('./controllers.js');
const { VdV, Material } = require('../../db.js');

const router = Router();
/* 
router.post('/', async (req, res) => {
   
  try {

    const newVdV = await createdVdV(req.body)
    res.status(200).send(newVdV);
  } catch (error) {
    res.status(400).send(error.message);
  }
}); */

//NO BORREN. ESTE ES EL BULKCREATE PARA CARGAR LA BASE DE DATOS
router.post('/chargeDb', async (req, res) => {
  try {
    const chargeVdvsDb = await chargeDbVdVs();
    res.status(200).send(chargeVdvsDb);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

/* router.get('/', async (req, res) => {
  try {
    const Vdvs = await getVdV()
    res.status(200).send(Vdvs);
  } catch (error) {
    res.status(404).send(error.message);
  }
}); */

router.post('/', vdvCreate)

router.get('/:id',getByIdVdV)

router.get('/',getVdV)
 
router.put('/:id',upDateVdV)

router.delete('/:id', deleteVdV)

module.exports = router;
