import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css']
})
export class CustomInputComponent implements OnInit {
  @Input() label:String = "";
  @Input() name:String = "";
  @Input() type:String = "text";
  @Input() placeholder:String = "";

  constructor() { }

  ngOnInit(): void {
  }

}
