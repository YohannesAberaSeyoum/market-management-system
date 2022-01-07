import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.css']
})
export class AddUpdateProductComponent implements OnInit {
  product: any;
  name: string = "please";

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params)
  }

  toAddCategory = () => {
    this.router.navigate(["/addCategory"])
  }

  toAddSubcategory = () => {
    this.router.navigate(["/addSubcategory"])
  }

}
