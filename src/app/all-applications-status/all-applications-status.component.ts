import { Component, OnInit } from '@angular/core';
import { CardapplicationService } from '../shared/cardapplication.service';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-applications-status',
  templateUrl: './all-applications-status.component.html',
  styles: []
})
export class AllApplicationsStatusComponent implements OnInit {

  NewApplications: any[];
  AllApplications= [];
  Districts = [];
  BranchList = [];
  SourceByList = [];
  SalesAgentList = [];
  // Our future instance of DataTable
  dataTable: any;
  constructor(
    public service: CardapplicationService,
    private commonService: CommonService,
    private toastr: ToastrService
  ) { }

  async ngOnInit() {
    this.service.formModel.reset();

    this.service.formModel.controls['SourceChannel'].setValue("");
    this.service.formModel.controls['SourcedBy'].setValue("");
    this.BranchList = await this.getBranchList();
    this.getData();
    
         // Get Branch list
       
        

  }
  async  getBranchList() : Promise<any>{

    return new Promise((resolve, reject) => {
      this.commonService.getbranchList().subscribe(
        (res: any) => {
          resolve(res.data);
        },
        err => {
          console.log(err);
          reject(err);
        }
      );
    })
   
  }
  print(){
    var printContents = document.getElementById('printArea').innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();

    document.body.innerHTML = originalContents;
  }
  onSearch() {
    this.AllApplications =  [];
    this.service.search(null).subscribe(
      (res: any) => {
       
        this.NewApplications = res.data;
        
        
        var groups = new Set(res.data.map(item => item.fileNo + " - " + item.companyName+ " (" + item.companyId+")"));
 
        groups.forEach(g =>
          this.AllApplications.push({
            
            name: g,
            id: res.data.filter(i => i.fileNo + " - " + i.companyName+ " (" + i.companyId+")" === g)[0].id,
            applicationTrackingHistoryId: res.data.filter(i => i.fileNo + " - " + i.companyName+ " (" + i.companyId+")" === g)[0].applicationTrackingHistoryId,
            values: res.data.filter(i => i.fileNo + " - " + i.companyName+ " (" + i.companyId+")" === g)
          }
          ))

          
      },
      err => {
        console.log(err);

      }
    );
  }
  getData() {

    this.AllApplications =  [];
    this.service.getApplicationsWithStatusId("").subscribe(
      (res: any) => {

        this.NewApplications = null;
        this.NewApplications = res.data;
        var groups = new Set(res.data.map(item => item.fileNo + " - " + item.companyName+ " (" + item.companyId+")"));
 
        groups.forEach(g =>
          this.AllApplications.push({
            
            name: g,
            id: res.data.filter(i => i.fileNo + " - " + i.companyName+ " (" + i.companyId+")" === g)[0].id,
            applicationTrackingHistoryId: res.data.filter(i => i.fileNo + " - " + i.companyName+ " (" + i.companyId+")" === g)[0].applicationTrackingHistoryId,
            values: res.data.filter(i => i.fileNo + " - " + i.companyName+ " (" + i.companyId+")" === g)
          }
          ))

      },
      err => {
        console.log(err);
      }
    );
  }
  delete(id: string) {
    if (confirm("Are you sure to delete this information?")) {
      this.service.delete(id).subscribe(
        (res: any) => {
          console.log(res);

          if (res.isSuccessfull) {
            this.getData();
            this.toastr.warning('Data deleted!', 'Record successfully deleted.');
          } else {
            this.toastr.error('Ops! Something went worng!', res.message);
          }
        },
        err => {
          console.log(err);

        }
      );
    }
  }

  changeStage(id: string) {
    if (confirm("Are you sure to sent this file to CPV?")) {
      this.service.changeStage(id, 4).subscribe(
        (res: any) => {
          console.log(res);

          if (res.isSuccessfull) {
            this.getData();
            this.toastr.warning('Data Send!', 'Record successfully Send.');
          } else {
            this.toastr.error('Ops! Something went worng!', res.message);
          }
        },
        err => {
          console.log(err);

        }
      );
    }
  }

  receiveDocument(id: string) {
    if (confirm("Are you sure to receive this file?")) {
      this.service.receiveDocument(id).subscribe(
        (res: any) => {
          console.log(res);

          if (res.isSuccessfull) {
            this.getData();
            this.toastr.warning('Data Received!', 'Successfully Received the file.');
          } else {
            this.toastr.error('Ops! Something went worng!', res.message);
          }
        },
        err => {
          console.log(err);

        }
      );
    }
  }

  sourceChannelOnChange() {
    if (this.service.formModel.controls['SourceChannel'].value == "Branch") {
      this.SourceByList = this.BranchList;
    } else {
      this.SourceByList = this.SalesAgentList;
    }
  }

}

