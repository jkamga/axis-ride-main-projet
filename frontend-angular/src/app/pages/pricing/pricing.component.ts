import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Pricing Component
 * Converted from: PricingPage.jsx
 * 
 * Features:
 * - Plans
 * - Features Comparison
 * - FAQ
 */
@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  isLoading = true;

  constructor() {}

  ngOnInit(): void {
    // TODO: Load data
    this.isLoading = false;
  }
}
