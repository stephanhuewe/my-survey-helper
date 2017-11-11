import {Injectable} from '@angular/core';
import {ElectronService} from './electron.service';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class DataService {

  private db_returns = new Subject();
  private reqCounter = 0;

  constructor(private electron: ElectronService) {
    electron.getIPCRenderer().on('db_returns', (event, arg) => {
      this.db_returns.next(arg);
    })
  }

  public insert(model, doc): Promise<any> {
    return this.ipcCall({
      operation: operations.insert,
      model: model,
      doc: doc
    });
  }

  public find(model, query): Promise<any> {
    return this.ipcCall({
      operation: operations.find,
      model: model,
      query: query
    });
  }

  public find_sort(model, query, sortBy): Promise<any> {
    return this.ipcCall({
      model: model,
      query: query,
      sortBy: sortBy,
      operation: operations.find_sort,
    })
  }

  public find_id(model, id): Promise<any> {
    return this.ipcCall({
      model: model,
      _id: id,
      operation: operations.find_id
    })
  }

  public find_one(model, query): Promise<any> {
    return this.ipcCall({
      model: model,
      query: query,
      operation: operations.find_one
    })
  }

  public count(model, query): Promise<any> {
    return this.ipcCall({
      operation: operations.count,
      model: model,
      query: query,
    })
  }

  public edit(model, query, newObj): Promise<any> {
    return this.ipcCall({
      model: model,
      operation: operations.update,
      query: query,
      newObj: newObj
    })
  }

  public remove(model, query): Promise<any> {
    return this.ipcCall({
      model: model,
      operation: operations.remove,
      query: query
    });
  }

  private ipcCall(opt: any): Promise<any> {
    const unq = this.reqCounter++;
    opt['unq'] = unq;
    this.electron.getIPCRenderer().send('db_calls', opt);
    return new Promise((resolve, reject) => {
      const s = this.db_returns.subscribe(data => {
        if (data['unq'] === unq) {
          resolve(data);
          s.unsubscribe();
        }
      })
    });
  }
}

export let operations = {
  insert: 1,
  find: 2.0,
  find_sort: 2.1,
  find_one: 2.2,
  find_id: 2.3,
  count: 4,
  update: 5,
  remove: 6
};

