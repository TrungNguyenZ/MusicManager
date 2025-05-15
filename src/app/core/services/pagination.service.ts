import { Injectable } from '@angular/core';

export class PaginationResult<T> {
  items: T[] = [];
  page: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  startIndex: number = 0;
  endIndex: number = 0;
}

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }

  /**
   * Phân trang dữ liệu
   * @param allData Dữ liệu gốc
   * @param page Trang hiện tại
   * @param pageSize Số lượng phần tử trên mỗi trang
   * @returns Kết quả phân trang
   */
  paginate<T>(allData: T[], page: number, pageSize: number): PaginationResult<T> {
    const result = new PaginationResult<T>();
    
    if (!allData || allData.length === 0) {
      return result;
    }
    
    result.totalItems = allData.length;
    result.page = page;
    result.pageSize = pageSize;
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, result.totalItems);
    
    result.items = allData.slice(startIndex, endIndex);
    result.startIndex = result.totalItems > 0 ? startIndex + 1 : 0;
    result.endIndex = endIndex;
    
    return result;
  }

  /**
   * Lọc dữ liệu theo từ khóa tìm kiếm
   * @param allData Dữ liệu gốc
   * @param searchTerm Từ khóa tìm kiếm
   * @param keys Các trường cần tìm kiếm
   * @returns Dữ liệu đã lọc
   */
  search<T>(allData: T[], searchTerm: string, keys: string[]): T[] {
    if (!searchTerm || searchTerm.trim() === '' || !allData || allData.length === 0) {
      return allData;
    }
    
    const term = searchTerm.toLowerCase().trim();
    
    return allData.filter((item: any) => {
      return keys.some(key => {
        const value = this.getNestedProperty(item, key);
        return value && String(value).toLowerCase().includes(term);
      });
    });
  }

  /**
   * Lấy giá trị của thuộc tính lồng nhau
   * @param obj Đối tượng cần lấy thuộc tính
   * @param path Đường dẫn đến thuộc tính (vd: 'user.name')
   * @returns Giá trị của thuộc tính
   */
  private getNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((prev, curr) => {
      return prev ? prev[curr] : null;
    }, obj);
  }
} 