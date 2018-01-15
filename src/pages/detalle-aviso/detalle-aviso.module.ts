import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleAvisoPage } from './detalle-aviso';

@NgModule({
  declarations: [
    DetalleAvisoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleAvisoPage),
  ],
})
export class DetalleAvisoPageModule {}
