import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { Dataset, Flow } from 'src/app/models/dataset';
import { AppService } from 'src/app/services/services';

@Component({
  selector: 'pros-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit , AfterViewInit{

  $datasets:Dataset[] = [];

  selectedDataset?: Dataset;

  constructor(
    private router: Router,
    private service: AppService
  ){}


  ngAfterViewInit(): void {
    // temp css fix for shadow dom ... 
    setTimeout(()=>{
      try {
        (document.getElementsByTagName('ui5-product-switch')[0] as any).shadowRoot.lastChild.style.width='100%'
      } catch(err) {console.error(`Error while setting the default css values : ${err}`)}
    }, 1000);
  }

  ngOnInit(): void {
    this.service.getModules().subscribe({
      next:(res)=> this.$datasets = res.filter(f=> f.moduleId === '487809' || f.moduleId === '263347')
    });
  }

  navigateTo(dataset: Dataset) {
    this.service.setSelectedDatasetInfo = dataset;
    this.router.navigate(['home','flow', dataset.moduleId]);
  }

}
