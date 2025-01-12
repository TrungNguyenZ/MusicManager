import { Component, OnInit, ViewChild } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { DashboardApiService } from 'src/app/core/services/dashboard-api.service';
import { LanguageService } from 'src/app/core/services/language.service';


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
    public dashboardApiService: DashboardApiService
  ) {

  }

  ngOnInit(): void {
    this.isAdmin = JSON.parse(localStorage.getItem('currentUser') ??'')?.isAdmin
    this.breadCrumbItems = [
      { label: 'Dashboards' },
      { label: 'Projects', active: true }
    ];
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
}
