const boom = require('@hapi/boom');

const checkRolHandler = (rol) => (req, res, next) => {
  try {
    const { user } = req;
    const rolesBy = user.role;
    console.log(user);
    const checkValueRol = rol.some((rolSingle) => rolesBy.includes(rolSingle));
    if (!checkValueRol) {
      // res.status(403).send({
      //   success: false,
      //   data: [],
      //   message: 'El usuario no tiene permisos',
      // });
      throw boom.unauthorized('El usuario no tiene permisos');
    }
    next();
  } catch (error) {
    // res.status(403).send({
    //   success: false,
    //   data: [],
    //   stack: error,
    //   message: 'Error en la consulta de permisos',
    // });
    next(error);
  }
};

module.exports = checkRolHandler;
