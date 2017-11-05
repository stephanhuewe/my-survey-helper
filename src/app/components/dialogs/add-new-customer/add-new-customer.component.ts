import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ModalTemplate, SuiModalService, TemplateModalConfig, ModalSize } from 'ng2-semantic-ui'
import { DataService } from '../../../providers/data.service';
import { Customer } from '../../../providers/models/Customer';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validator, Validators } from '@angular/forms';
import { IContext } from '../IContext';
import { NGValidators } from 'ng-validators';

@Component({
  selector: 'app-add-new-customer',
  templateUrl: './add-new-customer.component.html',
  styleUrls: ['./add-new-customer.component.scss']
})
export class AddNewCustomerComponent {
  @ViewChild('modalTemplate')
  public modalTemplate: ModalTemplate<IContext, string, string>;

  @Output() private updateSuccess: EventEmitter<any> = new EventEmitter();

  public telMask = ['(', /[0]/, /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];

  public customerForm: FormGroup;

  private mode = 'add';
  private editingObj = null;

  constructor(public modalService: SuiModalService, private dataService: DataService, private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required]],
      tel: ['', [this.telephoneNumber]],
      address: [''],
      id: ['', this.isIDNumber]
    });
  }

  public open(obj?: any) {
    if (obj) {
      this.mode = 'edit';
      this.editingObj = obj;
      this.customerForm.get('name').setValue(obj['name']);
      this.customerForm.get('tel').setValue(obj['telephone']);
      this.customerForm.get('id').setValue(obj['idNumber']);
      this.customerForm.get('address').setValue(obj['address']);
    }
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

    config.closeResult = 'closed!';
    config.size = ModalSize.Small;
    config.context = { data: '' };

    this.modalService
      .open(config)
      .onApprove(result => {
        if (this.mode === 'add') {
          // show success result
          this.updateSuccess.emit();
        } else {
          // fire an event to the list
          this.updateSuccess.emit(this.editingObj['_id']);
        }
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
      if (this.mode === 'add') {
        return this.dataService.insert('customers', customer).then(x => {
          this.customerForm.reset();
          this.customerForm.markAsUntouched();
          return true;
        })
      } else {
        return this.dataService.edit('customers', { _id: this.editingObj['_id'] }, customer).then(x => {
          this.customerForm.reset();
          this.customerForm.markAsUntouched();
          return true;
        })
      }
    } else {
      return false;
    }
  }

  public showError() {
    console.log(this.customerForm);
  }

  private telephoneNumber(con: AbstractControl): ValidationErrors | null {
    try {
      if (con && con.value && con.value.indexOf('_') !== -1) {
        return { Incomplete: true };
      }
    } catch (e) {
    }
  }

  private isIDNumber(con: AbstractControl): ValidationErrors | null {
    try {
      if (con && con.value !== '' && !con.value.match(/^(\d\d)*(\d){9}(v)*$/)) {
        return { notId: true };
      }
    } catch (e) {
    }
  }
}
