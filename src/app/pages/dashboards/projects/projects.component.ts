import { Component, OnInit, ViewChild } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { DashboardApiService } from 'src/app/core/services/dashboard-api.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { ModalService } from 'src/app/shared/service/modal.service';
import { ExportExcelComponent } from './modal/export-excel/export-excel.component';
import { ImportExcelComponent } from './modal/import-excel/import-excel.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

/**
 * Projects Component
 */
export class ProjectsComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  statData!: any;
  OverviewChart: any;
  ActiveProjects: any;
  MyTask: any;
  TeamMembers: any;
  status7: any;
  chartData: any
  chartData1: any
  chartData2: any
  totalData = {
    totalForAll: 0,
    totalForQuarterYear: 0,
    totalForYear: 0
  }
  isAdmin = false
  constructor(
    public translate: TranslateService,
    public languageService: LanguageService,
    public dashboardApiService: DashboardApiService,
    public modalService: NgbModal,
  ) {

  }

  ngOnInit(): void {
    this.isAdmin = JSON.parse(localStorage.getItem('currentUser') ??'')?.isAdmin

    this.getData()
  }
  getData() {
    const input = {
      quarter: 1,
      year: 2024
    }
    this.dashboardApiService.getData(input).subscribe(x => {
      this.totalData = x.data
    })
  }
  openModalExport(){
    const modalRef = this.modalService.open(ExportExcelComponent, { size: 'xm', backdrop: 'static' });

  }
  openModalImport(){
    const modalRef = this.modalService.open(ImportExcelComponent, { size: 'xm', backdrop: 'static' });
  }
}