import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataListService {
  constructor(public http: HttpClient) {}

  getData() {
    return this.http.get(
      'https://projectapi.gerasim.in/api/PropertyBookingController/GetAllCustomer',
    );
  }

  postData(body: any) {
    return this.http.post(
      'https://projectapi.gerasim.in/api/PropertyBookingController/AddCustomer',
      body,
    );
  }

  getById(id: number) {
    return this.http.get(
      'https://projectapi.gerasim.in/api/PropertyBookingController/GetCustomerById',
      {
        params: {
          id: id,
        },
      },
    );
  }

  putData(body: any) {
    return this.http.put(
      'https://projectapi.gerasim.in/api/PropertyBookingController/UpdateCustomer',
      body,
    );
  }

  deleteData(id: number) {
    return this.http.delete(
      'https://projectapi.gerasim.in/api/PropertyBookingController/DeleteCustomerById=' +
        id,
    );
  }
}
