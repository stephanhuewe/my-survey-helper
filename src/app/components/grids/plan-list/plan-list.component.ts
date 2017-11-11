import { Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModalSize, ModalTemplate, SuiModalService, TemplateModalConfig } from 'ng2-semantic-ui';
import { IContext } from '../../dialogs/IContext';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { DataService } from '../../../providers/data.service';
import { DISTRICT_MAP } from '../../../const/districts';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlanListComponent implements OnInit {
  @ViewChild('removeConfirm') public removeConfirmTemp: ModalTemplate<IContext, string, string>;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @Output() public editPlan: EventEmitter<any> = new EventEmitter();
  @Output() public viewCustomer: EventEmitter<any> = new EventEmitter();

  public districtMap = DISTRICT_MAP;

  rows = [];
  temp = [];
  editingSelect = {};

  columnsToSearch = [
    { name: 'All', val: 'all' },
    { name: 'Plan No', val: 'planNo' },
    { name: 'Land Name', val: 'landName' },
    { name: 'Village', val: 'village' },
    { name: 'District', val: 'district' },
  ];
  searchSelected = 'all';

  constructor(private dataService: DataService, private modalService: SuiModalService) {
    this.dataService.find('plans', {}).then(x => {
      this.rows = x.doc;
      this.temp = [...x.doc];
    })
  }

  ngOnInit() {
  }

  updated(obj?: any) {
    if (obj) {
      this.dataService.find('plans', { _id: obj }).then(data => {
        this.rows[this.rows.indexOf(this.editingSelect)] = data.doc[0];
      });
    } else {
      this.dataService.find('plans', {}).then(x => {
        this.rows = x.doc;
        this.temp = [...x.doc];
      })
    }
  }

  removeRow(obj: any) {
    const config = new TemplateModalConfig<IContext, string, string>(this.removeConfirmTemp);
    config.closeResult = 'closed!';
    config.size = ModalSize.Tiny;
    config.context = { data: 'You are going to delete plan <b>(' + obj['name'] + ')</b> details. This can not be undo.' };
    this.modalService
      .open(config)
      .onApprove(result => {
        console.log(result);
        this.dataService.remove('plans', { _id: obj._id }).then(doc => {
          if (doc['doc'] === 1) {
            const index1 = this.rows.indexOf(obj);
            const index2 = this.temp.indexOf(obj);
            if (index1 !== -1) {
              this.rows.splice(index1, 1);
            }
            if (index2 !== -1) {
              this.temp.splice(index2, 1);
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
        return ((d['planNo'] + '').toLowerCase().indexOf(val) !== -1 || !val) ||
          (d['location']['landName'].toLowerCase().indexOf(val) !== -1 || !val) ||
          (d['location']['village'].toLowerCase().indexOf(val) !== -1 || !val) ||
          (d['location']['district'].toLowerCase().indexOf(val) !== -1 || !val);
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
    return new Date(date);
  }
}
