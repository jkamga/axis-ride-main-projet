import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';

interface Group {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  avatar?: string;
  coverImage?: string;
  isPublic: boolean;
  createdBy: string;
  createdAt: string;
  tags: string[];
  isMember?: boolean;
  isPending?: boolean;
}

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, ReactiveFormsModule, FormsModule],
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  isLoading = true;
  isAuthenticated = false;

  currentTab: 'discover' | 'myGroups' = 'discover';

  allGroups: Group[] = [];
  myGroups: Group[] = [];
  featuredGroups: Group[] = [];

  searchQuery = '';
  selectedCategory = 'all';
  categories = [
    { value: 'all', label: 'groups.categories.all' },
    { value: 'carpooling', label: 'groups.categories.carpooling' },
    { value: 'commute', label: 'groups.categories.commute' },
    { value: 'roadTrips', label: 'groups.categories.roadTrips' },
    { value: 'events', label: 'groups.categories.events' },
    { value: 'business', label: 'groups.categories.business' },
    { value: 'other', label: 'groups.categories.other' }
  ];

  showCreateModal = false;
  showJoinModal = false;
  selectedGroup: Group | null = null;

  createGroupForm: FormGroup;
  joinRequestForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createGroupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['carpooling', Validators.required],
      isPublic: [true],
      tags: [[]]
    });

    this.joinRequestForm = this.fb.group({
      message: ['', Validators.minLength(10)]
    });
  }

  ngOnInit(): void {
    this.checkAuth();
    this.loadGroups();
  }

  checkAuth(): void {
    const user = localStorage.getItem('user');
    this.isAuthenticated = !!user;
  }

  loadGroups(): void {
    this.isLoading = true;

    // Mock data - replace with actual API call
    setTimeout(() => {
      this.allGroups = [
        {
          id: '1',
          name: 'Covoiturage Dakar-Thiès',
          description: 'Groupe pour organiser des trajets réguliers entre Dakar et Thiès. Partage de frais, horaires flexibles.',
          category: 'carpooling',
          memberCount: 342,
          isPublic: true,
          createdBy: 'Amadou Diallo',
          createdAt: '2024-01-15',
          tags: ['dakar', 'thies', 'quotidien'],
          isMember: true
        },
        {
          id: '2',
          name: 'Trajets Professionnels Abidjan',
          description: 'Réseau de professionnels pour trajets domicile-travail à Abidjan. Ponctualité garantie.',
          category: 'commute',
          memberCount: 156,
          isPublic: true,
          createdBy: 'Fatou Sall',
          createdAt: '2024-02-20',
          tags: ['abidjan', 'business', 'matin'],
          isMember: false
        },
        {
          id: '3',
          name: 'Weekend Road Trips',
          description: 'Découvrez l\'Afrique de l\'Ouest en groupe ! Organisation de road trips le weekend.',
          category: 'roadTrips',
          memberCount: 89,
          isPublic: true,
          createdBy: 'John Doe',
          createdAt: '2023-11-10',
          tags: ['weekend', 'voyage', 'aventure'],
          isMember: false
        },
        {
          id: '4',
          name: 'Étudiants UCAD',
          description: 'Groupe pour les étudiants de l\'Université Cheikh Anta Diop. Trajets campus-ville.',
          category: 'commute',
          memberCount: 234,
          isPublic: false,
          createdBy: 'Marie Dupont',
          createdAt: '2024-03-05',
          tags: ['ucad', 'etudiant', 'campus'],
          isMember: false,
          isPending: true
        },
        {
          id: '5',
          name: 'Concert & Events Dakar',
          description: 'Organisons nos déplacements pour concerts, festivals et événements culturels à Dakar.',
          category: 'events',
          memberCount: 178,
          isPublic: true,
          createdBy: 'Ousmane Ba',
          createdAt: '2024-01-25',
          tags: ['concert', 'festival', 'culture'],
          isMember: true
        },
        {
          id: '6',
          name: 'Professionnels Zone Industrielle',
          description: 'Covoiturage pour employés de la zone industrielle de Dakar. Départ 7h-8h.',
          category: 'business',
          memberCount: 67,
          isPublic: false,
          createdBy: 'Ibrahim Ndiaye',
          createdAt: '2023-12-08',
          tags: ['industrie', 'matin', 'regulier'],
          isMember: false
        }
      ];

      this.myGroups = this.allGroups.filter(g => g.isMember);
      this.featuredGroups = this.allGroups.slice(0, 3);

      this.isLoading = false;
    }, 800);
  }

  setTab(tab: 'discover' | 'myGroups'): void {
    this.currentTab = tab;
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
  }

  get filteredGroups(): Group[] {
    let filtered = this.allGroups;

    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(g => g.category === this.selectedCategory);
    }

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(g =>
        g.name.toLowerCase().includes(query) ||
        g.description.toLowerCase().includes(query) ||
        g.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }

  openCreateModal(): void {
    if (!this.isAuthenticated) {
      // Redirect to auth
      return;
    }
    this.showCreateModal = true;
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
    this.createGroupForm.reset({
      name: '',
      description: '',
      category: 'carpooling',
      isPublic: true,
      tags: []
    });
  }

  submitCreateGroup(): void {
    if (this.createGroupForm.invalid) {
      return;
    }

    // Mock group creation
    const formValue = this.createGroupForm.value;
    const newGroup: Group = {
      id: String(this.allGroups.length + 1),
      name: formValue.name,
      description: formValue.description,
      category: formValue.category,
      isPublic: formValue.isPublic,
      tags: formValue.tags || [],
      memberCount: 1,
      createdBy: 'Current User',
      createdAt: new Date().toISOString().split('T')[0],
      isMember: true
    };

    this.allGroups.unshift(newGroup);
    this.myGroups.unshift(newGroup);
    this.closeCreateModal();
  }

  openJoinModal(group: Group): void {
    if (!this.isAuthenticated) {
      // Redirect to auth
      return;
    }

    this.selectedGroup = group;
    this.showJoinModal = true;
  }

  closeJoinModal(): void {
    this.showJoinModal = false;
    this.selectedGroup = null;
    this.joinRequestForm.reset({ message: '' });
  }

  submitJoinRequest(): void {
    if (!this.selectedGroup) return;

    if (!this.selectedGroup.isPublic && this.joinRequestForm.invalid) {
      return;
    }

    // Mock join request
    const groupIndex = this.allGroups.findIndex(g => g.id === this.selectedGroup!.id);
    if (groupIndex !== -1) {
      if (this.selectedGroup.isPublic) {
        this.allGroups[groupIndex].isMember = true;
        this.allGroups[groupIndex].memberCount++;
        this.myGroups.push(this.allGroups[groupIndex]);
      } else {
        this.allGroups[groupIndex].isPending = true;
      }
    }

    this.closeJoinModal();
  }

  leaveGroup(groupId: string): void {
    const groupIndex = this.allGroups.findIndex(g => g.id === groupId);
    if (groupIndex !== -1) {
      this.allGroups[groupIndex].isMember = false;
      this.allGroups[groupIndex].memberCount--;
      this.myGroups = this.myGroups.filter(g => g.id !== groupId);
    }
  }

  getCategoryIcon(category: string): string {
    switch (category) {
      case 'carpooling':
        return 'M3 13l2-5h14l2 5M5 13h14M5 13v5a1 1 0 001 1h1a1 1 0 001-1v-1h8v1a1 1 0 001 1h1a1 1 0 001-1v-5M7 13V9m10 4V9';
      case 'commute':
        return 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4';
      case 'roadTrips':
        return 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064';
      case 'events':
        return 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z';
      case 'business':
        return 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z';
      default:
        return 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z';
    }
  }
}
