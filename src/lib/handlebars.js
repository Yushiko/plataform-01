const {format,register} = require('timeago.js');

const helpers = {};

const formato = {};

//formato a la fecha
helpers.timeago =(timestamp) => {
    
    return format(timestamp,'es_ES');
}

helpers.timeagos =(timestamp) => {
    
  return format(timestamp);
}

//fotmato a español
const localeFunc = (number, index, total_sec) => {
    // number: the timeago / timein number;
    // index: the index of array below;
    // total_sec: total seconds between date to be formatted and today's date;
    return [
      ['Justo ahora', 'right now'],
      ['hace %s segundos', 'in %s seconds'],
      ['hace 1 minuto', 'in 1 minute'],
      ['hace %s minutos', 'in %s minutes'],
      ['hace 1 hora', 'in 1 hour'],
      ['hace %s horas', 'in %s hours'],
      ['hace 1 dia', 'in 1 day'],
      ['hace %s dias', 'in %s days'],
      ['hace 1 semana', 'in 1 week'],
      ['hace %s semanas', 'in %s weeks'],
      ['hace 1 mes', 'in 1 month'],
      ['hace %s meses', 'in %s months'],
      ['hace 1 año', 'in 1 year'],
      ['hace %s años', 'in %s years']
    ][index];
  };
  // register your locale with timeago
  register('es_ES', localeFunc);

module.exports = helpers;