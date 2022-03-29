import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityMonitorService {

  subjectAMService: Subject<any> = new Subject<any>();
  getAMData$ = this.subjectAMService.asObservable();

  constructor() { }

  setStatus(status: any) {
    console.log('transmitted status', status);
    this.subjectAMService.next(status);
  }
}
