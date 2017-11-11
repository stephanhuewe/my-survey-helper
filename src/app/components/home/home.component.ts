import {Component, ViewChild} from '@angular/core';
import {SuiModalService} from 'ng2-semantic-ui';
import {AddNewCustomerComponent} from '../dialogs/add-new-customer/add-new-customer.component';
import {AddNewPlanComponent} from '../dialogs/add-new-plan/add-new-plan.component';
import {AddNewCoatOrderComponent} from '../dialogs/add-new-coat-order/add-new-coat-order.component';
import {CustomerListComponent} from '../grids/customer-list/customer-list.component';
import {PlanListComponent} from '../grids/plan-list/plan-list.component';
import {CoatOrderListComponent} from '../grids/coat-order-list/coat-order-list.component';
import {SecreteDebugComponent} from '../secrete-debug/secrete-debug.component';

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
  @ViewChild('planList') public planListComp: PlanListComponent;
  @ViewChild('coatOrderList') public coatOrderListComp: CoatOrderListComponent;

  @ViewChild('debug') public debug: SecreteDebugComponent;

  constructor(private modalService: SuiModalService) {

  }

  public addCustomer(obj: any) {
    this.addCustomerComponent.open(obj);
  }

  public addPlan(obj: any) {
    this.addPlanComponent.open(obj);
  }

  public addCoatOrder(obj: any) {
    this.addNewCoatOrderForm.open(obj);
  }

  public updateSuccess(str: string, obj: any) {
    if (str === 'customer' && this.customerListComp) {
      this.customerListComp.updated(obj);
    } else if (str === 'plan' && this.planListComp) {
      this.planListComp.updated(obj);
    } else if (str === 'coat' && this.coatOrderListComp) {
      this.coatOrderListComp.updated(obj);
    }
  }

}
