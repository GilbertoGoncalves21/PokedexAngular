import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    HomeComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    RoutingModule,
    SharedModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class PagesModule { }