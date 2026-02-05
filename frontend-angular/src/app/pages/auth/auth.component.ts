import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, AuthResponse } from '../../core/services/auth.service';

/**
 * Authentication Component
 * Converted from: AuthPage.jsx
 * 
 * Features:
 * - Login
 * - Register
 * - 2FA
 * - Social Login
 * - Password Reset
 */
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoading = true;
  mode: 'login' | 'register' | 'reset' = 'login';
  step: 'phone' | 'otp' = 'phone';
  loading = false;

  demoOtp = '';
  message = '';
  errorMessage = '';

  loginForm = this.fb.group({
    phone: ['', [Validators.required]]
  });

  registerForm = this.fb.group({
    fullName: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    role: ['passenger', [Validators.required]]
  });

  resetForm = this.fb.group({
    emailOrPhone: ['', [Validators.required]]
  });

  otpForm = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const modeParam = params.get('mode');
      const roleParam = params.get('role');

      if (modeParam === 'register' || modeParam === 'reset' || modeParam === 'login') {
        this.mode = modeParam;
      }

      if (roleParam) {
        this.registerForm.patchValue({ role: roleParam });
      }
    });

    this.isLoading = false;
  }

  switchMode(nextMode: 'login' | 'register' | 'reset'): void {
    this.mode = nextMode;
    this.step = 'phone';
    this.message = '';
    this.errorMessage = '';
    this.demoOtp = '';
  }

  handleLogin(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Veuillez entrer votre numéro.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.message = '';

    const phone = this.loginForm.value.phone as string;
    this.authService.login(phone).subscribe({
      next: (response) => {
        this.demoOtp = response.demo_otp;
        this.step = 'otp';
        this.message = 'OTP envoyé. Vérifiez votre téléphone.';
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la connexion.';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  handleRegister(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.message = '';

    const { phone, fullName, role } = this.registerForm.value;
    this.authService.register(phone as string, fullName as string, role as string).subscribe({
      next: (response) => {
        this.demoOtp = response.demo_otp;
        this.step = 'otp';
        this.message = 'OTP envoyé. Vérifiez votre téléphone.';
      },
      error: () => {
        this.errorMessage = 'Erreur lors de l\'inscription.';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  handleVerifyOtp(): void {
    if (this.otpForm.invalid) {
      this.errorMessage = 'Veuillez entrer le code complet.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.message = '';

    const phone = this.mode === 'register'
      ? (this.registerForm.value.phone as string)
      : (this.loginForm.value.phone as string);
    const otp = this.otpForm.value.code as string;

    this.authService.verifyOtp(phone, otp).subscribe({
      next: (response: AuthResponse) => {
        const role = response.user?.role || 'passenger';
        if (role === 'driver') {
          this.router.navigate(['/dashboard/driver']);
        } else if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/dashboard/passenger']);
        }
      },
      error: () => {
        this.errorMessage = 'Code OTP invalide.';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  handlePasswordReset(): void {
    if (this.resetForm.invalid) {
      this.errorMessage = 'Veuillez entrer votre email ou téléphone.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.message = '';

    setTimeout(() => {
      this.loading = false;
      this.message = 'Si un compte existe, un lien de réinitialisation a été envoyé.';
    }, 800);
  }

  handleSocialLogin(provider: 'google' | 'facebook' | 'apple'): void {
    this.message = `Connexion ${provider} en cours d\'implémentation.`;
  }

  backToPhone(): void {
    this.step = 'phone';
    this.errorMessage = '';
    this.message = '';
  }
}
