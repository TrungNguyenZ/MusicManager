import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbToastModule, NgbProgressbarModule, NgbPaginationModule
} from '@ng-bootstrap/ng-bootstrap';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CountToModule } from 'angular-count-to';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';

// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { LightboxModule } from 'ngx-lightbox';

// Load Icons
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';

// Pages Routing
import { PagesRoutingModule } from "./pages-routing.module";
import { SharedModule } from "../shared/shared.module";
import { WidgetModule } from '../shared/widget/widget.module';
import { DashboardsModule } from "./dashboards/dashboards.module";
import { TranslateModule } from '@ngx-translate/core';
import { UsersComponent } from './users/users.component';
import { AddUpdateUserComponent } from './users/add-update-user/add-update-user.component';
import { ChangePasswordModalComponent } from './users/change-password-modal/change-password-modal.component';
import { TableRevenueComponent } from './table-revenue/table-revenue.component';


@NgModule({
  declarations: [
  
    UsersComponent,
    AddUpdateUserComponent,
    ChangePasswordModalComponent,
    TableRevenueComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbToastModule,
    NgbPaginationModule,
    FlatpickrModule.forRoot(),
    CountToModule,
    NgApexchartsModule,
    NgbDropdownModule,
    SimplebarAngularModule,
    PagesRoutingModule,
    SharedModule,
    WidgetModule,
    NgxUsefulSwiperModule,
    LightboxModule,
    DashboardsModule,
    TranslateModule,
    ReactiveFormsModule 
  ],
})
export class PagesModule { 
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}

