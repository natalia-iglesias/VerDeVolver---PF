const { Router } = require('express');
const {
  chargeDbVdVs,
  vdvCreate,
  getVdV,
  getByIdVdV,
  upDateVdV,
  deleteVdV,
  changeStatus,
} = require('./controllers.js');

const router = Router();
const { vdvs } = require('./array.js');

//NO BORREN. ESTE ES EL BULKCREATE PARA CARGAR LA BASE DE DATOS
router.post('/chargeDb', async (req, res) => {
  try {
    const chargeVdvsDb = await chargeDbVdVs(vdvs);
    res.status(200).send(chargeVdvsDb);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const result = await vdvCreate(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//** HACER RUTAS PARA TRAERNOS LAS VDV QUE ESTEN ACTIVAS O PENDIENTES -> admin "Pending" y listado entidades "Active"
//** vER COMO PODEMOS IMPLEMENTAR EL FILTRADO COMBINADO EN EL BACK, LOS CHICOS DEL FRONT NO TIENEN DRAMA EN ENCARGRSE ELLOS -> FILTROS(MATERIALES) + ORDENAMIENTO(RATING/PUNTUACION)
//** QUERY SEARCHBAR -> BUSQUEDA POR LO INGRESADO EN EL SEARCHBAR (NOMBRE/STRING DE LA VDV -> QIE TRAIGA TODAS LAS VDV CORRESPONDIENTES AL VALOR INGRESADO)
//**  VER DE DEVOVLERLES UN ARRAY CON LOS NOMBRES DE LOS MATERIALES -> ["Madera", "Vidrio", etc]
router.get('/', async (req, res) => {
  try {
    const result = await getVdV();
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// getByIdVdV
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getByIdVdV(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// upDateVdV  // Devolver el objeto con los cambios realizados
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await upDateVdV(id, body);
    res.status(200).send('Actualizacion de datos exitosa');
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// deleteVdV
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteVdV(id);
    res.status(200).send(`Solictud ${id} eliminada`);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Cambiar de pendinf a active (por ahora lo hacemos al reves)
router.put('/status/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await changeStatus(id);
    res.status(200).send('Solicitud aprovada');
  } catch (error) {
    res.status(404).send(error - message);
  }
});

// CBU -> modificacion de CBU

module.exports = router;
