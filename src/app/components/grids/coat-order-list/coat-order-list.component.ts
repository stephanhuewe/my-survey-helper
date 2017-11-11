import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalSize, ModalTemplate, SuiModalService, TemplateModalConfig } from 'ng2-semantic-ui';
import { IContext } from '../../dialogs/IContext';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { COATS } from '../../../const/coats';
import { DataService } from '../../../providers/data.service';
import {LoggerService} from "../../../providers/logger.service";

@Component({
  selector: 'app-coat-order-list',
  templateUrl: './coat-order-list.component.html',
  styleUrls: ['./coat-order-list.component.scss']
})
export class CoatOrderListComponent implements OnInit {
  @ViewChild('removeConfirm') public removeConfirmTemp: ModalTemplate<IContext, string, string>;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @Output() public editCoatOrder: EventEmitter<any> = new EventEmitter();

  public coats = COATS;

  rows = [];
  temp = [];
  editingSelect = {};

  columnsToSearch = [
    { name: 'All', val: 'all' },
    { name: 'Order Number', val: 'orderNumber' },
    { name: 'Type', val: 'surveyType' },
  ];
  searchSelected = 'all';

  constructor(private dataService: DataService, private modalService: SuiModalService, private ls: LoggerService) {
    this.ls.log('CoatOrderListComponent - constructor');
    this.dataService.find('coat_orders', {}).then(x => {
      this.rows = x.doc;
      this.temp = [...x.doc];
    })
  }

  ngOnInit() {
  }

  updated(obj?: any) {
    this.ls.log('CoatOrderListComponent - update ' + JSON.stringify(obj));
    if (obj) {
      this.dataService.find('coat_orders', { _id: obj }).then(data => {
        this.rows[this.rows.indexOf(this.editingSelect)] = data.doc[0];
      });
    } else {
      this.dataService.find('coat_orders', {}).then(x => {
        this.rows = x.doc;
        this.temp = [...x.doc];
      })
    }
  }

  removeRow(obj: any) {
    this.ls.log('CoatOrderListComponent - removeRow ' + JSON.stringify(obj));
    const config = new TemplateModalConfig<IContext, string, string>(this.removeConfirmTemp);
    config.closeResult = 'closed!';
    config.size = ModalSize.Tiny;
    config.context = { data: 'You are going to delete plan <b>(' + obj['orderNumber'] + '\'s)</b> details. This can not be undo.' };
    this.modalService
      .open(config)
      .onApprove(result => {
        this.ls.log('CoatOrderListComponent - remove approve ');
        this.dataService.remove('coat_orders', { _id: obj._id }).then(doc => {
          if (doc['doc'] === 1) {
            const index1 = this.rows.indexOf(obj);
            const index2 = this.temp.indexOf(obj);
            if (index1 !== -1) {
              this.rows.splice(index1, 1);
            }
            if (index2 !== -1) {
              this.temp.splice(index2, 1);
            }
            this.ls.log('CoatOrderListComponent - db remove success');
          }
        })
      });
  }

  updateFilter(event) {
    const val = event.value.toLowerCase();
    let localTemp;
    if (this.searchSelected === 'all') {
      localTemp = this.temp.filter((d) => {
        return ((d['orderNumber'] + '').toLowerCase().indexOf(val) !== -1 || !val) ||
          (d['surveyType'].toLowerCase().indexOf(val) !== -1 || !val);
      });
    } else {
      localTemp = this.temp.filter((d) => {
        return d[this.searchSelected].toLowerCase().indexOf(val) !== -1 || !val;
      });
    }

    // update the rows
    this.rows = localTemp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  public getDisplayDate(date) {
    if (date) {
      return new Date(date);
    }
    return '';
  }
}
