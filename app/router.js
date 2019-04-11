'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io} = app;
  router.get('/', controller.home.index);
  io.of('/').route('getLatestUnits', io.controller.rng.getLatestUnits);
  io.of('/').route('getIndex', io.controller.rng.getIndex);
  io.of('/').route('getUnitInfo', io.controller.rng.getUnitInfo);
};
