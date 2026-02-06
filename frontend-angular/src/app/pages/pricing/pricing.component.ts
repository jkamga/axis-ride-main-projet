import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  buttonText: string;
  popular?: boolean;
}

interface FAQ {
  question: string;
  answer: string;
  open: boolean;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  isLoading = true;
  billingCycle: 'monthly' | 'yearly' = 'monthly';

  plans: Plan[] = [];
  faqs: FAQ[] = [];

  features = [
    { name: 'pricing.features.unlimitedTrips', free: false, basic: true, premium: true, enterprise: true },
    { name: 'pricing.features.prioritySupport', free: false, basic: false, premium: true, enterprise: true },
    { name: 'pricing.features.verifiedBadge', free: false, basic: true, premium: true, enterprise: true },
    { name: 'pricing.features.advancedFilters', free: false, basic: false, premium: true, enterprise: true },
    { name: 'pricing.features.instantBooking', free: true, basic: true, premium: true, enterprise: true },
    { name: 'pricing.features.cancellation', free: false, basic: true, premium: true, enterprise: true },
    { name: 'pricing.features.multiplePayments', free: false, basic: false, premium: true, enterprise: true },
    { name: 'pricing.features.groupDiscounts', free: false, basic: false, premium: false, enterprise: true },
    { name: 'pricing.features.analytics', free: false, basic: false, premium: true, enterprise: true },
    { name: 'pricing.features.customBranding', free: false, basic: false, premium: false, enterprise: true },
    { name: 'pricing.features.apiAccess', free: false, basic: false, premium: false, enterprise: true },
    { name: 'pricing.features.dedicatedManager', free: false, basic: false, premium: false, enterprise: true }
  ];

  constructor() {}

  ngOnInit(): void {
    this.loadPricingData();
  }

  loadPricingData(): void {
    this.isLoading = true;

    // Mock data - replace with actual API call
    setTimeout(() => {
      this.updatePlans();

      this.faqs = [
        {
          question: 'pricing.faq.question1',
          answer: 'pricing.faq.answer1',
          open: false
        },
        {
          question: 'pricing.faq.question2',
          answer: 'pricing.faq.answer2',
          open: false
        },
        {
          question: 'pricing.faq.question3',
          answer: 'pricing.faq.answer3',
          open: false
        },
        {
          question: 'pricing.faq.question4',
          answer: 'pricing.faq.answer4',
          open: false
        },
        {
          question: 'pricing.faq.question5',
          answer: 'pricing.faq.answer5',
          open: false
        }
      ];

      this.isLoading = false;
    }, 500);
  }

  updatePlans(): void {
    const isYearly = this.billingCycle === 'yearly';
    const discount = isYearly ? 0.2 : 0; // 20% discount for yearly

    this.plans = [
      {
        id: 'free',
        name: 'pricing.plans.free.name',
        price: 0,
        period: 'pricing.plans.period.month',
        description: 'pricing.plans.free.description',
        features: [
          'pricing.plans.free.feature1',
          'pricing.plans.free.feature2',
          'pricing.plans.free.feature3',
          'pricing.plans.free.feature4'
        ],
        highlighted: false,
        buttonText: 'pricing.plans.free.button'
      },
      {
        id: 'basic',
        name: 'pricing.plans.basic.name',
        price: Math.floor(4900 * (1 - discount)),
        period: isYearly ? 'pricing.plans.period.year' : 'pricing.plans.period.month',
        description: 'pricing.plans.basic.description',
        features: [
          'pricing.plans.basic.feature1',
          'pricing.plans.basic.feature2',
          'pricing.plans.basic.feature3',
          'pricing.plans.basic.feature4',
          'pricing.plans.basic.feature5'
        ],
        highlighted: false,
        buttonText: 'pricing.plans.basic.button'
      },
      {
        id: 'premium',
        name: 'pricing.plans.premium.name',
        price: Math.floor(9900 * (1 - discount)),
        period: isYearly ? 'pricing.plans.period.year' : 'pricing.plans.period.month',
        description: 'pricing.plans.premium.description',
        features: [
          'pricing.plans.premium.feature1',
          'pricing.plans.premium.feature2',
          'pricing.plans.premium.feature3',
          'pricing.plans.premium.feature4',
          'pricing.plans.premium.feature5',
          'pricing.plans.premium.feature6'
        ],
        highlighted: true,
        popular: true,
        buttonText: 'pricing.plans.premium.button'
      },
      {
        id: 'enterprise',
        name: 'pricing.plans.enterprise.name',
        price: 0,
        period: 'pricing.plans.period.custom',
        description: 'pricing.plans.enterprise.description',
        features: [
          'pricing.plans.enterprise.feature1',
          'pricing.plans.enterprise.feature2',
          'pricing.plans.enterprise.feature3',
          'pricing.plans.enterprise.feature4',
          'pricing.plans.enterprise.feature5'
        ],
        highlighted: false,
        buttonText: 'pricing.plans.enterprise.button'
      }
    ];
  }

  toggleBilling(): void {
    this.billingCycle = this.billingCycle === 'monthly' ? 'yearly' : 'monthly';
    this.updatePlans();
  }

  toggleFaq(index: number): void {
    this.faqs[index].open = !this.faqs[index].open;
  }

  selectPlan(planId: string): void {
    // Navigate to subscription page or checkout
    console.log('Selected plan:', planId);
  }

  getFeatureValue(feature: any, plan: string): boolean {
    return feature[plan as keyof typeof feature] as boolean;
  }
}
