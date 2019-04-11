'use strict';

const Controller = require('egg').Controller;
const rpc = require('../../libs/rpc');


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

  async getIndex() {
    const {ctx} = this;

    let key = 'index';
    let data = this.app.cache.get(key);
    if (data === undefined) {
      data = {};
      await rpc.get('miningStatus').then(res => {
        data.miningStatus = JSON.parse(res.result);
      })

      data.latestUnits = await ctx.model.Units.findAll({
        order: [
          ['creation_date', 'DESC']
        ],
        limit: 10
      });
      console.log(data)
      this.app.cache.set(key, data, 10);
    }
    await ctx.socket.emit('UPDATE_INDEX', data);
  }
}

module.exports = RngController;
