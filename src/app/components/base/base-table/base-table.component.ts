import { Component,
  EventEmitter,
  Input,
  OnInit,
  Output } from '@angular/core';

@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss']
})
export class BaseTableComponent implements OnInit {
  @Input() cols!: any[];
  @Input() rows!: any[];
  @Input() isLoaded!: boolean;
  @Input() actions!: string[];
  @Output() routerHandler = new EventEmitter<any>();
  @Output() deleteHandler = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
