export interface IChartDto {
  date: string;
  name: string;
  value: number;
}

export class InvoiceReportDto implements IInvoiceReportDto {
  startDate!: string;
  endDate!: string;
  taxpayerAggregateId!: string;

  init(data: IInvoiceReportDto): void {
    this.startDate = data['startDate'];
    this.endDate = data['endDate'];
    this.taxpayerAggregateId = data['taxpayerAggregateId'];
  }
}
export interface IInvoiceReportDto {
  startDate: string;
  endDate: string;
  taxpayerAggregateId: string;
}
