import {Component, OnInit, ViewChild} from "@angular/core";
import {ModalSize, ModalTemplate, SuiModalService, TemplateModalConfig} from "ng2-semantic-ui";
import {IContext} from "../../IContext";
import {DataService} from "../../../../providers/data.service";
import {DISTRICT_MAP} from "../../../../const/districts";
import {LoggerService} from "../../../../providers/logger.service";

@Component({
  selector: 'app-view-plan',
  templateUrl: './view-plan.component.html',
  styleUrls: ['./view-plan.component.scss']
})
export class ViewPlanComponent implements OnInit {
  @ViewChild('modalTemplate')
  public modalTemplate: ModalTemplate<IContext, string, string>;

  selectedPlan = {};
  districts = DISTRICT_MAP;

  constructor(private dataService: DataService, private modalService: SuiModalService, private ls: LoggerService) {
    this.ls.log('ViewPlanComponent - constructor');
  }

  open(id) {
    this.ls.log('ViewPlanComponent - open ' + JSON.stringify(id));
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);
    config.size = ModalSize.Tiny;
    if (typeof id === 'string') {
      this.dataService.find_id('plans', id).then(x => {
        this.selectedPlan = x.doc;
        this.modalService.open(config);
        if (this.selectedPlan['customer']) {
          this.dataService.find_id('customers', this.selectedPlan['customer']).then(y => {
            this.selectedPlan['customerName'] = y.doc.name;
          });
        }
        this.modalService.open(config);
      });
    } else {
      this.selectedPlan = id;
      if (this.selectedPlan['customer']) {
        this.dataService.find_id('customers', this.selectedPlan['customer']).then(y => {
          this.selectedPlan['customerName'] = y.doc.name;
        });
        this.modalService.open(config);
      }
    }
  }

  ngOnInit() {
  }

  public getDisplayDate(date) {
    return new Date(date);
  }
}
