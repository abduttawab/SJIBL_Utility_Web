import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as ng2Charts from 'ng2-charts';
import { Label, SingleDataSet } from 'ng2-charts';
import { PaymentService } from '../shared/payment.service';

import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  dashboardVM;

  constructor(
    public service : PaymentService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
    this.spinner.show();
    this.getData();

    setTimeout(() => {
      /** spinner ends after 1 seconds */
      this.spinner.hide();
    }, 600);
    
  }
  getData(){
    this.service.getDashboardVM().subscribe(
      (res:any) =>{
        console.log(res.data);
        this.dashboardVM=res.data;
       

        // this.barChartLabels = res.data.barChartVM.label;
        // this.barChartData = res.data.barChartVM.barChartDataSets;

        // this.pieChartLabels =  res.data.pieChartVM.label;
        // this.pieChartData =  res.data.pieChartVM.data;
     
      },
      err =>{
        console.log(err);
      }
    );
  }
  // public barChartOptions: ChartOptions = {
  //   responsive: true,
  // };
  // public barChartLabels: ng2Charts.Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  // public barChartType: ChartType = 'bar';
  // public barChartLegend = true;
  // public barChartPlugins = [];

  // public barChartData: ChartDataSets[] = [
  //   { data: [0], label: 'Series A' }
  // ];


   // Pie
  //  public pieChartOptions: ChartOptions = {
  //   responsive: true,
  // };
  // public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  // public pieChartData: SingleDataSet = [300, 500, 100];
  // public pieChartType: ChartType = 'pie';
  // public pieChartLegend = true;
  // public pieChartPlugins = [];
}
