import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalTemplate, SuiModalService, TemplateModalConfig, ModalSize } from 'ng2-semantic-ui'
import { DataService } from '../../../providers/data.service';
import { Customer } from '../../../providers/models/Customer';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { IContext } from '../IContext';

@Component({
  selector: 'app-add-new-customer',
  templateUrl: './add-new-customer.component.html',
  styleUrls: ['./add-new-customer.component.scss']
})
export class AddNewCustomerComponent {
  @ViewChild('modalTemplate')
  public modalTemplate: ModalTemplate<IContext, string, string>;

  public telMask = ['(', /[0]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];

  public customerForm: FormGroup;

  constructor(public modalService: SuiModalService, private dataService: DataService, private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      tel: [''],
      address: [''],
      id: ['']
    });
  }

  public open() {
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

    config.closeResult = 'closed!';
    config.size = ModalSize.Small;
    config.context = { data: '' };

    this.modalService
      .open(config)
      .onApprove(result => {
        // this.saveCustomer();
        console.log(result);
      })
      .onDeny(result => {
        console.log('cancled');
      });
  }

  private saveCustomer() {
    this.customerForm.markAsDirty();
    if (this.customerForm.valid) {
      const customer: Customer = {
        address: this.customerForm.get('address').value,
        idNumber: this.customerForm.get('id').value,
        name: this.customerForm.get('name').value,
        telephone: this.customerForm.get('tel').value,
      };

      return this.dataService.insert('customers', customer).then(x => {
        console.log(x);
        this.customerForm.reset();
        return true;
      })
    } else {
      return false;
    }
  }

  public showError() {
    console.log('err');
  }
}
