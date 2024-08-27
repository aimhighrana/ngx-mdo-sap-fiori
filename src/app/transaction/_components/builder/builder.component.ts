import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, switchMap } from 'rxjs';
import { Tabs } from 'src/app/interfaces/tabs';
import { Dataset } from 'src/app/models/dataset';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { AppService } from 'src/app/services/services';
import { TransactionService } from 'src/app/services/transaction.service';

export interface ErrorState {
  error?: string;
  level?: string;
}

@Component({
  selector: 'pros-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit{

  datasetId: string = '';

  datasetDetails?: Dataset;

  tabs: Tabs[] = [];

  flowId: string = '';

  formId: string = '';

  isSaving: boolean = false;

  errorState: ErrorState = {error:'', level:''};

  user!: User;

  constructor(
    private service: AppService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private transaction: TransactionService,
    private authService: AuthService
  ){}


  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe({
      next:(p)=> this.datasetId = p.get('dataset') || ''
    });

    this.activeRouter.queryParamMap.subscribe({
      next:(q)=>{
        this.formId = q.get('form') || '';
        this.flowId = q.get('flow') || '';
      }
    });

    this.authService.userProfile().subscribe({
      next: (next) => this.user = next
    });
    
    this.service.getSelectedDatasetInfo.subscribe({next:(res)=> this.datasetDetails = res});

    // get tabs 
    this.getTabs();
  }

  public getTabs() {
    this.service.getTabs(this.formId).subscribe({
      next:(res)=> this.tabs = res
    });
  }

  public submit() {
    this.isSaving =true;

    const request = {mdoRecordES: Object.fromEntries(this.transaction.master), controlData:{
                      moduleId: this.datasetId,
                      eventId: 1,
                      userId: this.user?.userId,
                      layoutId: this.formId
                    }};

    this.service.generateRestEndPoint(this.flowId)
    .pipe(switchMap((map)=>
      this.service.saveRecord(map ,request)),finalize(()=> this.isSaving=false)).subscribe({
      next:(res)=>{
        this.errorState = {error: 'Record saved successfully', level: 'success'};
      },
      error:(error)=>{

        let errorDetailMessages = '';
        error?.error?.allFieldsLogs?.forEach((f: { fieldDesc: any; errMsg: any; })=>{
          errorDetailMessages += `${f.fieldDesc} : ${f.errMsg} \n`;
        })

        this.errorState.error = error?.error?.message || errorDetailMessages || 'Something went wrong while saving'
      }
    })
  }

}
