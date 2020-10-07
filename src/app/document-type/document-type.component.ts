import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DocumentTypeService } from '../shared/document-type.service';

@Component({
  selector: 'app-document-type',
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.css']
})
export class DocumentTypeComponent implements OnInit {
  lists:any[];
  constructor(
    public service : DocumentTypeService,
    public toastr: ToastrService

  ) { }

  ngOnInit() {
    this.getData();
  }
  onSubmit(){
    this.service.saveOrUpdate().subscribe(
      (res: any) => {
        console.log(res);

        if (res.isSuccessfull) {
          this.toastr.success('Status saved!', 'Record successfully saved.');
          this.service.formModel.reset();
          this.getData();
        } else {
          this.toastr.error('Ops! Something went worng!', res.message);
        }
      },
      err => {
        console.log(err);
   
      }
    );
  }
  getData(){
    this.service.getAll().subscribe(
      (res:any) =>{
        console.log(res);
        this.lists=res.data;
      },
      err =>{
        console.log(err);
      }
    );
  }
  edit(obj: any) {

    this.service.formModel.controls['Id'].setValue(obj.id);
    this.service.formModel.controls['Name'].setValue(obj.name);
    this.service.formModel.controls['Details'].setValue(obj.details);
    this.service.formModel.controls['IsMandatory'].setValue(obj.isMandatory);
  }
    delete(id: string) {
      if(confirm("Are you sure to delete this information?")) {
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

}
