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

      await rpc.get('getDurationByRoundIndex', [data.miningStatus.current_round]).then(res => {
        data.duration = JSON.parse(res.result);
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

  async getUnitInfo() {
    const {ctx} = this;
    let data = {}
    await rpc.get('getUnitInfo', [ctx.args[0].unit]).then(res => {
      data = JSON.parse(res.result);
    })
    await ctx.socket.emit('UPDATE_UNIT', data);
  }
}

module.exports = RngController;
