import { Component, OnInit, ViewChild } from '@angular/core';
import { SuiModalService } from 'ng2-semantic-ui'
import { AddNewCustomerComponent } from '../dialogs/add-new-customer/add-new-customer.component';
import { AddNewPlanComponent } from '../dialogs/add-new-plan/add-new-plan.component';
import { AddNewCoatOrderComponent } from '../dialogs/add-new-coat-order/add-new-coat-order.component';
import { CustomerListComponent } from '../grids/customer-list/customer-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public tempData = {
    'active-div': 'dashboard'
  };
  @ViewChild('addNewCustomerForm') public addCustomerComponent: AddNewCustomerComponent;
  @ViewChild('addNewPlanForm') public addPlanComponent: AddNewPlanComponent;
  @ViewChild('addNewCoatOrderForm') public addNewCoatOrderForm: AddNewCoatOrderComponent;

  @ViewChild('customerList') public customerListComp: CustomerListComponent;

  constructor(private modalService: SuiModalService) {

  }

  public addCustomer(obj: any) {
    this.addCustomerComponent.open(obj);
  }

  public editCustomer(obj: any) {
    console.log('here fuckier');
  }

  public addPlan() {
    this.addPlanComponent.open();
  }

  public addCoatOrder() {
    this.addNewCoatOrderForm.open();
  }

  public updateSuccess(str: string, obj: any) {
    if (str === 'customer') {
      this.customerListComp.updated(obj);
    }
  }

}
