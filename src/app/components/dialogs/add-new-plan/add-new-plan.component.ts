import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalSize, ModalTemplate, SuiModalService, TemplateModalConfig } from 'ng2-semantic-ui';
import { IContext } from '../IContext';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DataService } from '../../../providers/data.service';
import { Plan } from '../../../providers/models/Plan';

@Component({
  selector: 'app-add-new-plan',
  templateUrl: './add-new-plan.component.html',
  styleUrls: ['./add-new-plan.component.scss']
})
export class AddNewPlanComponent {

  @ViewChild('modalTemplate')
  public modalTemplate: ModalTemplate<IContext, string, string>;

  public planForm: FormGroup;

  public districtList = [
    { val: 'amp', name: 'Ampara' },
    { val: 'anu', name: 'Anuradhapura' },
    { val: 'bad', name: 'Badulla' },
    { val: 'bat', name: 'Batticaloa' },
    { val: 'col', name: 'Colombo' },
    { val: 'gal', name: 'Galle' },
    { val: 'gam', name: 'Gampaha' },
    { val: 'ham', name: 'Hambantota' },
    { val: 'jaf', name: 'Jaffna' },
    { val: 'kal', name: 'Kalutara' },
    { val: 'kan', name: 'Kandy' },
    { val: 'keg', name: 'Kegalle' },
    { val: 'kil', name: 'Kilinochchi' },
    { val: 'krg', name: 'Kurunegala' },
    { val: 'man', name: 'Mannar' },
    { val: 'mtl', name: 'Matale' },
    { val: 'mtr', name: 'Matara' },
    { val: 'mon', name: 'Moneragala' },
    { val: 'mul', name: 'Mullaitivu' },
    { val: 'nwe', name: 'Nuwara Eliya' },
    { val: 'pol', name: 'Polonnaruwa' },
    { val: 'put', name: 'Puttalam' },
    { val: 'rat', name: 'Ratnapura' },
    { val: 'tri', name: 'Trincomalee' },
    { val: 'vav', name: 'Vavuniya' },
  ];

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
  }

  public open() {
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

    config.closeResult = 'closed!';
    config.size = ModalSize.Tiny;
    config.context = { data: '' };

    this.modalService
      .open(config)
      .onApprove(result => {

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
      return this.dataService.insert('plans', plan).then(x => {
        console.log(x);
        this.planForm.reset();
        return true;
      })
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

}

