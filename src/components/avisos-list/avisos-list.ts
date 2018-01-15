import { Component, Input } from '@angular/core';
import { Aviso } from '../../models/aviso';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the AvisosListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'avisos-list',
  templateUrl: 'avisos-list.html'
})
export class AvisosListComponent {

  @Input() avisos: Aviso[];

  constructor(public navCtrl: NavController) {
    console.log('Hello AvisosListRowComponent Component');
  }

  detail(aviso:Aviso){
    this.navCtrl.push('DetalleAvisoPage', {aviso: aviso});
  }

}
