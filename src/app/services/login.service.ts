import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIEndPoint } from '../_miscellaneous/ApiEndPoint';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getUserList(){
    return this.http.get(APIEndPoint.ENDPOINT_URL);
  }

  updateUser(payload:any){
    return this.http.put(APIEndPoint.ENDPOINT_URL + payload?.id , payload);
  }
}
