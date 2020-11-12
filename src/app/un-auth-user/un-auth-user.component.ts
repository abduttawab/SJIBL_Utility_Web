import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/user.service';
import { UserFormComponent } from '../user/user-form/user-form.component';

@Component({
  selector: 'app-un-auth-user',
  templateUrl: './un-auth-user.component.html',
  styleUrls: ['./un-auth-user.component.css']
})
export class UnAuthUserComponent implements OnInit {
  UserList: any[];
  constructor(
    public service : UserService,
    private modalService: NgbModal,
    private toastr: ToastrService

  ) { }

  ngOnInit() {
    this.getData();
  }

  newEntry(){
    this.service.formModel.reset()
    const modalRef = this.modalService.open(UserFormComponent);
    modalRef.componentInstance.my_modal_title = 'Application User Entry';
 

    modalRef.result.then((result) => {
      if ( result === 'Close click' ) {
        this.getData(); // Refresh Data in table grid
      }
    }, (reason) => {
    });
  }

  getData(){
    this.service.getAllUnAuthUsers().subscribe(
      (res:any) =>{
        console.log(res);
        this.UserList=res.data;
      },
      err =>{
        console.log(err);
      }
    );
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
