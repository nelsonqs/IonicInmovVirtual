import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import {AvisosServicesProvider} from '../../providers/avisos-services/avisos-services';
import { Aviso } from '../../models/aviso';

/**
 * Generated class for the AvisosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-avisos',
  templateUrl: 'avisos.html',
})
export class AvisosPage {
  loading: any;
  avisos: Aviso[];
  clon_avisos:Aviso[];

  toggled: boolean;
  searchTerm: String = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public avisosServicesProvider: AvisosServicesProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvisosPage');
    this.presentLoading();
    this.listaAvisos();
  }

  listaAvisos(){
    let suscriptor = this.avisosServicesProvider.listaAvisos().subscribe(data => {
      console.log(">>>>>>>>>>>>>LLEGA POR AQUI>>>>>>>>>>>>>");
      this.avisos = data;
      this.clon_avisos = data;
      this.dismissLoading();
      console.log("+++++++++++L AVISOS++++++++++>");
    });
  }

  //inicio de espera
  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Buscando datos espere...'
    });
  
    this.loading.present();
  }

  dismissLoading(){
    this.loading.dismiss();
  }
  //fin espera 

  //metodos para realizar busqueda
  toggleSearch() {
    this.toggled = this.toggled ? false : true;
  }
  triggerInput( ev: any ) {
    console.log('test>>>>' + ev.target.value);
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.avisos = this.avisos.filter((item) => {
        return (item.descripcion.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } 
    else{
      this.avisos = this.clon_avisos;
    }
  }

}
