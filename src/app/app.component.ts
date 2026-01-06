import { Component } from '@angular/core';
import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "./ngb-date-fr-parser-formatter";

@Component({
  providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SJIBL_Utility_Web';

 
}
