import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrarCuentaPage } from './registrar-cuenta';

@NgModule({
  declarations: [
    RegistrarCuentaPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrarCuentaPage),
  ],
})
export class RegistrarCuentaPageModule {}
