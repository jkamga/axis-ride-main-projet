import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Cookie Policy Component
 * Converted from: CookiesPage.jsx
 * 
 * Features:
 * - Cookie Content
 */
@Component({
  selector: 'app-cookies',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss']
})
export class CookiesComponent implements OnInit {
  isLoading = true;
  lastUpdated = 'Janvier 2024';
  cookieTypes = [
    {
      key: 'essential',
      nameKey: 'cookies.types.essential.name',
      descriptionKey: 'cookies.types.essential.description',
      required: true,
      examplesKeys: [
        'cookies.types.essential.examples.0',
        'cookies.types.essential.examples.1',
        'cookies.types.essential.examples.2'
      ]
    },
    {
      key: 'performance',
      nameKey: 'cookies.types.performance.name',
      descriptionKey: 'cookies.types.performance.description',
      required: false,
      examplesKeys: [
        'cookies.types.performance.examples.0',
        'cookies.types.performance.examples.1'
      ]
    },
    {
      key: 'functional',
      nameKey: 'cookies.types.functional.name',
      descriptionKey: 'cookies.types.functional.description',
      required: false,
      examplesKeys: [
        'cookies.types.functional.examples.0',
        'cookies.types.functional.examples.1'
      ]
    },
    {
      key: 'advertising',
      nameKey: 'cookies.types.advertising.name',
      descriptionKey: 'cookies.types.advertising.description',
      required: false,
      examplesKeys: [
        'cookies.types.advertising.examples.0',
        'cookies.types.advertising.examples.1'
      ]
    }
  ];

  sections = [
    { id: 'definition', titleKey: 'cookies.sections.definition.title', contentKey: 'cookies.sections.definition.content' },
    { id: 'usage', titleKey: 'cookies.sections.usage.title', contentKey: 'cookies.sections.usage.content' },
    { id: 'management', titleKey: 'cookies.sections.management.title', contentKey: 'cookies.sections.management.content' },
    { id: 'duration', titleKey: 'cookies.sections.duration.title', contentKey: 'cookies.sections.duration.content' },
    { id: 'thirdParty', titleKey: 'cookies.sections.thirdParty.title', contentKey: 'cookies.sections.thirdParty.content' },
    { id: 'rights', titleKey: 'cookies.sections.rights.title', contentKey: 'cookies.sections.rights.content' },
    { id: 'changes', titleKey: 'cookies.sections.changes.title', contentKey: 'cookies.sections.changes.content' },
    { id: 'contact', titleKey: 'cookies.sections.contact.title', contentKey: 'cookies.sections.contact.content' }
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
