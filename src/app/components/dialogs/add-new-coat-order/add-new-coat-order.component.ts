import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalSize, ModalTemplate, SuiModalService, TemplateModalConfig } from 'ng2-semantic-ui';
import { IContext } from '../IContext';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../providers/data.service';
import { CoatOrder } from '../../../providers/models/CoatOrder';
import { COATS } from '../../../const/coats';

@Component({
  selector: 'app-add-new-coat-order',
  templateUrl: './add-new-coat-order.component.html',
  styleUrls: ['./add-new-coat-order.component.scss']
})
export class AddNewCoatOrderComponent {

  @ViewChild('modalTemplate')
  public modalTemplate: ModalTemplate<IContext, string, string>;
  @Output() private updateSuccess: EventEmitter<any> = new EventEmitter();
  private mode = 'add';
  private editingObj = null;

  public telMask = ['(', /[0]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];

  public coatOrderForm: FormGroup;

  public coats = COATS;

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

  public open(obj ?: any) {
    if (obj) {
      this.mode = 'edit';
      this.editingObj = obj;
      this.coatOrderForm.get('coat').setValue(obj['coat']);
      this.coatOrderForm.get('orderNumber').setValue(obj['orderNumber']);
      this.coatOrderForm.get('orderNumberPrefix').setValue(obj['orderNumberPrefix']);
      this.coatOrderForm.get('receivedDate').setValue(obj['receivedDate']);
      this.coatOrderForm.get('surveyDate').setValue(obj['surveyDate']);
      this.coatOrderForm.get('forwardDate').setValue(obj['forwardDate']);
      this.coatOrderForm.get('noticeDate').setValue(obj['noticeDate']);
      this.coatOrderForm.get('surveyType').setValue(obj['surveyType']);
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

      if (this.mode === 'add') {
        return this.dataService.insert('coat_orders', coatOrder).then(x => {
          this.coatOrderForm.reset();
          this.coatOrderForm.markAsUntouched();
          return true;
        })
      } else {
        return this.dataService.edit('coat_orders', {_id : this.editingObj['_id']}, coatOrder).then(x => {
          this.coatOrderForm.reset();
          this.coatOrderForm.markAsUntouched();
          return true;
        })
      }
    } else {
      return false;
    }
  }

  public showError() {
    console.log('err');
  }

  public getKeys(obj) {
    return Object.keys(obj);
  }
}
