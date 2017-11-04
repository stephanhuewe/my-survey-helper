import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../providers/data.service';
import { SuiModalService } from 'ng2-semantic-ui'
import { AddNewCustomerComponent } from '../dialogs/add-new-customer/add-new-customer.component';
import { AddNewPlanComponent } from '../dialogs/add-new-plan/add-new-plan.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public tempData = {};
  @ViewChild('addNewCustomerForm') private addCustomerComponent: AddNewCustomerComponent;
  @ViewChild('addNewPlanForm') private addPlanComponent: AddNewPlanComponent;

  constructor(private modalService: SuiModalService) {

  }

  public addCustomer() {
    this.addCustomerComponent.open();
  }

  public addPlan() {
    this.addPlanComponent.open();
  }

}
