import { Component, Input } from '@angular/core';
import { Fields } from 'src/app/interfaces/Fields';

@Component({
  selector: 'pros-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {

  @Input()
  field?: Fields;

  constructor(){}
}
