import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AvisosServicesProvider } from '../../providers/avisos-services/avisos-services';
import { Aviso } from '../../models/aviso';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions
 } from '@ionic-native/google-maps';
import { Component } from "@angular/core/";

/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  map: GoogleMap;
  latitudCocha: number = -17.372904;
  longitudCocha: number = -66.144320;
  activeWindow: any;
  loading: any;

  toggled: boolean;
  searchTerm: String = '';

  avisos: Aviso[];
  clon_avisos:Aviso[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public avisosServicesProvider: AvisosServicesProvider,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController) {
      let suscriptor = avisosServicesProvider.listaAvisos().subscribe(data => {
        this.avisos = data;
        this.clon_avisos = data;
        //this.cargarAvisos();
     });
  }

  ionViewDidLoad(){
    this.presentLoading();
    this.loadMap();
    //this.listaAvisos();
  }

  // funcion para recuperar datos desde servicio
  listaAvisos(){
    let suscriptor = this.avisosServicesProvider.listaAvisos().subscribe(data => {
      console.log(">>LLEGA POR AQUI>>");
      this.avisos = data;
      console.log(">>LISTA EN MAPA>>>" + JSON.stringify(this.avisos));
      this.dismissLoading();
      this.cargarAvisos();
    });
  }

  //cargar mapa
  loadMap() {
    
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.latitudCocha,
          lng: this.longitudCocha
        },
        zoom: 14,
        tilt: 30
      }
    };

    //this.map = this.googleMaps.create('map_canvas', mapOptions);
    this.map = GoogleMaps.create('map_canvas_p', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
        this.listaAvisos();
      });
  }

  //funcion para cargar los avisos
  cargarAvisos(){
    //for(let i = 0;i < this.avisos)
    this.map.clear();
    for(let aviso of this.avisos){
      console.log("+++++++++++TITULO EN MAPA (antes)+++++++++>>>>" + aviso.titulo);
      this.map.addMarker({
        title: aviso.descripcion + '\n' + String(aviso.precio) + '(Bs)\n (toque para Opciones)',
        icon: 'red',
        animation: 'DROP',
        position: {
          lat: aviso.latitud,
          lng: aviso.longitud
        }
      })
      .then(marker => {
        marker.on(GoogleMapsEvent.INFO_CLICK)
          .subscribe(() => {
            //alert('clicked');
            let popover = this.popoverCtrl.create('OpcionMapaPage', {aviso: aviso});
            popover.present();
          });
      });
      console.log("+++++++++++TITULO EN MAPA (antes)+++++++++>>>>" + aviso.titulo);
    }
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
    this.cargarAvisos();
  }

}
