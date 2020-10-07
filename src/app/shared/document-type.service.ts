import { Injectable, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppConfig, APP_CONFIG } from '../app-config.module';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  constructor(private fb:FormBuilder, private http:HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig) { }

    readonly BaseURI =this.config.apiEndpoint +'Document';
    readonly fileEndpoint =this.config.fileEndpoint;


  formModel = this.fb.group({

    Id:[''],
    Name:['',Validators.required],
    Details:[''],
    IsMandatory:[false]
  });

  CardDocFormModel = this.fb.group({
 
    Details:[''],
    CardApplicationDataId:['',Validators.required],
    DocumentTypeId:['',Validators.required],
    CardAppDocId:['',Validators.required]
  });
getBaseUrl()
    {
      return this.fileEndpoint;
    }
  saveOrUpdate()
    {
      var body = {
        Id : this.formModel.value.Id,
        Name : this.formModel.value.Name,
        Details : this.formModel.value.Details,
        IsMandatory : this.formModel.value.IsMandatory
      };
      return this.http.post(this.BaseURI+'/SaveOrEditDocumentType',body);
    }
    get(id){
      return this.http.get(this.BaseURI+'/GetDocumentTypes?id='+id);
    }
    

    getAll(){
      return this.http.get(this.BaseURI+'/GetDocumentTypes');
    }
    getAllCardAppDoc(appId,historyId){
      return this.http.get(this.BaseURI+'/GetAllCardAppDoc?appId='+appId+'&historyId='+historyId);
    }

    delete(id){
      return this.http.get(this.BaseURI+'/DeleteDocumentType?id='+id);
    }

    SaveCardAppDoc(body)
    {
      
      return this.http.post(this.BaseURI+'/SaveCardAppDoc',body);
    }
}
