import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaysRoutingModule } from './plays-routing.module';
import { PlaysComponent } from './plays.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DatePipe } from 'src/app/shared/pipes/date.pipe';


@NgModule({
  declarations: [
    PlaysComponent,
    DatePipe
  ],
  imports: [
    CommonModule,
    PlaysRoutingModule,
    MatExpansionModule
  ]
})
export class PlaysModule { }
