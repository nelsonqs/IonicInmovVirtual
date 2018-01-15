import { Component, Input } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { Aviso } from '../../models/aviso';
import { AvisosServicesProvider } from '../../providers/avisos-services/avisos-services';

/**
 * Generated class for the MisAvisosListRowComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mis-avisos-list-row',
  templateUrl: 'mis-avisos-list-row.html'
})
export class MisAvisosListRowComponent {

  @Input() aviso: Aviso;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public avisosServicesProvider: AvisosServicesProvider) {
    
  }

  //funcion para modificar los datos
  modificarAviso(aviso: Aviso){
    this.navCtrl.push('PublicarAvisoPage', {aviso: aviso});
  }

  //funcion para confirmacion para eliminar datos
  showConfirm(aviso: Aviso) {
    let confirm = this.alertCtrl.create({
      title: 'Confirmar?',
      message: 'Ud. Esta por eliminar un aviso?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            console.log('Agree clicked');
            //alert("En desarrollo");
            this.avisosServicesProvider.elimiarAviso(aviso);
          }
        }
      ]
    });
    confirm.present();
  }

}
