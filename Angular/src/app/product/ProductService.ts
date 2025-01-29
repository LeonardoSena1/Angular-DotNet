import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Api_Key, API_URL } from '../urlConfigs';
import { ProductDTO } from './productDTO';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private apiUrl = API_URL + "/api/products";
    private headers = new HttpHeaders().set('api-key', Api_Key);

    constructor(private http: HttpClient) { }

    getProductById(id: number): Observable<ProductDTO> {
        return this.http.get<ProductDTO>(`${this.apiUrl}/${id}`, { headers: this.headers });
    }

    getAll(): Observable<ProductDTO[]> {
        return this.http.get<ProductDTO[]>(this.apiUrl, { headers: this.headers });
    }

    createOrEdit(product: ProductDTO): Observable<ProductDTO> {
        return this.http.post<ProductDTO>(this.apiUrl, product, { headers: this.headers });
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.headers });
    }

}
