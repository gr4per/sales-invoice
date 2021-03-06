'use strict';

const Promise = require('bluebird');
const createInvoiceReceipt = require('./invoice-migration/createInvoiceReceipt');
const createInvoiceReceiptItem = require('./invoice-migration/createInvoiceReceiptItem');
const createCostDistribution = require('./invoice-migration/createCostDistribution');
const createCostDistributionPos = require('./invoice-migration/createCostDistributionPos');

/**
 * Applies migrations for databse tables and data.
 * If all migrations were successul, this method will never be executed again.
 * To identify which migrations have successfully been processed, a migration's filename is used.
 *
 * @param {object} data - [Sequelize]{@link https://github.com/sequelize/sequelize} instance.
 * @param {object} config - A model property for database models and everything from [config.data]{@link https://github.com/OpusCapitaBusinessNetwork/db-init} passed when running the db-initialization.
 * @returns {Promise} [Promise]{@link http://bluebirdjs.com/docs/api-reference.html}
 * @see [Applying data migrations]{@link https://github.com/OpusCapitaBusinessNetwork/db-init#applying-data-migrations}
 */
module.exports.up = function(db, config) {
  return createCostDistribution(db.getQueryInterface()).then(() => {
    return createCostDistributionPos(db.getQueryInterface());
  }).then(() => {
    return createInvoiceReceipt(db.getQueryInterface());
  }).then(() => {
    return createInvoiceReceiptItem(db.getQueryInterface());
  })
};

/**
 * Reverts all migrations for databse tables and data.
 * If the migration process throws an error, this method is called in order to revert all
 * changes made by the up() method.
 *
 * @param {object} data - [Sequelize]{@link https://github.com/sequelize/sequelize} instance.
 * @param {object} config - A model property for database models and everything from [config.data]{@link https://github.com/OpusCapitaBusinessNetwork/db-init} passed when running the db-initialization.
 * @returns {Promise} [Promise]{@link http://bluebirdjs.com/docs/api-reference.html}
 * @see [Applying data migrations]{@link https://github.com/OpusCapitaBusinessNetwork/db-init#applying-data-migrations}
 */
module.exports.down = function(db, config) {
  return Promise.all([
    db.getQueryInterface().dropTable('InvoiceReceiptItem'),
    db.getQueryInterface().dropTable('InvoiceReceipt'),
    db.getQueryInterface().dropTable('CostDistributionPos'),
    db.getQueryInterface().dropTable('CostDistribution'),
    db.getQueryInterface().dropTable('CostObject'),
  ]);
};
