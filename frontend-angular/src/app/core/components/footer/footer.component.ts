import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: '<footer class="footer"><p>© 2024 AxisRide - Tous droits réservés</p></footer>',
  styles: ['.footer { background: #2c3e50; color: white; padding: 20px; text-align: center; margin-top: auto; }']
})
export class FooterComponent {}
