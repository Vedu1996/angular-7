import { Injectable } from '@angular/core';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { AppConstants } from '../../constants/app.constants';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  config;

  constructor(private toastyConfig: ToastyConfig,
              private toastyService: ToastyService) {
    this.config = AppConstants.TOAST_CONFIG;
    this.toastyConfig.theme = this.config.THEME;
    /*for toast theme*/
    this.toastyConfig.position = this.config.POSITION;
    /*for toast position*/
  }

  addToast(type = null, title = null, message = null) {
    /*this will prompt the message depending on its type whether with the theme and position in constructor*/
    this.toastyService.clearAll();
    const toastOptions: ToastOptions = <ToastOptions>{
      limit: 1,
      title: title ? '' : '',
      msg: message ? message : '',
      showClose: true,
      timeout: this.config.TIMEOUT,
      onAdd: (toast: ToastData) => {
      },
      onRemove: function (toast: ToastData) {
      }
    };
    type = type ? type : '';
    switch (type) {
      case 'default':
        this.toastyService.default(toastOptions);
        break;
      case 'info':
        this.toastyService.info(toastOptions);
        break;
      case 'success':
        this.toastyService.success(toastOptions);
        break;
      case 'wait':
        this.toastyService.wait(toastOptions);
        break;
      case 'error':
        this.toastyService.error(toastOptions);
        break;
      case 'warning':
        this.toastyService.warning(toastOptions);
        break;
    }
  }

  clear() {
    this.toastyService.clearAll();
  }
}
