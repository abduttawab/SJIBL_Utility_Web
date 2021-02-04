import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  userDetails;
  userRole;
  userRoles;
  userName;
  constructor(private router:Router, private service:UserService) { }

  ngOnInit() {
    this.userRole = localStorage.getItem('role');
    this.userRoles = localStorage.getItem('UserRoles');
   this.userName= localStorage.getItem('userFullName');
  }
  onLogout(){
    
    localStorage.removeItem('token');

    this.router.navigate(['/user/login']);

  }


}
