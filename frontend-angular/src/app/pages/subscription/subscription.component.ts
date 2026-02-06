import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

interface Subscription {
  id: string;
  plan: string;
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  price: number;
  billingCycle: 'monthly' | 'yearly';
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  description: string;
  downloadUrl?: string;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'mobile' | 'bank';
  last4?: string;
  provider: string;
  isDefault: boolean;
  expiryDate?: string;
}

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  isLoading = true;
  currentTab: 'overview' | 'billing' | 'payment' = 'overview';

  subscription: Subscription | null = null;
  invoices: Invoice[] = [];
  paymentMethods: PaymentMethod[] = [];

  showCancelModal = false;
  showPaymentModal = false;

  constructor() {}

  ngOnInit(): void {
    this.loadSubscriptionData();
  }

  loadSubscriptionData(): void {
    this.isLoading = true;

    // Mock data - replace with actual API call
    setTimeout(() => {
      // Check if user has auth and subscription
      const user = localStorage.getItem('user');
      if (user) {
        this.subscription = {
          id: '1',
          plan: 'Premium',
          status: 'active',
          startDate: '2025-01-01',
          endDate: '2026-01-01',
          autoRenew: true,
          price: 9900,
          billingCycle: 'yearly'
        };

        this.invoices = [
          {
            id: 'INV-001',
            date: '2025-01-01',
            amount: 9900,
            status: 'paid',
            description: 'Premium Plan - Yearly'
          },
          {
            id: 'INV-002',
            date: '2024-01-01',
            amount: 9900,
            status: 'paid',
            description: 'Premium Plan - Yearly'
          },
          {
            id: 'INV-003',
            date: '2023-01-01',
            amount: 7920,
            status: 'paid',
            description: 'Premium Plan - Yearly'
          }
        ];

        this.paymentMethods = [
          {
            id: '1',
            type: 'card',
            last4: '4242',
            provider: 'Visa',
            isDefault: true,
            expiryDate: '12/2026'
          },
          {
            id: '2',
            type: 'mobile',
            provider: 'Orange Money',
            isDefault: false
          }
        ];
      }

      this.isLoading = false;
    }, 800);
  }

  setTab(tab: 'overview' | 'billing' | 'payment'): void {
    this.currentTab = tab;
  }

  toggleAutoRenew(): void {
    if (this.subscription) {
      this.subscription.autoRenew = !this.subscription.autoRenew;
      // Call API to update
      console.log('Auto-renew toggled:', this.subscription.autoRenew);
    }
  }

  upgradePlan(): void {
    console.log('Upgrade plan');
    // Navigate to pricing page or show upgrade modal
  }

  downgradePlan(): void {
    console.log('Downgrade plan');
    // Show downgrade options
  }

  openCancelModal(): void {
    this.showCancelModal = true;
  }

  closeCancelModal(): void {
    this.showCancelModal = false;
  }

  confirmCancel(): void {
    if (this.subscription) {
      this.subscription.status = 'cancelled';
      this.subscription.autoRenew = false;
      this.closeCancelModal();
      console.log('Subscription cancelled');
    }
  }

  downloadInvoice(invoice: Invoice): void {
    console.log('Download invoice:', invoice.id);
    // Implement invoice download
  }

  openPaymentModal(): void {
    this.showPaymentModal = true;
  }

  closePaymentModal(): void {
    this.showPaymentModal = false;
  }

  addPaymentMethod(): void {
    // Implement payment method addition
    console.log('Add payment method');
    this.closePaymentModal();
  }

  setDefaultPayment(paymentId: string): void {
    this.paymentMethods.forEach(pm => {
      pm.isDefault = pm.id === paymentId;
    });
    console.log('Set default payment:', paymentId);
  }

  removePaymentMethod(paymentId: string): void {
    this.paymentMethods = this.paymentMethods.filter(pm => pm.id !== paymentId);
    console.log('Remove payment method:', paymentId);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      case 'paid':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getPaymentIcon(type: string): string {
    switch (type) {
      case 'card':
        return 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z';
      case 'mobile':
        return 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z';
      case 'bank':
        return 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z';
      default:
        return 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    }
  }
}
