import { Component, OnInit } from '@angular/core';
import { CardapplicationService } from '../shared/cardapplication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  dashboardVM;
  constructor(public service : CardapplicationService) { }

  ngOnInit() {
    this.getData();
  }
  getData(){
    this.service.getDashboardVM().subscribe(
      (res:any) =>{
        console.log(res);
        this.dashboardVM=res.data;
      },
      err =>{
        console.log(err);
      }
    );
  }

}
