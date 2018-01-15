import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Geoposition } from '@ionic-native/geolocation';
import { Aviso } from '../../models/aviso';
import { AvisosServicesProvider } from '../../providers/avisos-services/avisos-services';
import { Camera, CameraOptions} from '@ionic-native/camera';

/**
 * Generated class for the PublicarAvisoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-publicar-aviso',
  templateUrl: 'publicar-aviso.html',
})
export class PublicarAvisoPage {
  map: any;
  activeWindow: any;
  markers = [];
  latitudCocha: number = -17.372904;
  longitudCocha: number = -66.144320;
  modificar: boolean = false;

  //model para registro de aviso
  aviso: Aviso = new Aviso('', this.latitudCocha, this.longitudCocha);

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    correctOrientation: true
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public avisosServicesProvider: AvisosServicesProvider,
    public alertCtrl: AlertController,
    public camera: Camera) {
      if(navParams.get('aviso') != null && navParams.get('aviso') != undefined){
        this.aviso = navParams.get('aviso');
        this.latitudCocha = this.aviso.latitud;
        this.longitudCocha = this.aviso.longitud;
        this.modificar = true;
      }
      else{
        this.modificar = false;
      }
  }

  ionViewDidLoad() {
    //if(typeof google == "undefined" || typeof google.maps == "undefined"){
      this.loadMap(null);
    //}
  }

  //cargar mapa
  loadMap(position: Geoposition){

    console.log(this.latitudCocha, this.longitudCocha);

    let mapEle: HTMLElement = document.getElementById('mapp');
    let myLatLng = {lat: this.latitudCocha, lng: this.longitudCocha};
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 14
    });

    //mostrando mapa
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
    });

    this.map.addListener('click', (event) =>  {

      for (var i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(null);
      }
      this.markers.length = 0;//fin eliminar

      var latitude = event.latLng.lat();//position.coords.latitude;
      let longitude = event.latLng.lng();

      //cargando para el registro en base de datos
      this.aviso.latitud = latitude;
      this.aviso.longitud = longitude;

      //var longitude = e.latLng.lng();
      var posicion = new google.maps.LatLng(latitude, longitude);

      var dogwalkMarker = new google.maps.Marker(
      {
          position: posicion,
          title: "descrpcion"
      });

      dogwalkMarker.setMap(this.map);

      this.markers.push(dogwalkMarker);//para eliminar
    });

    var posicion = new google.maps.LatLng(this.latitudCocha, this.longitudCocha);

    var dogwalkMarker = new google.maps.Marker(
    {
        position: posicion,
        title: "descrpcion"
    });
    dogwalkMarker.setMap(this.map);
    this.markers.push(dogwalkMarker);//para eliminar
  }

  //metodo para registro en base de datos
  publicarAviso(){
    //alert(">>" + this.aviso.descripcion + ">>" + this.aviso.precio + ">>" + this.aviso.telefono + ">>" + this.aviso.direccion + ">>" + this.aviso.latitud + ">>" + this.aviso.longitud);
    if((this.validarDatos())){
      let titulo = this.aviso.descripcion;
      if(this.aviso.descripcion.length >= 20){
        titulo = this.aviso.descripcion.substring(0,20);
      }
      this.aviso.titulo = titulo;
  
      if(!this.modificar){
        //neuvo registro
        this.avisosServicesProvider.publicarAviso(this.aviso);
      }
      else{
        //para modificar aviso
        this.avisosServicesProvider.modificarAviso(this.aviso);
      }
      this.navCtrl.pop();
    }
    else{
      this.mostrarMensaje('Faltan datos para realizar esta operacion');
    }
  }  
  //fin crud

  takePicture(){
    this.camera.getPicture(this.options)
    .then((imageData) => {
      try{
        this.aviso.imagen = 'data:image/jpeg;base64,' + imageData;
        console.log();
      }catch(err){
        this.mostrarMensaje('No se pudo cargar la foto');
      }
     }, (err) => {
      // Handle error
     });
  }
  removePicture(){
    this.aviso.imagen = null;
  }

  //validar datos del objeto aviso
  validarDatos(): boolean{
    let result = true;
    if(this.aviso.descripcion === '' ||  this.aviso.descripcion === undefined){
      result = false;
    }
    if(this.aviso.precio < 0){
      result = false;
    }
    if(this.aviso.telefono === '' ||  this.aviso.telefono === undefined){
      result = false;
    }
    if(isNaN(this.aviso.precio)){
      result = false;
    }

    return result;
  }

  //metodo para mostrar popup
  mostrarMensaje(mensaje: string) {
    let confirm = this.alertCtrl.create({
      title: 'Informacion',
      message: mensaje,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Disagree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

}
