import { Injectable, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppConfig, APP_CONFIG } from '../app-config.module';


@Injectable({
  providedIn: 'root'
})
export class CibDataAutoService {

  constructor(private fb:FormBuilder, private http:HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig) { }

    formModel = this.fb.group({
      Path:['',Validators.required],
      CibCode:['',Validators.required]
    });

    readonly BaseURI =this.config.apiEndpoint +'CibAuto';


    process()
      {
        var path =  this.formModel.value.Path;
        var cibCode =  this.formModel.value.CibCode;
        return this.http.post(this.BaseURI+'?path='+path+'&cibCode='+cibCode,null);
      }

  }
