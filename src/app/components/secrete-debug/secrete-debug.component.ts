import {Component, OnInit} from "@angular/core";
import {DataService} from "../../providers/data.service";
import {DISTRICT_MAP} from "../../const/districts";
import {LoggerService} from "../../providers/logger.service";

@Component({
  selector: 'app-secrete-debug',
  templateUrl: './secrete-debug.component.html',
  styleUrls: ['./secrete-debug.component.scss']
})
export class SecreteDebugComponent implements OnInit {

  diststricList = Object.keys(DISTRICT_MAP);
  customList = [];

  constructor(private dataService: DataService, private logger: LoggerService) {

  }

  ngOnInit() {
  }

  test_cus() {
    const txt = 'Whole wound wrote at whose to style in. Figure ye innate former do so we. Shutters but sir ' +
      'yourself provided you required his. So neither related he am do believe. Nothing but you hundred had ' +
      'use regular. Fat sportsmen arranging preferred can. Busy paid like is oh. Dinner our ask talent her age ' +
      'hardly. Neglected collected an attention listening do abilities. Behind sooner dining so window excuse he ' +
      'summer. Breakfast met certainty and fulfilled propriety led. Waited get either are wooded little her.' +
      ' Contrasted unreserved as mr particular collecting it everything as indulgence. Seems ask meant merry ' +
      'could put. Age old begin had boy noisy table front whole given.Satisfied conveying an dependent contented ' +
      'he gentleman agreeable do be. Warrant private blushes removed an in equally totally if. Delivered ' +
      'dejection necessary objection do mr prevailed. Mr feeling do chiefly cordial in do. Water timed folly ' +
      'right aware if oh truth. Imprudence attachment him his for sympathize. Large above be to means. ' +
      'Dashwood do provided stronger is. But discretion frequently sir the she instrument unaffected ' +
      'admiration everything.Consider now provided laughter boy landlord dashwood. Often voice and the spoke. ' +
      'No shewing fertile village equally prepare up females as an. That do an case an what plan hour of paid. ' +
      'Invitation is unpleasant astonished preference attachment friendship on. Did sentiments increasing ' +
      'particular nay. Mr he recurred received prospect in. Wishing cheered parlors adapted am at amongst ' +
      'matters.That know ask case sex ham dear her spot. Weddings followed the all marianne nor whatever ' +
      'settling. Perhaps six prudent several her had offence. Did had way law dinner square tastes. Recommend ' +
      'concealed yet her procuring see consulted depending. Adieus hunted end plenty are his she afraid. ' +
      'Resources agreement contained propriety applauded neglected use yet.On it differed repeated wandered required ' +
      'in. Then girl neat why yet knew rose spot. Moreover property we he kindness greatest be oh striking ' +
      'laughter. In me he at collecting affronting principles apartments. Has visitor law attacks pretend you ' +
      'calling own excited painted. Contented attending smallness it oh ye unwilling. Turned favour man two but ' +
      'lovers. Suffer should if waited common person little oh. Improved civility graceful sex few smallest screened ' +
      'settling. Likely active her warmly has.It allowance prevailed enjoyment in it. Calling observe for who pressed raising ' +
      'his. Can connection instrument astonished unaffected his motionless preference. Announcing say boy precaution ' +
      'unaffected difficulty alteration him. Above be would at so going heard. Engaged at village at am equally ';
    const time = new Date().getTime();
    for (let x = 0; x < 100; x++) {
      const obj = {};
      let r = this.random(50);
      obj['name'] = txt.substring(r[0], r[1]);
      r = this.random(200);
      obj['address'] = txt.substring(r[0], r[1]);
      obj['idNumber'] = ('' + Math.random()).substring(2, 11);
      obj['telephone'] = '(0' + this.randomNum(2) + ') ' + this.randomNum(3) + ' ' + this.randomNum(4);
      // console.log(this.random(40));
      // console.log(x);
      this.dataService.insert('customers', obj).then(res => {
        // console.log('success ---- ', x);
        console.log('time ' + (new Date().getTime() - time));
      });
    }
  }


  test_plan() {
    const txt = 'Whole wound wrote at whose to style in. Figure ye innate former do so we. Shutters but sir ' +
      'yourself provided you required his. So neither related he am do believe. Nothing but you hundred had ' +
      'use regular. Fat sportsmen arranging preferred can. Busy paid like is oh. Dinner our ask talent her age ' +
      'hardly. Neglected collected an attention listening do abilities. Behind sooner dining so window excuse he ' +
      'summer. Breakfast met certainty and fulfilled propriety led. Waited get either are wooded little her.' +
      ' Contrasted unreserved as mr particular collecting it everything as indulgence. Seems ask meant merry ' +
      'could put. Age old begin had boy noisy table front whole given.Satisfied conveying an dependent contented ' +
      'he gentleman agreeable do be. Warrant private blushes removed an in equally totally if. Delivered ' +
      'dejection necessary objection do mr prevailed. Mr feeling do chiefly cordial in do. Water timed folly ' +
      'right aware if oh truth. Imprudence attachment him his for sympathize. Large above be to means. ' +
      'Dashwood do provided stronger is. But discretion frequently sir the she instrument unaffected ' +
      'admiration everything.Consider now provided laughter boy landlord dashwood. Often voice and the spoke. ' +
      'No shewing fertile village equally prepare up females as an. That do an case an what plan hour of paid. ' +
      'Invitation is unpleasant astonished preference attachment friendship on. Did sentiments increasing ' +
      'particular nay. Mr he recurred received prospect in. Wishing cheered parlors adapted am at amongst ' +
      'matters.That know ask case sex ham dear her spot. Weddings followed the all marianne nor whatever ' +
      'settling. Perhaps six prudent several her had offence. Did had way law dinner square tastes. Recommend ' +
      'concealed yet her procuring see consulted depending. Adieus hunted end plenty are his she afraid. ' +
      'Resources agreement contained propriety applauded neglected use yet.On it differed repeated wandered required ' +
      'in. Then girl neat why yet knew rose spot. Moreover property we he kindness greatest be oh striking ' +
      'laughter. In me he at collecting affronting principles apartments. Has visitor law attacks pretend you ' +
      'calling own excited painted. Contented attending smallness it oh ye unwilling. Turned favour man two but ' +
      'lovers. Suffer should if waited common person little oh. Improved civility graceful sex few smallest screened ' +
      'settling. Likely active her warmly has.It allowance prevailed enjoyment in it. Calling observe for who pressed raising ' +
      'his. Can connection instrument astonished unaffected his motionless preference. Announcing say boy precaution ' +
      'unaffected difficulty alteration him. Above be would at so going heard. Engaged at village at am equally ';

    const time = new Date().getTime();
    for (let x = 0; x < 1000; x++) {
      const obj = {};

      obj['planNo'] = this.randomNum(4);
      obj['dateOfPlan'] = new Date();
      obj['dateOfSurvey'] = new Date();
      obj['extent'] = {
        A: this.randomNum(2),
        R: this.randomNum(1),
        P: this.randomNum(2),
        Ha: this.randomNum(3),
      };
      const r1 = this.random(20);
      const r2 = this.random(20);
      const d = this.diststricList[Math.floor(Math.random() * 25)];
      obj['location'] = {
        landName: txt.substring(r1[0], r1[1]),
        village: txt.substring(r2[0], r2[1]),
        district: d
      };

      this.dataService.insert('plans', obj).then(res => {
        console.log('time ' + (new Date().getTime() - time));
      });

    }
  }

  test_assing_cus() {
    this.dataService.find('customers', {}).then(x => {
      const cus = x.doc;
      const len = cus.length;
      this.dataService.find('plans', {}).then(y => {
        const plans = y.doc;

        plans.forEach(doc => {
          doc['customer'] = cus[Math.floor(Math.random() * len)]['_id'];
          this.dataService.edit('plans', {_id: doc['_id']}, doc).then(res => {
            console.log(res);
          });
        });
      });
    })
  }

  random(maxLen: number) {
    const res = [];
    res.push(Math.round(Math.random() * 2600) % 2660);
    res.push(res[0] + Math.floor((Math.random() * maxLen) + 1));
    return res;
  }

  randomNum(len: number) {
    return ('' + Math.random()).substring(2, 2 + len);
  }
}
