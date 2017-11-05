import { Component, OnInit, Output, TemplateRef, ViewChild, EventEmitter } from '@angular/core';
import { DataService } from '../../../providers/data.service';
import { ModalSize, ModalTemplate, SuiModalService, TemplateModalConfig } from 'ng2-semantic-ui';
import { IContext } from '../../dialogs/IContext';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  @ViewChild('removeConfirm')
  public removeConfirmTemp: ModalTemplate<IContext, string, string>;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  @Output() public editCustomer: EventEmitter<any> = new EventEmitter();

  rows = [];
  temp = [];
  editingSelect = {};

  columnsToSearch = [
    { name: 'All', val: 'all' },
    { name: 'Name', val: 'name' },
    { name: 'Address', val: 'address' },
    { name: 'ID', val: 'idNumber' },
    { name: 'Tel', val: 'telephone' },
  ];
  searchSelected = 'all';

  constructor(private dataService: DataService, private modalService: SuiModalService) {
    this.dataService.find('customers', {}).then(x => {
      this.rows = x.doc;
      this.temp = [...x.doc];
    })
  }

  ngOnInit() {
  }

  updated(obj?: any) {
    if (obj) {
      this.dataService.find('customers', { _id: obj }).then(data => {
        this.rows[this.rows.indexOf(this.editingSelect)] = data.doc[0];
      });
    } else {
      this.dataService.find('customers', {}).then(x => {
        this.rows = x.doc;
        this.temp = [...x.doc];
      })
    }
  }

  removeRow(obj: any) {
    const config = new TemplateModalConfig<IContext, string, string>(this.removeConfirmTemp);
    config.closeResult = 'closed!';
    config.size = ModalSize.Tiny;
    config.context = { data: 'You are going to delete customer <b>(' + obj['name'] + '\'s)</b> details. This can not be undo.' };
    this.modalService
      .open(config)
      .onApprove(result => {
        console.log(result);
        this.dataService.remove('customers', { _id: obj._id }).then(doc => {
          if (doc['doc'] === 1) {
            const index = this.rows.indexOf(obj);
            if (index !== -1) {
              this.rows.splice(index, 1);
            }
          }
        })
      });
  }

  updateFilter(event) {
    const val = event.value.toLowerCase();
    let localTemp;
    if (this.searchSelected === 'all') {
      localTemp = this.temp.filter((d) => {
        return (d['name'].toLowerCase().indexOf(val) !== -1 || !val) ||
          (d['address'].toLowerCase().indexOf(val) !== -1 || !val) ||
          (d['telephone'].toLowerCase().indexOf(val) !== -1 || !val) ||
          (d['idNumber'].toLowerCase().indexOf(val) !== -1 || !val);
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
}
