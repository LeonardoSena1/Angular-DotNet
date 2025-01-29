import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../urlConfigs';
import { CustomerDTO } from './customerDTO';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    private apiUrl = API_URL + "/api/customer";

    constructor(private http: HttpClient) { }

    getProductById(id: number): Observable<CustomerDTO> {
        return this.http.get<CustomerDTO>(`${this.apiUrl}/${id}`);
    }

    getAll(): Observable<CustomerDTO[]> {
        return this.http.get<CustomerDTO[]>(this.apiUrl);
    }

    createOrEdit(product: CustomerDTO): Observable<CustomerDTO> {
        return this.http.post<CustomerDTO>(this.apiUrl, product);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

}
