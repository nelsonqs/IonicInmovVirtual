import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Aviso } from '../../models/aviso';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the DetalleAvisoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-detalle-aviso',
  templateUrl: 'detalle-aviso.html',
})
export class DetalleAvisoPage {

  latitudCocha: number = -17.372904;
  longitudCocha: number = -66.144320;

  aviso: Aviso = new Aviso('', this.latitudCocha, this.longitudCocha);
  map: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public callNumber: CallNumber) {
    if(navParams.get('aviso') != null && navParams.get('aviso') != undefined){
      this.aviso = navParams.get('aviso');
      this.latitudCocha = this.aviso.latitud;
      this.longitudCocha = this.aviso.longitud;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleAvisoPage');
    this.loadMap();
  }

  //cargar mapa
  loadMap(){
    let mapEle: HTMLElement = document.getElementById('mapd');
    let myLatLng = {lat: this.latitudCocha, lng: this.longitudCocha};
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 14
    });

    //mostrando mapa
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
    });

    var posicion = new google.maps.LatLng(this.aviso.latitud, this.aviso.longitud);

    var dogwalkMarker = new google.maps.Marker(
    {
        position: posicion,
        title: this.aviso.titulo
    });
    dogwalkMarker.setMap(this.map);
  }

  //funcion para llamar
  llamar(){
    //alert("llega aqui");
    this.callNumber.callNumber(this.aviso.telefono, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }

}
