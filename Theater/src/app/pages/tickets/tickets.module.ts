import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    TicketsComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    MatListModule,
    MatIconModule
  ]
})
export class TicketsModule { }
