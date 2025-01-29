import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Api_Key, API_URL } from '../urlConfigs';
import { CustomerDTO } from './customerDTO';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    private apiUrl = API_URL + "/api/customer";
    private headers = new HttpHeaders().set('api-key', Api_Key);

    constructor(private http: HttpClient) { }

    getProductById(id: number): Observable<CustomerDTO> {
        return this.http.get<CustomerDTO>(`${this.apiUrl}/${id}`, { headers: this.headers });
    }

    getAll(): Observable<CustomerDTO[]> {
        return this.http.get<CustomerDTO[]>(this.apiUrl, { headers: this.headers });
    }

    createOrEdit(product: CustomerDTO): Observable<CustomerDTO> {
        return this.http.post<CustomerDTO>(this.apiUrl, product, { headers: this.headers });
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.headers });
    }

}
