import { Injectable, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppConfig, APP_CONFIG } from '../app-config.module';

@Injectable({
  providedIn: 'root'
})
export class GivenStatusService {

  constructor(private fb:FormBuilder, private http:HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig) { }

    readonly BaseURI =this.config.apiEndpoint +'CardApplicationData';

  formModel = this.fb.group({

    StageSerial:[0],
    HistoryId:['',Validators.required],
    Status:['',Validators.required],
    Remarks:['',Validators.maxLength(200)]
  });
  cardRecModel = this.fb.group({
   
    HistoryId:['',Validators.required],
    FileNoCardDiv:['',Validators.required]
  });

  saveDecision()
    {
      var body = {
        HistoryId : this.formModel.value.HistoryId,
        Status : this.formModel.value.Status,
        Remarks : this.formModel.value.Remarks
      } ;
      return this.http.post(this.BaseURI+'/SaveStatus',body);
    }

    saveCardDivFileNo()
    {
      var body = {
        HistoryId : this.cardRecModel.value.HistoryId,
        CardDivFileNo : this.cardRecModel.value.FileNoCardDiv
      } ;
      return this.http.post(this.BaseURI+'/SaveCardDivFileNo',body);
    }

    getStatus(historyId){
      return this.http.get(this.BaseURI+'/GetStatus?historyId='+historyId);
    }
}
