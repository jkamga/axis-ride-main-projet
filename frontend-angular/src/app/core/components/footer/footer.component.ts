import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../../../components/language-switcher/language-switcher.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  readonly LanguageSwitcherComponent = LanguageSwitcherComponent;
}
