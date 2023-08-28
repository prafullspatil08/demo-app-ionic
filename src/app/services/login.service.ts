import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIEndPoint } from '../_miscellaneous/ApiEndPoint';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn = new BehaviorSubject<boolean>(false)
  constructor(private http: HttpClient) { }

  getUserList(){
    return this.http.get(APIEndPoint.ENDPOINT_URL);
  }

  updateUser(payload:any){
    return this.http.put(APIEndPoint.ENDPOINT_URL + payload?.id , payload);
  }
}
