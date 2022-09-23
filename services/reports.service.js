const faker = require('faker');
//const boom = require('@hapi/boom');
const { validateData, NOTFOUND, CONFLICT } = require('./../utils');

class ReportService {

  constructor(){
    this.reports = [];
  }

  //Crear reportes (llega la data según lo que mande el router)
  async create(data){
    const newReport = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.reports.push(newReport);
    return newReport;
  }

  //Mostrar todos los reportes
  getAll(limit){
    return new Promise((resolve, rejected) => {
      setTimeout(()=>{
        var reports = this.reports.slice(0, limit);
        if(reports.length>0){
          resolve(reports);
        }
        else{
          rejected('a');
        }
      },5000);
    });
  }

  //Mostrar el reporte que quieras mediante su id
  getReportById(id){
    const report = this.reports.find((item)=> item.id === id);

    validateData(report, NOTFOUND, 'No encontrado', (data) => !data);
    validateData(report, CONFLICT, 'CONFLICTO, el reporte esta bloqueado.', (data) => data.isActive == false);

    return report;
  }

}

module.exports = ReportService;
