import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalComponent } from "../../global-component";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` })
};


@Injectable({
  providedIn: 'root'
})
export class restApiService {
  constructor(private http: HttpClient) { }

  // Single
  getSingleCustomerData(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/customer/' + id, {  headers: headerToken, responseType: 'text' });
  }

  // Patch
  patchCustomerData(customers: any): Observable<any> {    
    return this.http.patch(GlobalComponent.API_URL + 'apps/customer/' + customers.ids, JSON.stringify(customers), httpOptions);
  }

  // Delete
  deleteCustomer(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.delete(GlobalComponent.API_URL + 'apps/customer/' + id, {  headers: headerToken, responseType: 'text' });
  }

  /**
   * Task List Rest Api
   */
  // Get
  getTaskData(): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/task', {  headers: headerToken, responseType: 'text' });
  }

  // POST
  postTaskData(task: any): Observable<any> {        
    return this.http.post(GlobalComponent.API_URL + 'apps/task',JSON.stringify(task), httpOptions);
  }

  // Single
  getSingleTaskData(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/task/' + id, {  headers: headerToken, responseType: 'text' });
  }

  // Patch
  patchTaskData(tasks: any): Observable<any> {    
    return this.http.patch(GlobalComponent.API_URL + 'apps/task/' + tasks.ids, JSON.stringify(tasks), httpOptions);
  }

  // Delete
  deleteTask(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.delete(GlobalComponent.API_URL + 'apps/task/' + id, {  headers: headerToken, responseType: 'text' });
  }

  /**
   * CRM Contect Rest Api
   */
  // Get
  getContactData(): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/contact', {  headers: headerToken, responseType: 'text' });
  }

  // POST
  postContactData(contact: any): Observable<any> {            
    return this.http.post(GlobalComponent.API_URL + 'apps/contact',JSON.stringify(contact), httpOptions);
  }

  // Single
  getSingleContactData(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/contact/' + id, {  headers: headerToken, responseType: 'text' });
  }

  // Patch
  patchContactData(contacts: any): Observable<any> {    
    return this.http.patch(GlobalComponent.API_URL + 'apps/contact/' + contacts.ids, JSON.stringify(contacts), httpOptions);
  }

   // Delete
   deleteContact(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.delete(GlobalComponent.API_URL + 'apps/contact/' + id, {  headers: headerToken, responseType: 'text' });
  }

  /**
   * CRM Company Rest Api
   */
  // Get
  getCompanyData(): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/company', {  headers: headerToken, responseType: 'text' });
  }

  // POST
  postCompanyData(company: any): Observable<any> {            
    return this.http.post(GlobalComponent.API_URL + 'apps/company',JSON.stringify(company), httpOptions);
  }

  // Single
  getSingleCompanyData(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/company/' + id, {  headers: headerToken, responseType: 'text' });
  }

  // Patch
  patchCompanyData(company: any): Observable<any> {    
    return this.http.patch(GlobalComponent.API_URL + 'apps/company/' + company.ids, JSON.stringify(company), httpOptions);
  }

  // Delete
  deleteCompany(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.delete(GlobalComponent.API_URL + 'apps/company/' + id, {  headers: headerToken, responseType: 'text' });
  }

  /* CRM Company Rest Api
  */
  // Get
  getLeadData(): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/lead', {  headers: headerToken, responseType: 'text' });
  }

   // POST
   postLeadData(company: any): Observable<any> {            
    return this.http.post(GlobalComponent.API_URL + 'apps/lead',JSON.stringify(company), httpOptions);
  }

  // Single
  getSingLeadData(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/lead/' + id, {  headers: headerToken, responseType: 'text' });
  }

  // Patch
  patchLeadData(company: any): Observable<any> {    
    return this.http.patch(GlobalComponent.API_URL + 'apps/lead/' + company.ids, JSON.stringify(company), httpOptions);
  }

  // Delete
  deletelead(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.delete(GlobalComponent.API_URL + 'apps/lead/' + id, {  headers: headerToken, responseType: 'text' });
  }


  /* Support Ticket Rest Api
  */
  // Get
  getTicketData(): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/ticket', {  headers: headerToken, responseType: 'text' });
  }

  // POST
  postTicketData(ticket: any): Observable<any> {            
    return this.http.post(GlobalComponent.API_URL + 'apps/ticket',JSON.stringify(ticket), httpOptions);
  }

  // Single
  getSingTicketData(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/ticket/' + id, {  headers: headerToken, responseType: 'text' });
  }

   // Patch
   patchTicketData(ticket: any): Observable<any> {    
    return this.http.patch(GlobalComponent.API_URL + 'apps/ticket/' + ticket.ids, JSON.stringify(ticket), httpOptions);
  }

  // Delete
  deleteTicket(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.delete(GlobalComponent.API_URL + 'apps/ticket/' + id, {  headers: headerToken, responseType: 'text' });
  }

  /**
  * Support Ticket Rest Api
  */
  // Get
  getInvoiceData(): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/invoice', {  headers: headerToken, responseType: 'text' });
  }

   // Delete
   deleteInvoice(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.delete(GlobalComponent.API_URL + 'apps/invoice/' + id, {  headers: headerToken, responseType: 'text' });
  }
}
