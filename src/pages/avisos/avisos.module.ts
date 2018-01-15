import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvisosPage } from './avisos';
import { AvisosListComponent } from '../../components/avisos-list/avisos-list';
import { AvisosListRowComponent } from '../../components/avisos-list-row/avisos-list-row';

@NgModule({
  declarations: [
    AvisosPage,
    AvisosListComponent,
    AvisosListRowComponent,
  ],
  imports: [
    IonicPageModule.forChild(AvisosPage),
  ],
})
export class AvisosPageModule {}
