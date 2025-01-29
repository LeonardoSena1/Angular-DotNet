import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../urlConfigs';
import { UserDTO } from './userDTO';

@Injectable({
    providedIn: 'root'
})
export class UserService {  

    private apiUrl = API_URL + "/api/users";

    constructor(private http: HttpClient) { }

    getProductById(id: number): Observable<UserDTO> {
        return this.http.get<UserDTO>(`${this.apiUrl}/${id}`);
    }

    getAll(): Observable<UserDTO[]> {
        return this.http.get<UserDTO[]>(this.apiUrl);
    }

    createOrEdit(product: UserDTO): Observable<UserDTO> {
        return this.http.post<UserDTO>(this.apiUrl, product);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

}
