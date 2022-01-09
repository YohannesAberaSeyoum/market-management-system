import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryModel } from '../Models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) {
   }

    fetchAll(username: string) {
        const url = "http://localhost:8091/categories"
        return this.http.get(url, {params: {username}})
    } 

    getCategory(username: string, name: string){
      const url = `http://localhost:8091/category/${name}`
      return this.http.get(url, {params: {username}})
    }

    addCategory(body: CategoryModel){
      const url = "http://localhost:8091/category"
      return this.http.post(url, body)
    }

    updateCategory(body: CategoryModel, pname: String){
      console.log("Update", body, pname)
      const url = `http://localhost:8091/category/${pname}`
      return this.http.patch(url, body)
    }

    deleteCategory(username: string, pname: String){
      const url = `http://localhost:8091/category/${pname}`
      return this.http.delete(url, {params: {username}})
    }
}
