import {Component, Input} from '@angular/core';
import {Aviso} from '../../models/aviso';

/**
 * Generated class for the MisAvisosListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mis-avisos-list',
  templateUrl: 'mis-avisos-list.html'
})
export class MisAvisosListComponent {

  @Input() avisos: Aviso[];

  constructor() {
  }

}
