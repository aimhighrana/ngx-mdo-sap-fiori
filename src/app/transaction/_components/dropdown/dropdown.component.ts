import { Component, Input, OnInit } from '@angular/core';
import { SelectChangeEventDetail } from '@ui5/webcomponents/dist/Select';
import { Fields } from 'src/app/interfaces/Fields';
import { Dropdown } from 'src/app/models/dataset';
import { AppService } from 'src/app/services/services';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'pros-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input()
  field?: Fields;

  @Input()
  datasetId?: string;

  $dropdown: Dropdown[] = [];

  constructor(
    private service: AppService,
    private transaction: TransactionService
  ){}


  ngOnInit(): void {
    this.service.getDropdown(this.datasetId || '', this.field?.fieldId || '').subscribe({
      next:(res)=> this.$dropdown = res
    })
  }

  valueChange(event: Event): void {
    const evt = event as CustomEvent<SelectChangeEventDetail>;
    this.transaction.insertIntoHdvs(this.field?.fieldId || '', evt?.detail?.selectedOption?.value || '')
  }
}
