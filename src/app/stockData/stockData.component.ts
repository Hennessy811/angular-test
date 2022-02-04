import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'stock-data',
  templateUrl: './stockData.component.html',
  styleUrls: ['./stockData.component.scss']
})
export class StockData implements OnInit {
  public date: string = '';
  public dataLoaded: boolean = false;
  public data: Data;
  private readonly apiURL: string = 'https://jsonmock.hackerrank.com/api/stocks?date=';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  submit() {
    if (this.date !== '') {
      console.log('submitting ', this.date);

      this.http.get<ApiResponse>(this.apiURL + this.sanitizeDate(this.date)).subscribe((response: ApiResponse) => {
        this.data = response.data[0];
        this.dataLoaded = true;
      });
    }  
  }

  private sanitizeDate(date: string): string {
    if (date.startsWith('0')) {
      return date.slice(1);
    }

    return date;
  }
}

interface Data {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Data[];
}
