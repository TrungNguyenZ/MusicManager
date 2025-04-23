import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbTooltipModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { CountToModule } from 'angular-count-to';
// Feather Icon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
// Apex Chart Package
import { NgApexchartsModule } from 'ng-apexcharts';

import { ProjectsStatComponent } from './projects/projects-stat/projects-stat.component';
import { RevenuecDigitalTotalComponent } from './projects/revenuec-digital-total/revenuec-digital-total.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { DigitalPercentComponent } from './projects/digital-percent/digital-percent.component';
import { CountryPercentComponent } from './projects/country-percent/country-percent.component';
import { YoutubePercentComponent } from './projects/youtube-percent/youtube-percent.component';
import { PriceNamePercentComponent } from './projects/price-name-percent/price-name-percent.component';
import { TableRevenueArtComponent } from './projects/table-revenue-art/table-revenue-art.component';
import { TableRevenueTrackComponent } from './projects/table-revenue-track/table-revenue-track.component';
import { ConfirmDeleteModalComponent } from './modal/confirm-delete-modal/confirm-delete-modal.component';
import { ViewPercentComponent } from './projects/view-percent/view-percent.component';
import { ViewTotalComponent } from './projects/view-total/view-total.component';

@NgModule({
  declarations: [
    ProjectsStatComponent,
    RevenuecDigitalTotalComponent,
    DigitalPercentComponent,
    CountryPercentComponent,
    YoutubePercentComponent,
    PriceNamePercentComponent,
    TableRevenueArtComponent,
    TableRevenueTrackComponent,
    ConfirmDeleteModalComponent,
    ViewPercentComponent,
    ViewTotalComponent
  ],
  imports: [
    CommonModule,
    NgbTooltipModule,
    NgbProgressbarModule,
    CountToModule,
    FeatherModule.pick(allIcons),
    NgApexchartsModule,
    TranslateModule,
    FormsModule
  ],
  exports: [
    ProjectsStatComponent,
    RevenuecDigitalTotalComponent,
    DigitalPercentComponent,
    CountryPercentComponent,
    YoutubePercentComponent,
    PriceNamePercentComponent,
    TableRevenueArtComponent,
    TableRevenueTrackComponent,
    ConfirmDeleteModalComponent,
    ViewPercentComponent,
    ViewTotalComponent
  ]
})
export class WidgetModule { }
