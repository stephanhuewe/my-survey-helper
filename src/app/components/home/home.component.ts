import { Component, OnInit } from '@angular/core';
import { DataService } from '../../providers/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = `App works !`;

  constructor(private ds: DataService) {
  }

  ngOnInit() {
  }

  test() {
    this.ds.insert('plans', {
      fuck: 'me',
      tamasha: 'tits'
    }).then(x => {
      console.log(x);
    })
  }

}
