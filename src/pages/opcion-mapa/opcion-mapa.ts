import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Aviso } from '../../models/aviso';

/**
 * Generated class for the OpcionMapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-opcion-mapa',
  templateUrl: 'opcion-mapa.html',
})
export class OpcionMapaPage {
  aviso: Aviso;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public callNumber: CallNumber,
    public socialSharing: SocialSharing) {
      this.aviso = navParams.get('aviso');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpcionMapaPage');
  }

  llamar() {
    this.callNumber.callNumber(this.aviso.telefono, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
    this.close();
  }

  whasapp(){
    this.socialSharing.shareViaWhatsApp('','com.whatsapp/send?phone=' + this.aviso.telefono, 'com.whatsapp/send?phone=' + this.aviso.telefono);
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
