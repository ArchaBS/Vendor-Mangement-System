import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = "http://127.0.0.1:8000/api/";

  constructor(private http: HttpClient) { }

  register(data:any){
    return this.http.post(this.baseUrl + "register/", data)
  }
  login(data:any){
    return this.http.post(this.baseUrl + "login/", data)
  }
  getProducts(){
    return this.http.get(
      this.baseUrl + "products/",
      this.getAuthHeaders()
    )
  }
  
  deleteProduct(id:any){
    return this.http.delete(
      this.baseUrl + "products/" + id + "/",
      this.getAuthHeaders()
    )
  }
  addProduct(data:any){
    return this.http.post(
      this.baseUrl + "products/",
      data,
      this.getAuthHeaders()
    )
  }
  
  updateProduct(id: any, data: any) {
    return this.http.put(
      this.baseUrl + "products/" + id + "/",
      data,
      this.getAuthHeaders()  
    )
  }

  getAuthHeaders(){

    const token = localStorage.getItem('token')
  
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    }
  
  }

}
