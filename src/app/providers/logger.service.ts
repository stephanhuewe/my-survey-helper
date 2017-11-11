import {Injectable} from "@angular/core";
import {ElectronService} from "./electron.service";

@Injectable()
export class LoggerService {

  constructor(private eleService: ElectronService) {
  }

  public log(msg: string) {
    this.eleService.getIPCRenderer().send('log_calls', {msg: msg});
  }
}
