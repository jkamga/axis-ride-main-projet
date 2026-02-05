import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

/**
 * About Component
 * Converted from: AboutPage.jsx
 * 
 * Features:
 * - Mission
 * - Team
 * - Timeline
 */
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  isLoading = true;
  values = [
    {
      icon: 'heart',
      titleKey: 'about.values.community.title',
      descriptionKey: 'about.values.community.description'
    },
    {
      icon: 'target',
      titleKey: 'about.values.accessibility.title',
      descriptionKey: 'about.values.accessibility.description'
    },
    {
      icon: 'globe',
      titleKey: 'about.values.sustainability.title',
      descriptionKey: 'about.values.sustainability.description'
    },
    {
      icon: 'award',
      titleKey: 'about.values.excellence.title',
      descriptionKey: 'about.values.excellence.description'
    }
  ];

  team = [
    {
      nameKey: 'about.team.amadou.name',
      roleKey: 'about.team.amadou.role',
      bioKey: 'about.team.amadou.bio',
      initials: 'AD'
    },
    {
      nameKey: 'about.team.fatou.name',
      roleKey: 'about.team.fatou.role',
      bioKey: 'about.team.fatou.bio',
      initials: 'FS'
    },
    {
      nameKey: 'about.team.moussa.name',
      roleKey: 'about.team.moussa.role',
      bioKey: 'about.team.moussa.bio',
      initials: 'MK'
    },
    {
      nameKey: 'about.team.aicha.name',
      roleKey: 'about.team.aicha.role',
      bioKey: 'about.team.aicha.bio',
      initials: 'AT'
    }
  ];

  milestones = [
    { year: '2022', eventKey: 'about.timeline.2022_1' },
    { year: '2023', eventKey: 'about.timeline.2023_1' },
    { year: '2023', eventKey: 'about.timeline.2023_2' },
    { year: '2024', eventKey: 'about.timeline.2024_1' },
    { year: '2024', eventKey: 'about.timeline.2024_2' }
  ];

  constructor() {}

  ngOnInit(): void {
    // TODO: Load data
    this.isLoading = false;
  }
}
