import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styles: []
})
export class RoleFormComponent implements OnInit {
  Roles: any[];
  @Input() my_modal_title;

  @Input() id;
 
  constructor(
    public activeModal: NgbActiveModal,
     public service: UserService,
     private toastr: ToastrService) {}
 
  ngOnInit() {
    
    this.getData();
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.isSuccessfull) {
          this.toastr.warning('Data saved!', res.message);
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
    this.service.getRoles().subscribe(
      (res:any) =>{
        this.Roles=res.data;
      },
      err =>{
        console.log(err);
      }
    );
  }


}
