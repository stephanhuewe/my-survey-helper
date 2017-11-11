import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import {LoggerService} from "./providers/logger.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public electronService: ElectronService, private logger: LoggerService) {
    logger.log('AppComponent - constructor');
    if (electronService.isElectron()) {
      logger.log('Mode electron');
      // Check if electron is correctly injected (see externals in webpack.config.js)
      logger.log('c ' + JSON.stringify(electronService.ipcRenderer));
      // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
      // console.log('c', electronService.childProcess);
    } else {
      logger.log('web');
      console.log('Mode web');
    }
  }
}
