'use strict';

module.exports = app => {
  const {CHAR, DATE, BOOLEAN, INTEGER} = app.Sequelize;

  const Units = app.model.define('units', {
    unit: {type: CHAR(44), primaryKey: true},
    creation_date: DATE,
    is_stable: BOOLEAN,
    main_chain_index: INTEGER
  }, {
    timestamps: false
  });

  return Units;
};
