import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private $master: BehaviorSubject<Map<string, object>> = new BehaviorSubject(new Map());

  constructor() { }


  public set master(data: Map<string, object>) {
    this.$master.next(data);
  }

  public get master(): Map<string, object> {
    return this.$master.value;
  }



  public insertIntoHdvs(field: string , value: string) {
    const hdvs = (this.master.get('hdvs') || {}) as any;
    hdvs[field] = {vc:[{
      c: value || ''
    }]};
    this.master = this.master.set('hdvs', hdvs);
  }


}
