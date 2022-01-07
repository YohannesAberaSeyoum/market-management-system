import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-update-category',
  templateUrl: './add-update-category.component.html',
  styleUrls: ['./add-update-category.component.css']
})
export class AddUpdateCategoryComponent implements OnInit {
  name: String = "Bravo"

  constructor() { }

  ngOnInit(): void {
  }

}
