import { Component, OnInit } from '@angular/core';
import { Tabs } from 'src/app/interfaces/tabs';
import { AppService } from 'src/app/services/services';

@Component({
  selector: 'pros-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit{



  tabs: Tabs[] = [];



  constructor(private service: AppService){}


  ngOnInit(): void {
    this.service.getTabs().subscribe({
      next:(res)=> this.tabs = res
    });
  }

}
