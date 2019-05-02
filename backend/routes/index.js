/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router) {
    
  app.use('/api', require('./home.js')(router));
  app.use('/api/restaurants', require('./restaurants.js'));
  app.use('/api/nonprofits', require('./nonprofits.js'));
  app.use('/api/dishes', require('./dishes.js'));
  app.use('/api/requests', require('./requests.js'));
  app.use('/api/schedules', require('./schedules.js'));
};