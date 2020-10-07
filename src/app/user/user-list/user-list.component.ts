import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: []
})
export class UserListComponent implements OnInit {
  UserList: any[];
  constructor(
    public service : UserService,
    private modalService: NgbModal

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

}
