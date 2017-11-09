import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalSize, ModalTemplate, SuiModalService, TemplateModalConfig } from 'ng2-semantic-ui';
import { IContext } from '../IContext';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DataService } from '../../../providers/data.service';
import { Plan } from '../../../providers/models/Plan';
import { DISTRICT_MAP } from '../../../const/districts';

@Component({
  selector: 'app-add-new-plan',
  templateUrl: './add-new-plan.component.html',
  styleUrls: ['./add-new-plan.component.scss']
})
export class AddNewPlanComponent {

  @ViewChild('modalTemplate')
  public modalTemplate: ModalTemplate<IContext, string, string>;
  @Output() private updateSuccess: EventEmitter<any> = new EventEmitter();

  public planForm: FormGroup;

  private mode = 'add';
  private editingObj = null;

  public districtMap = DISTRICT_MAP;
  public districtList = [];

  constructor(public modalService: SuiModalService, private dataService: DataService, private fb: FormBuilder) {
    this.planForm = this.fb.group({
      planNumber: ['', [Validators.required, this.validatorPositive]],
      doPlan: [''],
      doSurvey: [''],
      extentA: ['', this.validatorPositive],
      extentR: ['', this.validatorPositive],
      extentP: ['', this.validatorPositive],
      extentHa: ['', this.validatorPositive],
      landName: [''],
      village: [''],
      district: ['']
    });
    this.setDistrictList();
  }

  public open(obj ?: any) {
    if (obj) {
      this.mode = 'edit';
      this.editingObj = obj;
      this.planForm.get('planNumber').setValue(obj['planNo']);
      this.planForm.get('doPlan').setValue(obj['dateOfPlan']);
      this.planForm.get('doSurvey').setValue(obj['dateOfSurvey']);
      this.planForm.get('extentA').setValue(obj['extent'].A);
      this.planForm.get('extentR').setValue(obj['extent'].R);
      this.planForm.get('extentP').setValue(obj['extent'].P);
      this.planForm.get('extentHa').setValue(obj['extent'].Ha);
      this.planForm.get('landName').setValue(obj['location'].landName);
      this.planForm.get('village').setValue(obj['location'].village);
      this.planForm.get('district').setValue(obj['location'].district);
    }
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

    config.closeResult = 'closed!';
    config.size = ModalSize.Tiny;
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

  private savePlan() {
    this.planForm.markAsDirty();
    if (this.planForm.valid) {
      const plan: Plan = {
        planNo: this.planForm.get('planNumber').value,
        dateOfPlan: this.planForm.get('doPlan').value,
        dateOfSurvey: this.planForm.get('doSurvey').value,
        extent: {
          A: parseInt(this.planForm.get('extentA').value || '0', 10),
          R: parseInt(this.planForm.get('extentR').value || '0', 10),
          P: parseFloat(this.planForm.get('extentP').value || '0'),
          Ha: parseFloat(this.planForm.get('extentHa').value || '0'),
        },
        location: {
          district: this.planForm.get('district').value,
          landName: this.planForm.get('landName').value,
          village: this.planForm.get('village').value,
        },
      };
      if (this.mode === 'add') {
        return this.dataService.insert('plans', plan).then(x => {
          this.planForm.reset();
          this.planForm.markAsUntouched();
          return true;
        })
      } else {
        return this.dataService.edit('plans', { _id: this.editingObj['_id'] }, plan).then(x => {
          this.planForm.reset();
          this.planForm.markAsUntouched();
          return true;
        })
      }
    } else {
      return false;
    }
  }

  public showError() {
    // do nothing
  }

  private validatorPositive(con: AbstractControl): ValidationErrors | null {
    if (parseFloat(con.value) < 0) {
      return { negative: true };
    }
  }

  public setDistrictList() {
    const array = [];
    Object.keys(this.districtMap).forEach(val => {
      array.push({ val: val, name: this.districtMap[val] })
    });
    this.districtList = array;
  }

}

