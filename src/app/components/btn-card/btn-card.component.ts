import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-card',
  templateUrl: './btn-card.component.html',
  styleUrls: ['./btn-card.component.scss'],
})
export class BtnCardComponent implements OnInit {

  @Input() cardTitle: string;
  @Input() cardContent: string;
  @Input() cardImage: string;

  constructor() { }

  ngOnInit() {}

}
