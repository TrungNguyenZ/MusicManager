import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule, NgbAccordionModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

// Counter
import { CountToModule } from 'angular-count-to';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ScrollspyDirective } from './scrollspy.directive';
import { UserProfileModalComponent } from './widget/modal/user-profile-modal/user-profile-modal.component';
import { ConfirmDeleteModalComponent } from './widget/modal/confirm-delete-modal/confirm-delete-modal.component';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';

import { TranslateModule } from '@ngx-translate/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    ScrollspyDirective,
    UserProfileModalComponent,
    ConfirmDeleteModalComponent,
    CurrencyFormatPipe
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
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BreadcrumbsComponent,
    ScrollspyDirective,
    UserProfileModalComponent,
    ConfirmDeleteModalComponent,
    CurrencyFormatPipe
  ]
})
export class SharedModule { }
