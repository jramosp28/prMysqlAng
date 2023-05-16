import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { formMoto } from 'src/interfaces/interface';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  private apiUrl = 'http://localhost:8080/user/';
  // private formularios$: BehaviorSubject<formMoto[]> = new BehaviorSubject<formMoto[]>([]);
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  GetLocalData(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }

  CreateUser(user: formMoto): Observable<formMoto> {
    console.log(user);
    return this.http.post<formMoto>(this.apiUrl, JSON.stringify(user), this.httpOptions).pipe(
      catchError((error) => {
        console.error('Error creating user:', error);
        return throwError(error);
      })
    );
  }

  // Actualizar un usuario
  UpdateUser(id: number, user: formMoto): Observable<any> {
    const usr_url: string = this.apiUrl + id;
    return this.http.put(usr_url, JSON.stringify(user), this.httpOptions);
  }

  // Eliminar un usuario
  DeleteUser(id: number): Observable<any> {
    const usr_url = `${this.apiUrl}${id}`;
    return this.http.delete(usr_url);
  }

  GetUserById(id: number): Observable<formMoto> {
    const url = `${this.apiUrl}${id}`;
    return this.http.get<formMoto>(url);
  }
}
