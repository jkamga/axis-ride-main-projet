import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  mobileMenuOpen = false;
  isAuthenticated = false;
  currentYear = new Date().getFullYear();

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
      step: '1',
      titleKey: 'landing.howItWorks.search.title',
      descriptionKey: 'landing.howItWorks.search.description',
      icon: 'map-pin'
    },
    {
      step: '2',
      titleKey: 'landing.howItWorks.book.title',
      descriptionKey: 'landing.howItWorks.book.description',
      icon: 'calendar'
    },
    {
      step: '3',
      titleKey: 'landing.howItWorks.travel.title',
      descriptionKey: 'landing.howItWorks.travel.description',
      icon: 'car'
    }
  ];

  testimonials = [
    {
      name: 'Marie D.',
      role: 'Passagère régulière',
      content: 'AxisRide a transformé mes trajets quotidiens. Je fais des économies et je rencontre des personnes formidables !',
      rating: 5,
      image: 'https://i.pravatar.cc/150?img=1'
    },
    {
      name: 'Jean K.',
      role: 'Conducteur',
      content: 'Excellent moyen de rentabiliser mes trajets. L\'application est intuitive et le paiement sécurisé.',
      rating: 5,
      image: 'https://i.pravatar.cc/150?img=12'
    },
    {
      name: 'Sophie L.',
      role: 'Étudiante',
      content: 'Parfait pour mes déplacements entre la ville et mon campus. Économique et écologique !',
      rating: 5,
      image: 'https://i.pravatar.cc/150?img=5'
    }
  ];

  constructor(
    private router: Router,
    private translate: TranslateService
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

  getStarArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
