import { Component, Input } from '@angular/core';
import { Fields } from 'src/app/interfaces/Fields';

@Component({
  selector: 'pros-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input()
  field?: Fields;

  constructor(){}
}
