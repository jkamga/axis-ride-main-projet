import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'passenger' | 'driver' | 'admin';
  avatar?: string;
  bio?: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  country?: string;
  verified: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  rating?: number;
  totalTrips?: number;
}

interface Document {
  id: string;
  type: 'license' | 'id' | 'insurance' | 'registration';
  name: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: string;
  url?: string;
}

interface Preferences {
  language: string;
  currency: string;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  privacy: {
    showPhone: boolean;
    showEmail: boolean;
    showProfile: boolean;
  };
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isLoading = true;
  isSaving = false;
  isEditing = false;

  currentTab: 'info' | 'documents' | 'preferences' | 'security' = 'info';

  userProfile: UserProfile | null = null;
  documents: Document[] = [];
  preferences: Preferences = {
    language: 'fr',
    currency: 'XOF',
    notifications: {
      email: true,
      sms: true,
      push: true
    },
    privacy: {
      showPhone: false,
      showEmail: false,
      showProfile: true
    }
  };

  profileForm: FormGroup;
  preferencesForm: FormGroup;
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      bio: [''],
      dateOfBirth: [''],
      address: [''],
      city: [''],
      country: ['']
    });

    this.preferencesForm = this.fb.group({
      language: ['fr'],
      currency: ['XOF'],
      emailNotifications: [true],
      smsNotifications: [true],
      pushNotifications: [true],
      showPhone: [false],
      showEmail: [false],
      showProfile: [true]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProfileData();
  }

  loadProfileData(): void {
    this.isLoading = true;

    // Mock data - replace with actual API call
    setTimeout(() => {
      const user = localStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        this.userProfile = {
          id: '1',
          fullName: userData.fullName || 'John Doe',
          email: userData.email || 'john.doe@example.com',
          phone: userData.phone || '+221771234567',
          role: userData.role || 'passenger',
          bio: 'Passionate traveler and carpooling enthusiast',
          dateOfBirth: '1990-01-15',
          address: '123 Avenue Hassan II',
          city: 'Dakar',
          country: 'Senegal',
          verified: true,
          emailVerified: true,
          phoneVerified: true,
          rating: 4.8,
          totalTrips: 24
        };

        this.profileForm.patchValue({
          fullName: this.userProfile.fullName,
          email: this.userProfile.email,
          phone: this.userProfile.phone,
          bio: this.userProfile.bio,
          dateOfBirth: this.userProfile.dateOfBirth,
          address: this.userProfile.address,
          city: this.userProfile.city,
          country: this.userProfile.country
        });

        if (this.userProfile.role === 'driver') {
          this.documents = [
            {
              id: '1',
              type: 'license',
              name: 'Driver License',
              status: 'approved',
              uploadedAt: '2025-01-15'
            },
            {
              id: '2',
              type: 'id',
              name: 'National ID Card',
              status: 'approved',
              uploadedAt: '2025-01-15'
            },
            {
              id: '3',
              type: 'insurance',
              name: 'Car Insurance',
              status: 'pending',
              uploadedAt: '2025-02-01'
            }
          ];
        }
      }

      this.isLoading = false;
    }, 800);
  }

  setTab(tab: 'info' | 'documents' | 'preferences' | 'security'): void {
    this.currentTab = tab;
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      // Reset form to original values
      this.loadProfileData();
    }
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.isSaving = true;

    // Mock save - replace with actual API call
    setTimeout(() => {
      const formValue = this.profileForm.value;
      if (this.userProfile) {
        this.userProfile = {
          ...this.userProfile,
          ...formValue
        };

        // Update localStorage
        const user = localStorage.getItem('user');
        if (user) {
          const userData = JSON.parse(user);
          localStorage.setItem('user', JSON.stringify({
            ...userData,
            fullName: formValue.fullName,
            email: formValue.email,
            phone: formValue.phone
          }));
        }
      }

      this.isSaving = false;
      this.isEditing = false;
    }, 1000);
  }

  savePreferences(): void {
    if (this.preferencesForm.invalid) {
      return;
    }

    this.isSaving = true;

    // Mock save - replace with actual API call
    setTimeout(() => {
      const formValue = this.preferencesForm.value;
      this.preferences = {
        language: formValue.language,
        currency: formValue.currency,
        notifications: {
          email: formValue.emailNotifications,
          sms: formValue.smsNotifications,
          push: formValue.pushNotifications
        },
        privacy: {
          showPhone: formValue.showPhone,
          showEmail: formValue.showEmail,
          showProfile: formValue.showProfile
        }
      };

      this.isSaving = false;
    }, 1000);
  }

  changePassword(): void {
    if (this.passwordForm.invalid) {
      return;
    }

    const { newPassword, confirmPassword } = this.passwordForm.value;
    if (newPassword !== confirmPassword) {
      return;
    }

    this.isSaving = true;

    // Mock save - replace with actual API call
    setTimeout(() => {
      this.passwordForm.reset();
      this.isSaving = false;
    }, 1000);
  }

  uploadAvatar(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      // Mock upload - replace with actual API call
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (this.userProfile) {
          this.userProfile.avatar = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  uploadDocument(event: Event, type: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      // Mock upload - replace with actual API call
      const newDoc: Document = {
        id: Date.now().toString(),
        type: type as any,
        name: file.name,
        status: 'pending',
        uploadedAt: new Date().toISOString().split('T')[0]
      };
      this.documents.push(newDoc);
    }
  }

  deleteDocument(docId: string): void {
    this.documents = this.documents.filter(doc => doc.id !== docId);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getDocumentIcon(type: string): string {
    switch (type) {
      case 'license':
        return 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z';
      case 'id':
        return 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2';
      case 'insurance':
        return 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z';
      case 'registration':
        return 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01';
      default:
        return 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z';
    }
  }
}
