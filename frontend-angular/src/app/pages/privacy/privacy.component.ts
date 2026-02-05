import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Privacy Policy Component
 * Converted from: PrivacyPage.jsx
 * 
 * Features:
 * - Policy Content
 */
@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {
  isLoading = true;
  lastUpdated = 'Janvier 2024';

  sections = [
    { id: 'introduction', titleKey: 'privacy.sections.introduction.title', contentKey: 'privacy.sections.introduction.content' },
    { id: 'collection', titleKey: 'privacy.sections.collection.title', contentKey: 'privacy.sections.collection.content' },
    { id: 'usage', titleKey: 'privacy.sections.usage.title', contentKey: 'privacy.sections.usage.content' },
    { id: 'sharing', titleKey: 'privacy.sections.sharing.title', contentKey: 'privacy.sections.sharing.content' },
    { id: 'security', titleKey: 'privacy.sections.security.title', contentKey: 'privacy.sections.security.content' },
    { id: 'retention', titleKey: 'privacy.sections.retention.title', contentKey: 'privacy.sections.retention.content' },
    { id: 'rights', titleKey: 'privacy.sections.rights.title', contentKey: 'privacy.sections.rights.content' },
    { id: 'location', titleKey: 'privacy.sections.location.title', contentKey: 'privacy.sections.location.content' },
    { id: 'minors', titleKey: 'privacy.sections.minors.title', contentKey: 'privacy.sections.minors.content' },
    { id: 'international', titleKey: 'privacy.sections.international.title', contentKey: 'privacy.sections.international.content' },
    { id: 'changes', titleKey: 'privacy.sections.changes.title', contentKey: 'privacy.sections.changes.content' },
    { id: 'contact', titleKey: 'privacy.sections.contact.title', contentKey: 'privacy.sections.contact.content' }
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
