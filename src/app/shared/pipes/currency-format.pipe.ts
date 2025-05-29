import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number | null | undefined): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '0';
    }

    const absValue = Math.abs(value);

    if (absValue >= 1000000000) {
      // Tỉ
      const billions = value / 1000000000;
      return this.formatNumber(billions) + ' Tỷ';
    } else if (absValue >= 1000000) {
      // Triệu
      const millions = value / 1000000;
      return this.formatNumber(millions) + ' Triệu';
    } else if (absValue >= 1000) {
      // Nghìn
      const thousands = value / 1000;
      return this.formatNumber(thousands) + ' Nghìn';
    } else {
      return value.toLocaleString('vi-VN');
    }
  }

  private formatNumber(num: number): string {
    // Làm tròn đến 2 chữ số thập phân và loại bỏ số 0 thừa
    const rounded = Math.round(num * 100) / 100;
    return rounded.toLocaleString('vi-VN', { maximumFractionDigits: 2 });
  }
} 