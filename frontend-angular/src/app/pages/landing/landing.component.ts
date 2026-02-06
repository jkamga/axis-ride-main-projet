import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../../components/language-switcher/language-switcher.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  readonly LanguageSwitcherComponent = LanguageSwitcherComponent;
  mobileMenuOpen = false;
  isAuthenticated = false;

  features = [
    {
      icon: 'car',
      titleKey: 'landing.features.reliable.title',
      descriptionKey: 'landing.features.reliable.description'
    },
    {
      icon: 'users',
      titleKey: 'landing.features.community.title',
      descriptionKey: 'landing.features.community.description'
    },
    {
      icon: 'shield',
      titleKey: 'landing.features.payment.title',
      descriptionKey: 'landing.features.payment.description'
    },
    {
      icon: 'wallet',
      titleKey: 'landing.features.price.title',
      descriptionKey: 'landing.features.price.description'
    }
  ];

  stats = [
    { value: '10K+', labelKey: 'landing.stats.users' },
    { value: '5K+', labelKey: 'landing.stats.trips' },
    { value: '50+', labelKey: 'landing.stats.axes' },
    { value: '98%', labelKey: 'landing.stats.satisfaction' }
  ];

  howItWorks = [
    {
      step: '01',
      titleKey: 'landing.howItWorks.step1.title',
      descriptionKey: 'landing.howItWorks.step1.description'
    },
    {
      step: '02',
      titleKey: 'landing.howItWorks.step2.title',
      descriptionKey: 'landing.howItWorks.step2.description'
    },
    {
      step: '03',
      titleKey: 'landing.howItWorks.step3.title',
      descriptionKey: 'landing.howItWorks.step3.description'
    }
  ];

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check auth status
    this.isAuthenticated = !!localStorage.getItem('access_token');
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  navigateTo(route: string, queryParams?: any): void {
    this.router.navigate([route], { queryParams });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    this.mobileMenuOpen = false;
  }

}
