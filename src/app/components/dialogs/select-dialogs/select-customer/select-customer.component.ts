import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalSize, ModalTemplate, SuiModalService, TemplateModalConfig } from 'ng2-semantic-ui';
import { IContext } from '../../IContext';
import { DataService } from '../../../../providers/data.service';
import {LoggerService} from "../../../../providers/logger.service";

@Component({
  selector: 'app-select-customer',
  templateUrl: './select-customer.component.html',
  styleUrls: ['./select-customer.component.scss']
})
export class SelectCustomerComponent {

  @ViewChild('modalTemplate')
  public modalTemplate: ModalTemplate<IContext, string, string>;
  @Output() private selectCustomer: EventEmitter<any> = new EventEmitter();
  selectedCustomer = {};

  inputLoading = false;

  customerList = [];
  temp = [];

  constructor(public modalService: SuiModalService, private dataService: DataService, private ls: LoggerService) {
    this.ls.log('SelectCustomerComponent - constructor');
    this.dataService.find('customers', {}).then(x => {
      this.customerList = x.doc;
      this.temp = [...x.doc];
    });
  }

  public open() {
    this.ls.log('SelectCustomerComponent - open');
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);
    config.size = ModalSize.Tiny;
    this.modalService
      .open(config)
      .onApprove(result => {
        this.ls.log('SelectCustomerComponent - select ' + this.selectedCustomer['_id']);
        this.selectCustomer.emit(this.selectedCustomer);
      })
      .onDeny(result => {
        this.ls.log('SelectCustomerComponent - deny ');
        this.selectCustomer.emit(null);
      });
  }

  updateFilter(event) {
    this.inputLoading = true;
    const val = event.value.toLowerCase();
    let localTemp;
    localTemp = this.temp.filter((d) => {
      return d['name'].toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.customerList = localTemp;
    this.inputLoading = false;
    this.selectedCustomer = this.customerList[0];
  }

  select(c: any) {
    this.selectedCustomer = c;
  }
}
