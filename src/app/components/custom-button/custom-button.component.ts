import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent implements OnInit {
  @Input() color:String = "";
  @Input() text:String = "";
  @Input() col:String = "";
  @Input() mx:String = "";
  @Input() type:String = "button";

  constructor() { }

  ngOnInit(): void {
  }

}
