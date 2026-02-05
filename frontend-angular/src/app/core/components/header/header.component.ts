import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../../../components/language-switcher/language-switcher.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, LanguageSwitcherComponent],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  mobileMenuOpen = false;
  isAuthenticated = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated = !!localStorage.getItem('access_token');
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  navigateTo(route: string, queryParams?: any): void {
    this.router.navigate([route], { queryParams });
    this.mobileMenuOpen = false;
  }

  scrollToSection(sectionId: string): void {
    if (this.router.url === '/' || this.router.url.startsWith('/#')) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      this.mobileMenuOpen = false;
      return;
    }

    this.router.navigate(['/'], { fragment: sectionId }).then(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      this.mobileMenuOpen = false;
    });
  }
}
