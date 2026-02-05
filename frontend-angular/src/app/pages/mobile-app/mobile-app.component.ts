import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Mobile App Component
 * Converted from: MobileAppPage.jsx
 * 
 * Features:
 * - Features
 * - Screenshots
 * - Download
 */
@Component({
  selector: 'app-mobile-app',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './mobile-app.component.html',
  styleUrls: ['./mobile-app.component.scss']
})
export class MobileAppComponent implements OnInit {
  isLoading = true;

  constructor() {}

  ngOnInit(): void {
    // TODO: Load data
    this.isLoading = false;
  }
}
