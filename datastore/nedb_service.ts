/**
 * Created by malaka on 11/4/17.
 */

const Datastore = require('nedb');

const database = {};
database['plans'] = new Datastore(
  {
    filename: './datastore/db/plans.database',
    autoload: true
  });
database['customers'] = new Datastore(
  {
    filename: './datastore/db/customers.database',
    autoload: true
  });
database['coat_orders'] = new Datastore(
  {
    filename: './datastore/db/coat_orders.database',
    autoload: true
  });

// You need to load each database (here we do it asynchronously)
database['plans'] .loadDatabase();
database['customers'] .loadDatabase();
database['coat_orders'] .loadDatabase();

/*
 ====================================================================================
 DB actions
 ====================================================================================
 */

const operations = {
  insert: 1,
  find: 2.0,
  find_sort: 2.1,
  find_one: 2.2,
  find_id: 2.3,
  count: 4,
  update: 5,
  remove: 6
};

export let dbCalls = (arg, next) => {
  const d = database[arg['model']];
  switch (arg.operation) {
    case operations.insert:
      return d.insert(arg['doc'], next);
    case operations.find:
      return d.find(arg['query'], next);
    case operations.find_sort:
      return d.find(arg['query']).sort(arg['sortBy']).exec(next);
    case operations.find_id:
      return d.find({_id: arg['_id']}, next);
    case operations.find_one:
      return d.findOne(arg['query'], next);
    case operations.count:
      return d.count(arg['query'], next);
    case operations.update:
      break;
    case operations.remove:
      break;
  }
};
