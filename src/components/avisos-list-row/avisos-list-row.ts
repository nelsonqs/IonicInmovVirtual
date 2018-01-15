import { Component, Input } from '@angular/core';
import { Aviso } from '../../models/aviso';

/**
 * Generated class for the AvisosListRowComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'avisos-list-row',
  templateUrl: 'avisos-list-row.html'
})
export class AvisosListRowComponent {

  @Input() aviso: Aviso;

  constructor() {
    console.log('Hello AvisosListRowComponent Component');
  }

}
