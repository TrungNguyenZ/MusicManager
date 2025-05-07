import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbToastModule, NgbTypeaheadModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Feather Icon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { CountToModule } from 'angular-count-to';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
// Apex Chart Package
import { NgApexchartsModule } from 'ng-apexcharts';
// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';

//Module
import { DashboardsRoutingModule } from "./dashboards-routing.module";
import { SharedModule } from '../../shared/shared.module';
import { WidgetModule } from '../../shared/widget/widget.module';


// Component
import { ProjectsComponent } from './projects/projects.component';
import { TranslateModule } from '@ngx-translate/core';
import { ExportExcelComponent } from './projects/modal/export-excel/export-excel.component';
import { ImportExcelComponent } from './projects/modal/import-excel/import-excel.component';
import { SendNotiFCMComponent } from './projects/modal/send-noti-fcm/send-noti-fcm.component';



@NgModule({
  declarations: [
    ProjectsComponent,
    ExportExcelComponent,
    ImportExcelComponent,
    SendNotiFCMComponent,
  ],
  imports: [
    TranslateModule,
    CommonModule,
    NgbToastModule,
    FeatherModule.pick(allIcons),
    CountToModule,
    LeafletModule,
    NgbDropdownModule,
    NgbNavModule,
    SimplebarAngularModule,
    NgApexchartsModule,
    NgxUsefulSwiperModule,
    FlatpickrModule.forRoot(),
    DashboardsRoutingModule,
    SharedModule,
    WidgetModule,
    NgbTypeaheadModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule
  ]
})
export class DashboardsModule { }
