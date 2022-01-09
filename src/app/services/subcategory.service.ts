import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryModel } from '../Models/Category';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private http:HttpClient) {
   }

    fetchAll(username: string) {
        const url = `http://localhost:8091/subcategories/`
        return this.http.get(url, {params: {username}})
    } 

    getSubcategory(name: String, body: any){
      const url = `http://localhost:8091/category/${name}`
      return this.http.get(url, {params: body})
    }

    addSubcategory(body: CategoryModel){
      const url = "http://localhost:8091/category"
      return this.http.post(url, body)
    }

    updateSubcategory(body: CategoryModel, pname: String){
      const url = `http://localhost:8091/category/${pname}`
      return this.http.patch(url, body)
    }

    deleteSubcategory(body: CategoryModel, pname: String){
      const url = `http://localhost:8091/category/${pname}`
    }
}
