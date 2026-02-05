import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Terms of Service Component
 * Converted from: TermsPage.jsx
 * 
 * Features:
 * - Terms Content
 */
@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  isLoading = true;
  lastUpdated = 'Janvier 2024';
  sections = [
    { id: 'acceptance', titleKey: 'terms.sections.acceptance.title', contentKey: 'terms.sections.acceptance.content' },
    { id: 'services', titleKey: 'terms.sections.services.title', contentKey: 'terms.sections.services.content' },
    { id: 'registration', titleKey: 'terms.sections.registration.title', contentKey: 'terms.sections.registration.content' },
    { id: 'driverObligations', titleKey: 'terms.sections.driverObligations.title', contentKey: 'terms.sections.driverObligations.content' },
    { id: 'passengerObligations', titleKey: 'terms.sections.passengerObligations.title', contentKey: 'terms.sections.passengerObligations.content' },
    { id: 'payments', titleKey: 'terms.sections.payments.title', contentKey: 'terms.sections.payments.content' },
    { id: 'cancellation', titleKey: 'terms.sections.cancellation.title', contentKey: 'terms.sections.cancellation.content' },
    { id: 'liability', titleKey: 'terms.sections.liability.title', contentKey: 'terms.sections.liability.content' },
    { id: 'dataProtection', titleKey: 'terms.sections.dataProtection.title', contentKey: 'terms.sections.dataProtection.content' },
    { id: 'termination', titleKey: 'terms.sections.termination.title', contentKey: 'terms.sections.termination.content' },
    { id: 'disputes', titleKey: 'terms.sections.disputes.title', contentKey: 'terms.sections.disputes.content' },
    { id: 'contact', titleKey: 'terms.sections.contact.title', contentKey: 'terms.sections.contact.content' }
  ];

  constructor() {}

  ngOnInit(): void {
    // TODO: Load data
    this.isLoading = false;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
