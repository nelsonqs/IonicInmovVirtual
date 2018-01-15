import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Cuenta } from '../../models/cuenta';
import { AvisosServicesProvider } from '../../providers/avisos-services/avisos-services';
import { Sim } from '@ionic-native/sim';

/**
 * Generated class for the RegistrarCuentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrar-cuenta',
  templateUrl: 'registrar-cuenta.html',
})
export class RegistrarCuentaPage {
  cuenta: Cuenta;
  mensaje: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public avisosServicesProvider: AvisosServicesProvider,
    private sim: Sim) {
    this.cuenta = new Cuenta();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarCuentaPage');
    this.leerSim();
  }

  //metodos para registra la cuenta
  close() {
    this.viewCtrl.dismiss();
  }

  //verificacion de sim
  leerSim(){
    this.sim.getSimInfo().then(
      (info) => {
        this.cuenta.imei = info.deviceId;
        console.log('Sim info: ' + JSON.stringify(info) + ">>>>>>>" + info.deviceId);
      }
    )
    .catch((error) => console.log('Error: ' + error));
  }

  //registrar cuenta
  registrarCuenta() {    
    //let rcuenta = this.avisosServicesProvider.obtenerCuenta('354682060410112'); 
    //console.log(">>>>>>>>>>>>>>>>>>>>" + JSON.stringify(rcuenta));
    if(this.datosValidos()){
      this.avisosServicesProvider.registrarCuenta(this.cuenta);
      
      this.viewCtrl.dismiss();
    }
    else{
      this.mensaje = "Faltan datos para realizar esta operacion";
    }
  }

  //metodo para validar datos de la cuenta
  datosValidos(): boolean{
    let result: boolean = true;
    if(this.cuenta.imei == '' || this.cuenta.imei == undefined){
      this.cuenta.imei = '123456789101112';
    }
    if(this.cuenta.nombre === '' || this.cuenta.nombre === undefined){
      result = false;
    }
    if(this.cuenta.apaterno === '' || this.cuenta.apaterno === undefined){
      result = false;
    }
    return result;
  }

}
