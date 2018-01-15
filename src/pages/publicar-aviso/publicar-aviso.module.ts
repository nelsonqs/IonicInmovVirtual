import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicarAvisoPage } from './publicar-aviso';

@NgModule({
  declarations: [
    PublicarAvisoPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicarAvisoPage),
  ],
})
export class PublicarAvisoPageModule {}
