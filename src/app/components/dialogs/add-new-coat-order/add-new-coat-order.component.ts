import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalSize, ModalTemplate, SuiModalService, TemplateModalConfig } from 'ng2-semantic-ui';
import { IContext } from '../IContext';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../providers/data.service';
import { Customer } from '../../../providers/models/Customer';
import { CoatOrder } from '../../../providers/models/CoatOrder';

@Component({
  selector: 'app-add-new-coat-order',
  templateUrl: './add-new-coat-order.component.html',
  styleUrls: ['./add-new-coat-order.component.scss']
})
export class AddNewCoatOrderComponent {

  @ViewChild('modalTemplate')
  public modalTemplate: ModalTemplate<IContext, string, string>;

  public telMask = ['(', /[0]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];

  public coatOrderForm: FormGroup;

  constructor(public modalService: SuiModalService, private dataService: DataService, private fb: FormBuilder) {
    this.coatOrderForm = this.fb.group({
      orderNumber: ['', Validators.required],
      orderNumberPrefix: [''],
      receivedDate: [''],
      surveyDate: [''],
      forwardDate: [''],
      noticeDate: [''],
      surveyType: [''],
      coat: [''],
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

  private saveCoatOrder() {
    this.coatOrderForm.markAsDirty();
    if (this.coatOrderForm.valid) {
      const coatOrder: CoatOrder = {
        coat: this.coatOrderForm.get('coat').value,
        orderNumber: this.coatOrderForm.get('orderNumber').value,
        orderNumberPrefix: this.coatOrderForm.get('orderNumberPrefix').value,
        receivedDate: this.coatOrderForm.get('receivedDate').value,
        surveyDate: this.coatOrderForm.get('surveyDate').value,
        forwardDate: this.coatOrderForm.get('forwardDate').value,
        surveyType: this.coatOrderForm.get('surveyType').value,
        noticeDate: this.coatOrderForm.get('noticeDate').value,
      };

      return this.dataService.insert('coat_orders', coatOrder).then(x => {
        console.log(x);
        this.coatOrderForm.reset();
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
