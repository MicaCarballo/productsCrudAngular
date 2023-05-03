import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';
import {Observable} from "rxjs";
import { Product } from '../Interfaces/product';




@Injectable({
  providedIn: 'root'
})
export class ProductService {
private endpoint:string = enviroment.endPoint
private apiUrl : string =this.endpoint + "products/"
  constructor(private hhtp:HttpClient) { }
getList(): Observable<Product[]>{
  return this.hhtp.get<Product[]>(`${this.apiUrl}`)
}
add(model:Product):Observable<Product>{
  return this.hhtp.post<Product>(`${this.apiUrl}`, model)
}
update(idProduct: number, model:Product):Observable<Product>{
  return this.hhtp.patch<Product>(`${this.apiUrl}${idProduct}`, model)
}
delete(idProduct: number):Observable<void>{
  return this.hhtp.delete<void>(`${this.apiUrl}${idProduct}`)
}

}
