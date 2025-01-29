import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../urlConfigs';
import { OrdersOutput } from './orderOutputDTO';
import { CustomerDTO } from '../customer/customerDTO';
import { UserDTO } from '../user/userDTO';
import { CreateOrderDto } from './createOrderDto';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private apiUrl = API_URL + "/api/orders";

    constructor(private http: HttpClient) { }

    getProductById(id: number): Observable<OrdersOutput> {
        return this.http.get<OrdersOutput>(`${this.apiUrl}/${id}`);
    }

    getAll(): Observable<OrdersOutput[]> {
        return this.http.get<OrdersOutput[]>(this.apiUrl);
    }

    createOrEdit(product: CreateOrderDto): Observable<CreateOrderDto> {
        return this.http.post<CreateOrderDto>(this.apiUrl, product);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    getAllCustomerForLookupTable(filterText: string): Observable<CustomerDTO[]> {
        return this.http.get<CustomerDTO[]>(`${this.apiUrl}/GetAllCustomerForLookupTable?filterText=${filterText}`);
    }

    getAllUserForLookupTable(filterText: string): Observable<UserDTO[]> {
        return this.http.get<UserDTO[]>(`${this.apiUrl}/GetAllUserForLookupTable?filterText=${filterText}`);
    }
}
