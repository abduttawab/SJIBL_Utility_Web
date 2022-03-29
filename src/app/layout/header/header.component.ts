import { ApplicationRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MessageModComponent } from 'src/app/shared/message-mod/message-mod.component';
import { ActivityMonitorService } from 'src/app/shared/activity-monitor.service';
import { NgxSpinnerService } from "ngx-spinner";


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

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  popRef: MatDialogRef<MessageModComponent>;
  hasIdled = false;

  tokenExpires: any;

  status;

  constructor(private dialog: MatDialog,
    private idle: Idle,
     private keepalive: Keepalive,
    private router:Router,
     public service:UserService,
     private appRef: ApplicationRef,
     private amService: ActivityMonitorService,
     private spinner: NgxSpinnerService) {
    // Idel Check
    // sets an idle timeout of 5 min, for testing purposes.
    idle.setIdle(300);
    // sets a timeout period of/ 2 min. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(120);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);


// New 
idle.onIdleEnd.subscribe(() => {
  this.hasIdled = false;
  this.idleState = `No longer idle.`;
  this.status = { state: this.idleState, active: this.hasIdled };
  //console.log('Act-Mon', this.status.state);
  this.popRef.close();
  this.appRef.tick();
});

idle.onTimeout.subscribe(() => {
  this.idleState = `Timed out!`;
  this.timedOut = true;
  this.status = { state: this.idleState, active: false };
  this.amService.setStatus(this.status);
  this.onLogout();
});

idle.onIdleStart.subscribe(() =>  {
  this.popRef = this.dialog.open(MessageModComponent);
  this.hasIdled = true;
  this.idleState = `You've gone idle!`;
  this.tokenExpires = localStorage.getItem('expires_at');
  this.status = { state: this.idleState, active: this.hasIdled, expires: this.tokenExpires };
  // console.log(this.idleState);
  this.amService.setStatus(this.status);
});
idle.onTimeoutWarning.subscribe((countdown) => {
  this.idleState = `You will be logged out in ${countdown} seconds`;
  this.status = { state: this.idleState, active: this.hasIdled, expires: this.tokenExpires, countdown: countdown };
  // console.log(this.idleState);
  this.amService.setStatus(this.status);
});

keepalive.interval(30); // Executes every 30 minutes
keepalive.onPing.subscribe(() => {
  this.lastPing = new Date();
});
this.start();

//New End


//OLD


    // idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');

    // idle.onTimeout.subscribe(() => {
    //   this.idleState = 'Timed out!';
    //   this.timedOut = true;
    //   this.onLogout();
    // });
    // idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    // idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

    // // sets the ping interval to 15 seconds
    // keepalive.interval(15);

    // keepalive.onPing.subscribe(() => this.lastPing = new Date());

    // this.reset();



// //OLD Idel Check End



     }

     public start(): void {
      //console.log('started AM feature');
      this.idle.watch();
      this.idleState = 'Started.';
      this.timedOut = false;
      this.status = { state: this.idleState };
      this.amService.setStatus(this.status);
    }


     reset() {
      this.idle.watch();
      this.idleState = 'Session Started.';
      this.timedOut = false;
    }



  ngOnInit() {
    this.spinner.show();
    this.userRole = localStorage.getItem('role');
 
   this.userName= localStorage.getItem('userFullName');
   this.userRoles= localStorage.getItem('UserRoles');


  }
  onLogout(){
    
    localStorage.removeItem('token');

    this.router.navigate(['/user/login']);

  }


}
