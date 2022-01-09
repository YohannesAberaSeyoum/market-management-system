import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { btn } from 'src/app/Models/button';
import { ProductItem } from 'src/app/store/models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: ProductItem = {name: "", category_name: "", subcategory_name: "", quantity: 0}

  updateBtn: btn = {
    color: "warning",
    text: "Update",
    sm: "5",
    mx: "2"
  }

  deleteBtn: btn = {
    color: "danger",
    text: "Delete",
    sm: "5",
    mx: "2"
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  updateProduct(){
    this.router.navigate([`updateProduct/${this.product.category_name}/${this.product.subcategory_name}/${this.product.name}`])
  }

  deleteProduct(){
    this.router.navigate([`/deleteProduct/${this.product.category_name}/${this.product.subcategory_name}/${this.product.name}`])
  }

}
