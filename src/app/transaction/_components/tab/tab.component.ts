import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Fields } from 'src/app/interfaces/Fields';
import { Tabs } from 'src/app/interfaces/tabs';
import { AppService } from 'src/app/services/services';

@Component({
  selector: 'pros-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit, OnChanges {

  @Input()
  tab?: Tabs;

  @Input()
  datasetId?: string;

  @Input()
  flowId?: string;
  
  fields: Fields[] = [];

  constructor(private service: AppService){}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.['tab']?.currentValue !== null && changes?.['tab']?.currentValue !== changes?.['tab']?.previousValue) {
      this.getFields();
    }
  }

  ngOnInit(): void {}

  public getFields() {
    this.service.getFields(this.tab?.tabid as string, this.datasetId || '', this.flowId || '').subscribe({
      next:(res)=> { this.fields = res; console.log(this.fields)}
    })
  }


}
