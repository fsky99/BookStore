import { Injectable } from '@angular/core';
import { environment } from './environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {}

  getAllLORBooks(){
    return this.http.get(`${environment.baseUrl}/getBooks`)
  }

}
