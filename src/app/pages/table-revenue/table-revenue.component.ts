import { Component } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-table-revenue',
  templateUrl: './table-revenue.component.html',
  styleUrls: ['./table-revenue.component.scss']
})
export class TableRevenueComponent {
  constructor(public service: DataService){

  }
  year: any
  quarter: any
  data:any
  yearArray: number[] = []
  ngOnInit(): void {
    this.quarter = this.getQuarter()
    this.year = new Date().getFullYear();
    this.getYear()
    this.getList()
  }
  getList(){
    this.service.getTableRevenue(this.quarter, this.year).subscribe(x=>{
     this.data = x.data
     })
   }
   getYear() {
    let year = new Date().getFullYear();
    for (let i = 0; i < 3; i++) {
      this.yearArray.push(year)
      year--
    }
  }
  getQuarter(): number {
    const currentMonth = new Date().getMonth() + 1;
    return Math.ceil(currentMonth / 3);
  }
}
