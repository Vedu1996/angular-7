import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';

import { AppConstants } from '../../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  config;
  targetStorage;

  constructor() {
    this.config = AppConstants.STORAGE_CONFIG;
    this.targetStorage = this.config.TARGET_STORAGE;
  }

  setItem(key: any, val: any, storage = this.targetStorage) {
    val = btoa(val);
    storage.setItem(key, val);
  }

  setObject(key: any, data: any, storage = this.targetStorage) {
    if (!isNullOrUndefined(data)) {
      let obj = JSON.stringify(data);
      obj = btoa(obj);
      storage.setItem(key, obj);
    }
  }

  getItem(key: any, storage = this.targetStorage) {
    if (!isNullOrUndefined(storage.getItem(key))) {
      return atob(storage.getItem(key));
    }
    return null;
  }

  getObject(key: any, storage = this.targetStorage) {
    if (!isNullOrUndefined(storage.getItem(key))) {
      const obj = atob(storage.getItem(key));
      return JSON.parse(obj);
    }
    return null;
  }

  removeItem(key: any, storage = this.targetStorage) {
    storage.removeItem(key);
  }

  clear(storage = this.targetStorage) {
    storage.clear();
  }

  setObjectWithKeys(data: object, storage = this.targetStorage) {
    Object.keys(data).forEach((key) => {
      if ( typeof data[key] === 'object') {
        this.setObject(key, data[key], storage);
      } else {
        this.setItem(key, data[key], storage);
      }
    });
  }

}
