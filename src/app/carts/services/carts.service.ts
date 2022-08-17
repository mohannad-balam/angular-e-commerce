import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http:HttpClient) { }

  addNewCart(cart:any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/carts`, cart);
  }
}
