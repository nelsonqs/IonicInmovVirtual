import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Aviso } from '../../models/aviso';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Cuenta } from '../../models/cuenta';

/*
  Generated class for the AvisosServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AvisosServicesProvider {

  avisos: AngularFireList<Aviso>;
  misAvisos: AngularFireList<Aviso>;
  avisosIds: Observable<any[]>;

  cuentas: AngularFireList<Cuenta>;
  rcuentas: Cuenta[];
  imei = '';
  constructor(
    public http: HttpClient,
    public avisodb: AngularFireDatabase,
    public afAuth: AngularFireAuth) {
      this.avisos = avisodb.list('/avisos/');
      //this.misAvisos = avisodb.list('/avisos/',ref => ref.orderByChild('imei').equalTo('67865467'));
      this.cuentas = avisodb.list('/cuentas/');
      this.listaCuentas();/////
  }

  //lista de aviso
  public listaAvisos(): Observable<Aviso[]>{
    return this.avisos.valueChanges();
  }

  //lista de keys
  public listaIdAvisos(): Observable<any[]>{
    return this.avisos.snapshotChanges();
  }

  //regitro en base de datos
  public publicarAviso(aviso: Aviso): boolean{
    aviso.imei = this.imei;
    const rrcuenta: Cuenta = this.obtenerCuenta(this.imei);
    console.log(">>>>>>>>>EL IMEI>>>>>>>>>>>" + aviso.imei);
    if(rrcuenta.imei != '' && rrcuenta.imei != undefined){
      this.avisos.push(aviso);
    }
    else{
      alert("No tiene cuenta");
    }
    return true;
  }

  public modificarAviso(aviso: Aviso): boolean{
    this.avisos.update(aviso.id, aviso);
    return true;
  }

  public elimiarAviso(aviso: Aviso): boolean{
    this.avisos.remove(aviso.id);
    return true;
  }

  //servicios para cuentas
  public registrarCuenta(cuenta: Cuenta){
    this.avisodb.list('/cuentas').push(cuenta);
    console.log(">>REGISTRO DE CUENTA>>");
  }

  public listaCuentas(){
    let suscriptor = this.cuentas.valueChanges().subscribe(data => {
      this.rcuentas = data;
      console.log('>>>>>L CUENTAS>>>>>' + JSON.stringify(this.rcuentas));
   });
  }

  public obtenerCuenta(imei:string):Cuenta{
    let result:Cuenta = new Cuenta();
    this.rcuentas.forEach(element => {
      if(element.imei === imei){
        result.imei = imei;
        this.imei = imei;
      }
    });
    return result;
  }

}
