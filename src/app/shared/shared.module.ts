import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule, NgbAccordionModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

// Counter
import { CountToModule } from 'angular-count-to';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ScrollspyDirective } from './scrollspy.directive';

import { TranslateModule } from '@ngx-translate/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    BreadcrumbsComponent,
    ScrollspyDirective,
  ],
  imports: [
    CommonModule,
    NgbNavModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgxUsefulSwiperModule,
    CountToModule,
    NgxUsefulSwiperModule,
    TranslateModule,
    NgApexchartsModule,
    FormsModule 
  ],
  exports: [
    BreadcrumbsComponent,
    ScrollspyDirective
  ]
})
export class SharedModule { }
