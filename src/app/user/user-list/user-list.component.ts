import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: []
})
export class UserListComponent implements OnInit {
  UserList: any[];
  UnAuthUserList: any[];
  constructor(
    public service : UserService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit() {
    this.spinner.show();
    this.getData();
    this.getUnAuthData();

    setTimeout(() => {
      /** spinner ends after 1 seconds */
      this.spinner.hide();
    }, 600);
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
  authorize(id) {
    if(confirm("Are you sure to authorize this user?")) {
    this.service.authorizeUser(id).subscribe(
      (res: any) => {
        
        if (res.isSuccessfull) {
          this.getData();
          this.getUnAuthData();
          this.toastr.warning('Data saved!', res.message);
        } else {
          this.toastr.error('Ops! Something went worng!', res.message);
        }
      },
      err => {
        console.log(err);

        this.toastr.error('Ops! Something went worng!', err.error.message);
      }
    );
    }
  }
  getData(){
    this.service.getAllUsers().subscribe(
      (res:any) =>{
        console.log(res);
        this.UserList=res.data;
      },
      err =>{
        console.log(err);
      }
    );
  }

  getUnAuthData(){
    this.service.getAllUnAuthUsers().subscribe(
      (res:any) =>{
        console.log(res.data);
        this.UnAuthUserList=res.data;
      },
      err =>{
        console.log(err);
      }
    );
  }

  edit(id){

    this.service.formModel.reset()
    const modalRef = this.modalService.open(UserFormComponent);
    modalRef.componentInstance.my_modal_title = 'Application User Update';
    modalRef.componentInstance.id = id;
 

    modalRef.result.then((result) => {
      if ( result === 'Close click' ) {
        this.getData(); // Refresh Data in table grid
      }
    }, (reason) => {
    });
  }

  delete(id: string) {
    if(confirm("Are you sure to delete this information?")) {
      this.service.deleteUser(id).subscribe(
        (res: any) => {
          

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

  inactive(id: string, isActive: boolean) {
    if(confirm("Are you sure to inactive/active this information?")) {
      this.service.inactiveUser(id,isActive).subscribe(
        (res: any) => {
          

          if (res.isSuccessfull) {
            this.getData();
            this.toastr.warning('Data updated!', 'Record successfully updated.');
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
  unlock(id: string){
    if(confirm("Are you sure to unlock this user?")) {
      this.service.unlock(id).subscribe(
        (res: any) => {
          

          if (res.isSuccessfull) {
            this.getData();
            this.toastr.warning('Data updated!', 'Record successfully updated.');
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
  removeClientIp(id: string) {
    if(confirm("Are you sure to Reset Client Ip for this user?")) {
      this.service.removeClientIp(id).subscribe(
        (res: any) => {
          

          if (res.isSuccessfull) {
            this.getData();
            this.toastr.info('Client Ip Reset Done!', 'Client Ip Reset Done!');
          } else {
            this.toastr.error('Ops! Something went worng!', res.message);
          }
        },
        err => {
          this.toastr.error('Ops! Something went worng!', "");
          console.log(err);
     
        }
      );
    }
  }

}
