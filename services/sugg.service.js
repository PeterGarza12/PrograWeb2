const faker = require('faker');
const boom = require('@hapi/boom');
const { validateData, NOTFOUND, CONFLICT } = require('./../utils');

class SuggestionService {

  constructor(){
    this.suggestions = [];
  }

  //Crear sugerencia
  async create(data) {
    const newSuggestion = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.suggestions.push(newSuggestion);
    return newSuggestion;
  }

  //Traer todas las sugerencias
  getAll(limit) {
    return new Promise((resolve, rejected) => {
      setTimeout(() => {
        var suggestions = this.suggestions.slice(0, limit);
        if (suggestions.length > 0) {
          resolve(suggestions);
        } else {
          rejected('');
        }
      }, 5000);
    });
  }

  //Encontrar sugerencia mediante el id de la misma
  async getSuggestionById(id) {

    const suggestion = this.suggestions.find((item) => item.id === id);

    validateData(suggestion, NOTFOUND, 'No encontrado', (data) => !data);
    validateData(suggestion, CONFLICT, 'CONFLICTO, el suggestion esta bloqueado.', (data) => data.isActive == false);

    return suggestion;
  }

  //Encontrar sugerencia mediante el id del usuario
  async getSuggestionByIdUser(idUser) {

    const suggestion = this.suggestions.find((item) => item.idUser === idUser);

    validateData(suggestion, NOTFOUND, 'No encontrado', (data) => !data);
    validateData(suggestion, CONFLICT, 'CONFLICTO, el suggestion esta bloqueado.', (data) => data.isActive == false);

    return suggestion;
  }

  //Modificar parcialmente una sugerencia mediante id del usuario
  async update(idUser, changes) {
    const index = this.suggestions.findIndex((item) => item.idUser === idUser);

    if (index === -1) throw boom.notFound('Sugerencia no encontrado');


    var currentSuggestion = this.suggestions[index];
    this.suggestions[index] = {
      ...currentSuggestion,
      ...changes,
    };
    return this.suggestions[index];
  }

}


module.exports = SuggestionService;
