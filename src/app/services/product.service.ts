import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductItem } from '../store/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) {
   }

    fetchAll(username: string) {
        const url = `http://localhost:8091/products`
        return this.http.get(url, {params: {username}})
    } 

    fetchByCategory(username: string, category: string) {
        const url = `http://localhost:8091/products/${category}`
        return this.http.get(url, {params: {username}})
    } 
    fetchBySubcategory(username: string, param: {subcategory: string, category: string}) {
        const url = `http://localhost:8091/products/${param.category}/${param.subcategory}`
        return this.http.get(url, {params: {username}})
    } 

    getProduct(username: string, param: {name: string, category: string, subcategory: string}){
      const url = `http://localhost:8091/product/${param.category}/${param.subcategory}/${param.name}`
      return this.http.get(url, {params: {username}})
    }

    addProduct(body: ProductItem){
      console.log(body)
      const url = `http://localhost:8091/product/${body.category_name}/${body.subcategory_name}`
      return this.http.post(url, body)
    }

    updateProduct(body: ProductItem, param: {name: string, category: string, subcategory: string}){
      console.log("Updating", body)
      const url = `http://localhost:8091/product/${param.category}/${param.subcategory}/${param.name}`
      return this.http.patch(url, body)
    }

    deleteProduct(username: string, param: {name: string, category: string, subcategory: string}){
      const url = `http://localhost:8091/product/${param.category}/${param.subcategory}/${param.name}`
      return this.http.delete(url, {params: {username}})
    }
}
