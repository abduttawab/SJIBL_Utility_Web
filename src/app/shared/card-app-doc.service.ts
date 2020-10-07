import { Injectable, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppConfig, APP_CONFIG } from '../app-config.module';


@Injectable({
  providedIn: 'root'
})
export class CardAppDocService {

  constructor(private fb:FormBuilder, private http:HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig) { }


    formModel = this.fb.group({

      Id:[''],
      Name:['',Validators.required],
      Details:[''],
      IsMandatory:[false]
    });

    readonly BaseURI =this.config.apiEndpoint +'Document';


    saveOrUpdate()
      {
        var body = {
          Id : this.formModel.value.Id,
          Name : this.formModel.value.Name,
          Details : this.formModel.value.Details,
          IsMandatory : this.formModel.value.IsMandatory
        };
        return this.http.post(this.BaseURI+'/SaveOrEditCardAppDoc',body);
      }

  }
