import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { ActivityMonitorService } from '../activity-monitor.service';

@Component({
  selector: 'app-message-mod',
  templateUrl: './message-mod.component.html',
  styleUrls: ['./message-mod.component.css']
})
export class MessageModComponent implements OnInit, OnDestroy {

  status: any;
  getAMStatusSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<MessageModComponent>,
    private amService: ActivityMonitorService
  ) { }

  ngOnInit() {
    this.getAMStatusSubscription = this.amService.getAMData$.subscribe(status => {
      console.log('inside message', status);
      this.status = status;
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.getAMStatusSubscription.unsubscribe();
  }

}