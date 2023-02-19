const { Router } = require('express');
const router = Router();
const { Role, User, VdV, Feedback, Donation, Service } = require('../../db.js');

//1
async function chargeDbRoles() {
    const bulkCreateRoles = await Role.bulkCreate([
      { name: 'User' },
      { name: 'Admin' },
    ]);
  
    return bulkCreateRoles;
};
//2
async function chargeDbUsers() {
    const role = await Role.findByPk(1);
    const bulkCreateUsers = await User.bulkCreate([
      {
        name: 'Nathan',
        last_name: 'Sebhastian',
        mail: 'seb@mail.com',
        password: '12345',
        address: 'calle 10',
        RoleId: role.id,
      },
      {
        name: 'Jack',
        last_name: 'Stark',
        mail: 'jack@mail.com',
        password: '12345',
        address: 'calle 20',
        RoleId: role.id,
      },
      {
        name: 'John',
        last_name: 'Snow',
        mail: 'john@mail.com',
        password: '12345',
        address: 'calle 30',
        RoleId: role.id,
      },
      {
        name: 'Marco',
        last_name: 'Polo',
        mail: 'marco@mail.com',
        password: '12345',
        address: 'calle 40',
        RoleId: role.id,
      },
    ]);
  
    return bulkCreateUsers;
};
//3
async function chargeDbVdVs() {
    const bulkCreateVdvs = await VdV.bulkCreate([
      {  name: "Reciclar Ayuda", img: "www.imagen.com", mail:"ra@mail.com", address:"calle 1", description:"Somos una ONG sin fines de lucro", CBU:"34567898777"},
      {  name: "Juntos X el Cambio", img: "www.imagen.com", mail:"jxec@mail.com",  address:"calle 2", description:"Somos una ONG sin fines de lucro", CBU:"23456788777"},
      {  name: "Te Amo Mundo", img: "www.imagen.com", mail:"tam@mail.com",  address:"calle 3", description:"Somos una ONG sin fines de lucro", CBU:"0987698777"},
      {  name: "Salvando el Planeta", img: "www.imagen.com", mail:"sep@mail.com",  address:"calle 4", description:"Somos una ONG sin fines de lucro", CBU:"8976557898777"},
    ]);
  
    return bulkCreateVdvs;
}; 
//4
const chargeDbFeedback = async () => {
    try {
      const bulkCreateFeedbacks = await Feedback.bulkCreate([
        {  comment: "Muy malo, me trataron re mal", rating:"1" , UserId: "1", VdVId: "1"},
        {  comment: "Muy bueno. Mejoraron su atencion al cliente", rating:"5" , UserId: "1", VdVId: "1"},
        {  comment: "Muy bueno, me encanto", rating:"5", UserId: "1", VdVId: "2"},
        {  comment: "Muy malo", rating:"1", UserId: "2", VdVId: "1" },
        {  comment: "Horrible todo", rating:"1", UserId: "3", VdVId: "3" },
        {  comment: "Super bien toy feliz", rating:"4", UserId: "4", VdVId: "4" },
      ]);
  
      return bulkCreateFeedbacks;
  
    } catch (error) {
      throw Error ('Ocurrio un error. No se pudo cargar la base de datos');
    }
};
//5
async function chargeDbDonation() {
    const bulkCreateDonations = await Donation.bulkCreate([
      { amount: '1500', UserId: '1', VdVId: '1' },
      { amount: '1500', UserId: '1', VdVId: '1' },
      { amount: '2000', UserId: '1', VdVId: '1' },
      { amount: '2500', UserId: '2', VdVId: '1' },
      { amount: '3000', UserId: '3', VdVId: '3' },
      { amount: '5000', UserId: '4', VdVId: '4' },
    ]);
  
    return bulkCreateDonations;
};
//6
async function chargeDbServices() {
    const bulkCreateServices = await Service.bulkCreate([
      { amount: '5000', UserId: '1', VdVId: '1' },
      { amount: '5000', UserId: '1', VdVId: '1' },
      { amount: '5000', UserId: '1', VdVId: '1' },
      { amount: '5000', UserId: '2', VdVId: '1' },
      { amount: '5000', UserId: '3', VdVId: '3' },
      { amount: '5000', UserId: '4', VdVId: '4' },
    ]);
  
    return bulkCreateServices;
};


router.post('/', async (req, res) => {
    try {
        const first = await chargeDbRoles();
        if (!first) throw Error ('Ocurrio un error durante la carga de roles');
        const second = await chargeDbUsers();
        if (!second) throw Error ('Ocurrio un error durante la carga de usuarios');
        const third = await chargeDbVdVs(); 
        if (!third) throw Error ('Ocurrio un error durante la carga de entidades');
        const fourth = await chargeDbFeedback();
        if (!fourth) throw Error ('Ocurrio un error durante la carga de feedbacks');
        const fifth = await chargeDbDonation();
        if (!fifth) throw Error ('Ocurrio un error durante la carga de donaciones');
        const sixth = await chargeDbServices(); 
        if (!sixth) throw Error ('Ocurrio un error durante la carga de servicios');

      //No me odien jeje, no pude con la de materiales. Me hizo llorar sangre y no lo pude lograr
      res.status(200).send('Base de datos cargada. Ahora procede a cargar los materiales');

    } catch (error) {
      res.status(404).send(error.message);
    }
});


  module.exports = router;