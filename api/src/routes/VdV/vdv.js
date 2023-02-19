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

//----------PENDIENTES---------------
//** HACER RUTAS PARA TRAERNOS LAS VDV QUE ESTEN ACTIVAS O PENDIENTES -> admin "Pending" y listado entidades "Active"
//** VER COMO PODEMOS IMPLEMENTAR EL FILTRADO COMBINADO EN EL BACK, LOS CHICOS DEL FRONT NO TIENEN DRAMA EN ENCARGARSE ELLOS -> FILTROS(MATERIALES) + ORDENAMIENTO(RATING/PUNTUACION)
//** QUERY SEARCHBAR -> BUSQUEDA POR LO INGRESADO EN EL SEARCHBAR (NOMBRE/STRING DE LA VDV -> QIE TRAIGA TODAS LAS VDV CORRESPONDIENTES AL VALOR INGRESADO)
//** VER DE DEVOLVERLES UN ARRAY CON LOS NOMBRES DE LOS MATERIALES -> ["Madera", "Vidrio", etc]


//FUNCIONA. ESTE ES EL BULKCREATE PARA CARGAR LA BASE DE DATOS
router.post('/chargeDb', async (req, res) => {
  try {
    const chargeVdvsDb = await chargeDbVdVs(vdvs);
    res.status(200).send(chargeVdvsDb);

  } catch (error) {
    res.status(404).send(error.message);
  }
});

//FUNCIONA
router.post('/', async (req, res) => {
  try {
    const result = await vdvCreate(req.body);
    res.status(200).send(result);

  } catch (error) {
    res.status(404).send(error.message);
  }
});

//FUNCIONA
router.get('/', async (req, res) => {
  try {
    const result = await getVdV();
    res.status(200).send(result);

  } catch (error) {
    res.status(404).send(error.message);
  }
});

//FUNCIONA. getByIdVdV
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getByIdVdV(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//FUNCIONA. upDateVdV  
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await upDateVdV(id, body);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//FUNCIONA. deleteVdV
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteVdV(id);
    res.status(200).send(`Solictud ${id} eliminada`);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//FUNCIONA. Cambiar de pending a active (por ahora lo hacemos al reves)
//De momento te manda la entidad cambiada con todos los datos, incluso la nueva contra provisoria
// La nueva contra provisoria de momento es un string fijo. No se como crear contras seguras aleatorias
router.put('/status/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await changeStatus(id, body);
    res.status(200).send(result);
    /* res.status(200).send('Solicitud aprobada. Se te ha creado una contrasena provisoria'); */

  } catch (error) {
    res.status(404).send(error - message);
  }
});

// Agregar ruta CBU -> modificacion de CBU

module.exports = router;
