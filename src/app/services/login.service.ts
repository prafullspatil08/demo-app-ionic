import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIEndPoint } from '../_miscellaneous/ApiEndPoint';
import { BehaviorSubject } from 'rxjs';
import { usersData } from '../_miscellaneous/UserData';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn = new BehaviorSubject<boolean>(false)
  usersData = new BehaviorSubject<any>(usersData)
  constructor(private http: HttpClient) { }

  getUserList(){
    return this.http.get(APIEndPoint.ENDPOINT_URL);
  }

  updateUser(payload:any){
    return this.http.put(APIEndPoint.ENDPOINT_URL + payload?.id , payload);
  }

  saveUser(payload:any){
    return this.http.post(APIEndPoint.ENDPOINT_URL , payload);
  }
}
