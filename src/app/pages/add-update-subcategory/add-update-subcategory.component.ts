import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-update-subcategory',
  templateUrl: './add-update-subcategory.component.html',
  styleUrls: ['./add-update-subcategory.component.css']
})
export class AddUpdateSubcategoryComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  toAddCategory(){
    this.router.navigate(["/addCategory"])
  }

}
