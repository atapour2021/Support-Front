import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface IPageChange {
  page: number;
  pageSize: number;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() page = 1;
  @Input() pageSize = 10;
  @Input() totalElement!: number;

  totalPages!: number;

  @Output() pageChanged = new EventEmitter<IPageChange>();

  constructor() {}

  ngOnInit(): void {
    if (this.totalElement) this.calculateTotalPages();
  }

  onNextPageClick(): void {
    this.page = this.page + 1;
    const body: IPageChange = {
      page: this.page,
      pageSize: this.pageSize,
    };
    this.calculateTotalPages();
    this.pageChanged.emit(body);
  }

  onPrevPageClick(): void {
    this.page = this.page - 1;
    const body: IPageChange = {
      page: this.page,
      pageSize: this.pageSize,
    };

    this.pageChanged.emit(body);
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalElement / this.pageSize);
  }
}
