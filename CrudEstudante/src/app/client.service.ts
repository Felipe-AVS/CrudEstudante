import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from './client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }
  url = "http://localhost:3000/clients";

  getClient() : Observable<Client[]>{
    let url = "http://localhost:3000/clients";
    return this.http.get<Client[]>(this.url);

  }

  save(client : Client) : Observable<Client>{
    return this.http.post<Client>(this.url, client);
  }

  delete(client : Client) : Observable<void>{
    return this.http.delete<void>(`${this.url}/${client.id}`);
  }

  
  update(client : Client) : Observable<Client>{
    return this.http.put<Client>(`${this.url}/${client.id}`, client);
  }
 
}
