import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ContactService } from '../../core/services/contact.service';

/**
 * Contact Component
 * Converted from: ContactPage.jsx
 * 
 * Features:
 * - Contact Form
 * - Info
 * - Map
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  isLoading = true;
  isSubmitting = false;
  successMessageKey = '';
  errorMessageKey = '';

  contactInfo = [
    {
      icon: 'mail',
      titleKey: 'contact.info.email.title',
      valueKey: 'contact.info.email.value',
      descriptionKey: 'contact.info.email.description'
    },
    {
      icon: 'phone',
      titleKey: 'contact.info.phone.title',
      valueKey: 'contact.info.phone.value',
      descriptionKey: 'contact.info.phone.description'
    },
    {
      icon: 'map',
      titleKey: 'contact.info.address.title',
      valueKey: 'contact.info.address.value',
      descriptionKey: 'contact.info.address.description'
    },
    {
      icon: 'clock',
      titleKey: 'contact.info.support.title',
      valueKey: 'contact.info.support.value',
      descriptionKey: 'contact.info.support.description'
    }
  ];

  quickLinks = [
    { icon: 'help', titleKey: 'contact.quickLinks.helpCenter.title', descriptionKey: 'contact.quickLinks.helpCenter.description' },
    { icon: 'chat', titleKey: 'contact.quickLinks.liveChat.title', descriptionKey: 'contact.quickLinks.liveChat.description' },
    { icon: 'partners', titleKey: 'contact.quickLinks.partnerships.title', descriptionKey: 'contact.quickLinks.partnerships.description' }
  ];

  socials = ['facebook', 'twitter', 'instagram', 'linkedin'];

  contactForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    // TODO: Load data
    this.isLoading = false;
  }

  handleSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.successMessageKey = '';
    this.errorMessageKey = '';

    this.contactService.sendMessage(this.contactForm.getRawValue()).subscribe({
      next: () => {
        this.successMessageKey = 'contact.form.success';
        this.contactForm.reset();
      },
      error: () => {
        this.errorMessageKey = 'contact.form.error';
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
