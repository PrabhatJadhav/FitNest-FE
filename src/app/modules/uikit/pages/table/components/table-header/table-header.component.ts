import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: '[app-table-header]',
  standalone: true,
  imports: [],
  templateUrl: './table-header.component.html',
  styleUrl: './table-header.component.scss',
})
export class TableHeaderComponent {
  @Output() onCheck = new EventEmitter<boolean>();

  public toggle(event: Event) {
    const value = (event.target as HTMLInputElement).checked;
    this.onCheck.emit(value);
  }
}
