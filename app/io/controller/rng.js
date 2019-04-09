'use strict';

const Controller = require('egg').Controller;

class RngController extends Controller {
  async getLatestUnits() {
    const {ctx} = this;
    let data = await ctx.model.Units.findAll({
      order: [
        ['creation_date', 'DESC']
      ],
      limit: 10
    });
    await ctx.socket.emit('UPDATE_LATEST_UNITS', data);
  }
}

module.exports = RngController;
