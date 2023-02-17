const { Op } = require('sequelize');
const { Role, User } = require('../../db.js');

//ESTE ES EL BULKCREATE NO LO BORREN
async function chargeDbUsers() {
  const role = await Role.findByPk(1);
  //console.log('role.id:', role.);

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
}

const postUser = async (req, res, next) => {
  try {
    const data = req.body;
    const role = await Role.findByPk(1);

    const existUser = await User.findOne({
      where: {
        mail: {
          [Op.like]: data.mail,
        },
      },
    });

    if (!existUser) {
      const newUser = await User.create({
        name: data.name,
        last_name: data.last_name,
        mail: data.mail,
        password: data.password,
        address: data.address,
        RoleId: role.id,
      });

      return res.status(200).send(newUser);
    } else {
      return res
        .status(404)
        .send(`El usuario con mail ${data.mail}, ya habia sido creado`);
    }
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req, res, next) => {
  const dbAll = await User.findAll({
    include: [
      {
        model: Role,
      },
    ],
  });
  return dbAll;
};

const getByName = async (name) => {
  //const minusName = name.toLowerCase;

  const byName = await User.findAll({
    where: {
      name: {
        [Op.iLike]: name,
      },
    },
    include: [
      {
        model: Role,
      },
    ],
  });

  return byName;
};

const findId = async (id) => {
  const byPk = await User.findByPk(id, {
    include: [
      {
        model: Role,
      },
    ],
  });

  return byPk;
};

const updateUser = async (userToUD, id) => {
  await User.update(userToUD, {
    where: { id },
  });
};

const deleteUser = async (id) => {
  try {
    if (!id) throw Error('No se ha suministrado ningun id');

    const findById = await User.findAll({
      where: { id },
    });

    if (!findById) throw Error(`El id ${id} no fue encontrado`);

    await User.destroy({
      where: { id },
    });
  } catch (error) {
    throw Error({ error: error.message });
  }
};

// const findMail = async (mail) => {
//   const byMail = await User.findAll({
//     where: {
//       mail: {
//         [Op.iLike]: mail,
//       },
//     },
//     include: [
//       {
//         model: Role,
//       },
//     ],
//   });

//   return byMail;
// };

module.exports = {
  chargeDbUsers,
  postUser,
  getAllUser,
  getByName,
  findId,
  updateUser,
  deleteUser,
};
