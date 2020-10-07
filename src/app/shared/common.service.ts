import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { APP_CONFIG, AppConfig } from '../app-config.module';
import { Inject } from '@angular/core';
import {AbstractControl} from '@angular/forms';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  readonly BaseURI =this.config.apiEndpoint;
  constructor(private http: HttpClient,@Inject(APP_CONFIG) private config: AppConfig) {
     }
   public getdistrict() {
    return this.http.get("./assets/data/bangladesh-upazila-district-division.json");
}
public getbranchList() {
  return this.http.get(this.BaseURI+"Common/GetBranchList");
}
public getEmpInfo(empId) {
  return this.http.get(this.BaseURI+"Common/GetEmployeeInfoById?empId="+empId);
}




static dateVaidator(AC: AbstractControl) {

  if (AC && AC.value && !moment((AC.value.day+"/"+AC.value.month+"/"+AC.value.year), 'D/M/YYYY',true).isValid()) {
    return {'dateVaidator': true};
  }
  return null;
}
}
