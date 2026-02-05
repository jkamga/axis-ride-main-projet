import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Profile Component
 * Converted from: ProfilePage.jsx
 * 
 * Features:
 * - Personal Info
 * - Avatar
 * - Documents
 * - Preferences
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isLoading = true;

  constructor() {}

  ngOnInit(): void {
    // TODO: Load data
    this.isLoading = false;
  }
}
