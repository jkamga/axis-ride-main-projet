import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Groups Component
 * Converted from: GroupsPage.jsx
 * 
 * Features:
 * - List Groups
 * - Create Group
 * - Join Group
 */
@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  isLoading = true;

  constructor() {}

  ngOnInit(): void {
    // TODO: Load data
    this.isLoading = false;
  }
}
