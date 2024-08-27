import { Component, Input } from '@angular/core';
import { Fields } from 'src/app/interfaces/Fields';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'pros-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent {

  @Input()
  field?: Fields;

  @Input()
  datasetId?: string;

  constructor(
    private transaction: TransactionService
  ){}


  public valueChange(event: Event) {
    const evt = event.target as HTMLTextAreaElement;
    this.transaction.insertIntoHdvs(this.field?.fieldId || '', evt?.value || '')
  }

}
