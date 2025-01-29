import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../urlConfigs';
import { ProductDTO } from './productDTO';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private apiUrl = API_URL + "/api/products";

    constructor(private http: HttpClient) { }

    getProductById(id: number): Observable<ProductDTO> {
        return this.http.get<ProductDTO>(`${this.apiUrl}/${id}`);
    }

    getAll(): Observable<ProductDTO[]> {
        return this.http.get<ProductDTO[]>(this.apiUrl);
    }

    createOrEdit(product: ProductDTO): Observable<ProductDTO> {
        return this.http.post<ProductDTO>(this.apiUrl, product);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

}
