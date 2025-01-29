import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Api_Key, API_URL } from '../urlConfigs';
import { UserDTO } from './userDTO';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private apiUrl = API_URL + "/api/users";
    private headers = new HttpHeaders().set('api-key', Api_Key);

    constructor(private http: HttpClient) { }

    getProductById(id: number): Observable<UserDTO> {
        return this.http.get<UserDTO>(`${this.apiUrl}/${id}`, { headers: this.headers });
    }

    getAll(): Observable<UserDTO[]> {
        return this.http.get<UserDTO[]>(this.apiUrl, { headers: this.headers });
    }

    createOrEdit(product: UserDTO): Observable<UserDTO> {
        return this.http.post<UserDTO>(this.apiUrl, product, { headers: this.headers });
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.headers });
    }

}
