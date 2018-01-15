import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { AvisosServicesProvider } from '../../providers/avisos-services/avisos-services';
import { Aviso } from '../../models/aviso';
import { LoadingController } from 'ionic-angular';
import { Sim } from '@ionic-native/sim';
import { Cuenta } from '../../models/cuenta';
import { Observable } from 'rxjs/Observable';


/**
 * Generated class for the MisavisosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-misavisos',
  templateUrl: 'misavisos.html',
})
export class MisavisosPage {
  avisos: Aviso[];
  loading: any;
  avisosIds: Observable<any[]>;

  toggled: boolean;
  searchTerm: String = '';
  imei: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public avisosServicesProvider: AvisosServicesProvider,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    private sim: Sim) {
      this.toggled = false;
  }

  ionViewDidLoad() {
    this.presentLoading();
    this.leerSim(); //DESCOMENTAR ESTO
    //this.listaMisAvisos();
    //this.listaMisIdAvisos();
  }

  //verificar si existe cuenta para mostrar sus datos
  leerSim(){
    this.sim.getSimInfo().then(
      (info) => {
        this.imei = info.deviceId;
        console.log('Sim info in list: ' + JSON.stringify(info) + ">>>>>>>" + info.deviceId);
        this.avisosServicesProvider.imei = this.imei;//linea agregada
        //this.listaMisAvisos();
        this.listaMisIdAvisos();
      }
    )
    .catch((error) => {
      console.log('Error: ' + error);
      this.dismissLoading();
    });
  }

  //lista de avisos
  listaMisAvisos(){
    let suscriptor = this.avisosServicesProvider.listaAvisos().subscribe(data => {
      console.log(">>>>>>>>>>>>>LLEGA POR AQUI>>>>>>>>>>>>>");
      this.avisos = data.filter(aviso => aviso.imei === this.imei);
      this.dismissLoading();
      //this.existeCuenta();////DESCOMENTAR
      console.log("+++++++++++L MIS AVISOS++++++++++>");
    });
  }

  //lista de id de avisos solo para pruebas\
  listaMisIdAvisos(){
    console.log(">>>>>>llega por aqui antes>>>>>");
    let suscriptor = this.avisosServicesProvider.listaIdAvisos().subscribe(data => {
      this.dismissLoading();
      this.avisos = [];
      data.forEach(element => {
        let aviso: Aviso = JSON.parse(JSON.stringify(element.payload));
        aviso.id = element.key;
        console.log(aviso.imei + ">===>" + this.imei);
        if(aviso.imei === this.imei){
          this.avisos.push(aviso);
        }
      });
      this.existeCuenta();
    });
  }

  //metodo para verificar si existen dastos
  existeCuenta(){
    let rcuenta: Cuenta = this.avisosServicesProvider.obtenerCuenta(this.imei);
    if(rcuenta.imei == null || rcuenta.imei == undefined){
      console.log("no existe cuenta");
      let popover = this.popoverCtrl.create('RegistrarCuentaPage');
      popover.present();
    }
    console.log("imei recuperado>>>>>>" + JSON.stringify(rcuenta));
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
    // Reset items back to all of the items
    /*this.initializeItems();
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } */
  }

  //funcion para publicar avisos
  publicarAviso(){
    this.navCtrl.push('PublicarAvisoPage');
  }

  mostrarOpcines(myEvent) {
    let popover = this.popoverCtrl.create('OpconesPage');
    popover.present({
      ev: myEvent
    });
  }

}
