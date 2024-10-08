import { Component, Input } from '@angular/core';
import { Fields } from 'src/app/interfaces/Fields';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'pros-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input()
  field?: Fields;

  @Input()
  datasetId?: string;

  constructor(
    private transaction: TransactionService
  ){}


  public valueChange(event: Event) {
    const evt = event.target as HTMLInputElement;
    this.transaction.insertIntoHdvs(this.field?.fieldId || '', evt?.value || '')
  }
}
