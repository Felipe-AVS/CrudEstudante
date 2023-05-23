import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from './client';
import { Observable } from 'rxjs';
import { Supplier } from './supplier';


@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }
  url = "http://localhost:3000/supplier";

  getClient() : Observable<Supplier[]>{
    let url = "http://localhost:3000/supplier";
    return this.http.get<Supplier[]>(this.url);

  }

  save(supplier : Supplier) : Observable<Supplier>{
    return this.http.post<Supplier>(this.url, supplier);
  }

  delete(supplier : Supplier) : Observable<void>{
    return this.http.delete<void>(`${this.url}/${supplier.id}`);
  }

  
  update(supplier : Supplier) : Observable<Supplier>{
    return this.http.put<Supplier>(`${this.url}/${supplier.id}`, supplier);
  }
 
}