    import { Component, OnInit } from '@angular/core';
    import { NgForm, ValidationErrors } from '@angular/forms';
    import { of } from 'rxjs';
    import { CommonService } from '../shared/common.service';
    import { ToastrService } from 'ngx-toastr';
    import { ActivatedRoute, Router } from '@angular/router';
    @Component({
      selector: 'app-entry-form',
      templateUrl: './entry-form.component.html',
      styles: []
    })
    export class EntryFormComponent implements OnInit {
      Districts = [];
      BranchList = [];
      SourceByList = [];
      SalesAgentList = [];
      EmployeeInfo;
      EmployeeInfo_ref;
      errorText;
      checked: boolean;
      public response: {dbPath: ''};
      constructor(private commonService: CommonService,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private router: Router) {

      }

      ngAfterViewInit() {
        // ...
      }
      async ngOnInit() {

       

      }
      public uploadFinished = (event) => {
        this.response = event;
      }
   
    
    
      onSubmit() 
      {

            // if (this.service.formModel.valid) {
            //   this.service.save().subscribe(
            //     (res: any) => {
          

            //       if (res.isSuccessfull) {

            //         this.toastr.warning('Data updated!', 'Record successfully updated.');
            //       } else {
            //         this.toastr.error('Ops! Something went worng!', res.message);
            //       }
            //     },
            //     err => {
            //       console.log(err);
            //       this.toastr.error(err);
            //     }
            //   );

              
            //   }else{
            //     this.getFormValidationErrors();
            //   }
      }
     

      getFormValidationErrors() {

        // Object.keys(this.service.formModel.controls).forEach((key) => {
        //   const controlErrors: ValidationErrors = this.service.formModel.get(key).errors;
        //   if (controlErrors != null) {
        //     Object.keys(controlErrors).forEach((keyError) => {
        //       const errors =
        //         "Key control: " + key + ", keyError: " + keyError + ", err value: ";
        //       this.toastr.error(errors);
        //       console.log(errors);
        //     });
        //   }
        // });

      }
    }
