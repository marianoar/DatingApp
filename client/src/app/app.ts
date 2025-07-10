import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Dating App');

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://localhost:7278/api/members').subscribe({
      next: response => console.log({ response }),
      error: err => console.log(err),
      complete: () => console.log('completed request')
    })
  }
}
