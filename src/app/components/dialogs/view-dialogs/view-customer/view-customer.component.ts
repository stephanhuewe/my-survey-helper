import {Component, OnInit, ViewChild} from "@angular/core";
import {DataService} from "../../../../providers/data.service";
import {IContext} from "../../IContext";
import {ModalSize, ModalTemplate, SuiModalService, TemplateModalConfig} from "ng2-semantic-ui";
import {LoggerService} from "../../../../providers/logger.service";

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})
export class ViewCustomerComponent implements OnInit {
  @ViewChild('modalTemplate')
  public modalTemplate: ModalTemplate<IContext, string, string>;

  selectedCustomer = {};

  constructor(private dataService: DataService, private modalService: SuiModalService, private lS: LoggerService) {
    this.lS.log('ViewCustomerComponent - constructor');
  }

  open(id) {
    this.lS.log('ViewCustomerComponent - open - ' + JSON.stringify(id));
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);
    config.size = ModalSize.Tiny;
    if (typeof id === 'string') {
      this.dataService.find_id('customers', id).then(x => {
        this.selectedCustomer = x.doc;
        this.modalService.open(config)
      });
    } else {
      this.selectedCustomer = id;
    }
  }

  ngOnInit() {
  }

}
