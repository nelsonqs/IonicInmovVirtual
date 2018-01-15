import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisavisosPage } from './misavisos';
import { MisAvisosListComponent } from '../../components/mis-avisos-list/mis-avisos-list';
import { MisAvisosListRowComponent } from '../../components/mis-avisos-list-row/mis-avisos-list-row';

@NgModule({
  declarations: [
    MisavisosPage,
    MisAvisosListComponent,
    MisAvisosListRowComponent
  ],
  imports: [
    IonicPageModule.forChild(MisavisosPage),
  ],
})
export class MisavisosPageModule {}
