import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { ToastModule } from 'primeng/toast';
import { SpinnerService } from './services/spinner.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    ToastModule,
    CommonModule,
    ProgressSpinnerModule
  ],
})
export class AppComponent {
  spinnerVisible: boolean = false;

  constructor(
    private router: Router,
    private spinnerService: SpinnerService
  ) {
    this.spinnerService.spinnerVisible$.subscribe(visible => {
      this.spinnerVisible = visible;
    });
  }

  title = 'Angular';

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}

