import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})

export class SharedService {
  readonly APIUrl = "https://localhost:5001/api";
  constructor(private http: HttpClient) { }
  getBookList(): Observable<any[]> {
    
    let userInfo=JSON.parse(localStorage.getItem("userInfo") || '{}');
    const header=new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${userInfo.Token}`
    })
    return this.http.get<any>(this.APIUrl + '/book',{headers:header});
  }
  addBookList(val: any): Observable<any> {
    return this.http.post(this.APIUrl + '/book', val);
  }
  deleteBookList(val: number) {
    return this.http.delete(this.APIUrl + '/book/' + val);
  }
  public login(username:string,pwd:string)
  {
    const body={
      username:username,
      pwd:pwd
    }
    return this.http.post(this.APIUrl+"/auth/login",body);
  }
}