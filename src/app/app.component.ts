import { Component } from '@angular/core';
import { Subject, takeUntil, zip } from 'rxjs';

import { AppService } from './services/services';

@Component({
  selector: 'pros-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  componentUnsubscribe: Subject<boolean> = new Subject();
  
  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.componentUnsubscribe.next(true);
    this.componentUnsubscribe.complete();
  }
}
