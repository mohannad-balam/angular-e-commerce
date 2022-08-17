import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/products`);
  }

  getAllCategories(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/products/categories`);
  }

  getProductsByCategory(key:string): Observable<any> {
    return key == 'all' ? this.getAllProducts() : this.http.get(`${environment.apiUrl}/products/category/${key}`);
  }

  getProductById(id:any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/products/${id}`);
  }
}
