import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Careers Component
 * Converted from: CareersPage.jsx
 * 
 * Features:
 * - Job Listings
 * - Benefits
 * - Application
 */
@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss']
})
export class CareersComponent implements OnInit {
  isLoading = true;
  benefits = [
    { icon: 'heart', titleKey: 'careers.benefits.health.title', descriptionKey: 'careers.benefits.health.description' },
    { icon: 'plane', titleKey: 'careers.benefits.vacation.title', descriptionKey: 'careers.benefits.vacation.description' },
    { icon: 'graduation', titleKey: 'careers.benefits.training.title', descriptionKey: 'careers.benefits.training.description' },
    { icon: 'coffee', titleKey: 'careers.benefits.remote.title', descriptionKey: 'careers.benefits.remote.description' },
    { icon: 'zap', titleKey: 'careers.benefits.equity.title', descriptionKey: 'careers.benefits.equity.description' },
    { icon: 'users', titleKey: 'careers.benefits.teamBuilding.title', descriptionKey: 'careers.benefits.teamBuilding.description' }
  ];

  cultureValues = [
    { icon: 'heart', titleKey: 'careers.culture.values.impact.title', descriptionKey: 'careers.culture.values.impact.description' },
    { icon: 'users', titleKey: 'careers.culture.values.collaboration.title', descriptionKey: 'careers.culture.values.collaboration.description' },
    { icon: 'zap', titleKey: 'careers.culture.values.innovation.title', descriptionKey: 'careers.culture.values.innovation.description' },
    { icon: 'globe', titleKey: 'careers.culture.values.diversity.title', descriptionKey: 'careers.culture.values.diversity.description' }
  ];

  jobs = [
    {
      departmentKey: 'careers.jobs.fullStack.department',
      titleKey: 'careers.jobs.fullStack.title',
      descriptionKey: 'careers.jobs.fullStack.description',
      locationKey: 'careers.jobs.fullStack.location',
      typeKey: 'careers.jobs.fullStack.type'
    },
    {
      departmentKey: 'careers.jobs.productManager.department',
      titleKey: 'careers.jobs.productManager.title',
      descriptionKey: 'careers.jobs.productManager.description',
      locationKey: 'careers.jobs.productManager.location',
      typeKey: 'careers.jobs.productManager.type'
    },
    {
      departmentKey: 'careers.jobs.growthMarketing.department',
      titleKey: 'careers.jobs.growthMarketing.title',
      descriptionKey: 'careers.jobs.growthMarketing.description',
      locationKey: 'careers.jobs.growthMarketing.location',
      typeKey: 'careers.jobs.growthMarketing.type'
    },
    {
      departmentKey: 'careers.jobs.communityManager.department',
      titleKey: 'careers.jobs.communityManager.title',
      descriptionKey: 'careers.jobs.communityManager.description',
      locationKey: 'careers.jobs.communityManager.location',
      typeKey: 'careers.jobs.communityManager.type'
    },
    {
      departmentKey: 'careers.jobs.designer.department',
      titleKey: 'careers.jobs.designer.title',
      descriptionKey: 'careers.jobs.designer.description',
      locationKey: 'careers.jobs.designer.location',
      typeKey: 'careers.jobs.designer.type'
    },
    {
      departmentKey: 'careers.jobs.dataAnalyst.department',
      titleKey: 'careers.jobs.dataAnalyst.title',
      descriptionKey: 'careers.jobs.dataAnalyst.description',
      locationKey: 'careers.jobs.dataAnalyst.location',
      typeKey: 'careers.jobs.dataAnalyst.type'
    }
  ];

  constructor() {}

  ngOnInit(): void {
    // TODO: Load data
    this.isLoading = false;
  }
}
