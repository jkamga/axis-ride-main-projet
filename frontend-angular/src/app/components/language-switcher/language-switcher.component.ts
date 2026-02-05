import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block">
      <button 
        (click)="toggleDropdown()"
        class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
        </svg>
        <span class="text-sm font-medium">{{ currentLang.toUpperCase() }}</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      <div *ngIf="isOpen" 
        class="absolute right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-lg z-50">
        <button
          *ngFor="let lang of languages"
          (click)="switchLanguage(lang.code)"
          class="w-full px-4 py-2 text-left hover:bg-muted transition-colors flex items-center gap-2"
          [class.bg-primary/10]="currentLang === lang.code">
          <span class="text-lg">{{ lang.flag }}</span>
          <span class="text-sm">{{ lang.name }}</span>
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class LanguageSwitcherComponent {
  currentLang = 'fr';
  isOpen = false;

  languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ];

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || 'fr';
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  switchLanguage(lang: string): void {
    this.currentLang = lang;
    this.translate.use(lang);
    this.isOpen = false;
    localStorage.setItem('language', lang);
  }
}
