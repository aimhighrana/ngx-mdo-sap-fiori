import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectChangeEventDetail } from '@ui5/webcomponents/dist/Select';
import { ErrorState } from 'src/app/auth/_components/login/login.component';
import { Dataset, Flow } from 'src/app/models/dataset';
import { AuthService } from 'src/app/services/auth.service';
import { AppService } from 'src/app/services/services';

@Component({
  selector: 'pros-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements OnChanges {

  error: string | undefined;

  @Input()
  dataset?: Dataset;

  @Input()
  dialog: any = '';

  $flows: Flow[] = [];

  selectedOption:FormControl = new FormControl('', Validators.required);

  constructor(
    private router: Router,
    private service: AppService
  ){}


  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.['dataset'].previousValue !== changes?.['dataset'].currentValue && changes?.['dataset'].currentValue) {
      
      
      if(this.dataset?.moduleId === '487809') {
        this.$flows = [{
          flowId:'BASICSPAREPARTREQ.BasicSparePartRequest',
          flowDesc:'Basic Spare Part Request',
          parentMapping:{
            "487809":{
              formId: 'eb968b1c-4424-4999-8ed0-66aefff84f02'
            }
          } as any
        }]
        
      } else if(this.dataset?.moduleId === '263347') {
        this.$flows = [{
          flowId:'FLOC.EXTERNAL',
          flowDesc:'Create Functional Location from External Systems',
          parentMapping:{
            "263347":{
              formId: '9e603195-8b17-4572-a40b-79c5feb5777f'
            }
          } as any
        }]
      } else {
        throw Error('Not supported yet');
      }
      
      // this.service.getFlow(this.dataset?.moduleId || '').subscribe({
      //   next:(res)=> this.$flows = res
      // })
    }
  }

  selectionChange(event: any) {
    console.log('event ' + event)
  }

  onValueChange(event: Event): void {
    const evt = event as CustomEvent<SelectChangeEventDetail>;
    this.selectedOption.patchValue(evt?.detail?.selectedOption?.value);
  }
  

  public submit() {
    if(!this.selectedOption.valid) {
      this.error = 'Please select a flow.';
      setTimeout(()=>{this.error = ''},5000);
      return;
    }
    this.service.setSelectedDatasetInfo = this.dataset || new Dataset();
    this.router.navigate(['home','transaction', this.dataset?.moduleId ,'create'],{queryParams:{flow: this.selectedOption.value,
      form: (this.$flows.find(f=> f.flowId === this.selectedOption.value)?.parentMapping as any)?.[this.dataset?.moduleId || '']?.formId}});
  }

}
