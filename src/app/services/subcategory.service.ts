import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubcategoryItem } from '../store/models/subcategory.model';

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

    getSubcategory(username: string, param : {category: string, name: string}){
      const url = `http://localhost:8091/subcategory/${param.category}/${param.name}`
      return this.http.get(url, {params: {username}})
    }

    addSubcategory(body: SubcategoryItem){
      const url = `http://localhost:8091/subcategory/${body.category_name}`
      return this.http.post(url, body)
    }

    updateSubcategory(body: SubcategoryItem, param : {category: string, name: string}){
      const url = `http://localhost:8091/subcategory/${param.category}/${param.name}`
      return this.http.patch(url, body)
    }

    deleteSubcategory(username: string,param : {category: string, name: string}){
      const url = `http://localhost:8091/subcategory/${param.category}/${param.name}`
      return this.http.delete(url, {params: {username}})
    }
}
