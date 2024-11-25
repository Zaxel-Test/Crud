import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataListService {

  constructor(public http:HttpClient) { }
  getData(){
    return this.http.get("https://apitester.ir/api/Products")
  }
}
