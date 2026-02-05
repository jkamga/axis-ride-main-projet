import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h1>Connexion</h1>
        <p class="subtitle">Connectez-vous à votre compte AxisRide</p>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="emailOrPhone">Email ou Téléphone</label>
            <input
              type="text"
              id="emailOrPhone"
              formControlName="emailOrPhone"
              placeholder="email@example.com"
              [class.error]="loginForm.get('emailOrPhone')?.invalid && loginForm.get('emailOrPhone')?.touched"
            />
            <div class="error-message" *ngIf="loginForm.get('emailOrPhone')?.invalid && loginForm.get('emailOrPhone')?.touched">
              Email ou téléphone requis
            </div>
          </div>

          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              formControlName="password"
              placeholder="••••••••"
              [class.error]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
            />
            <div class="error-message" *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
              Mot de passe requis
            </div>
          </div>

          <div class="error-message" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>

          <button type="submit" class="btn-primary" [disabled]="loginForm.invalid || loading">
            <span *ngIf="!loading">Se connecter</span>
            <span *ngIf="loading">Connexion...</span>
          </button>
        </form>

        <div class="divider">
          <span>OU</span>
        </div>

        <button class="btn-oidc" (click)="loginWithKeycloak()">
          <span>Se connecter avec Keycloak</span>
        </button>

        <div class="footer-links">
          <a routerLink="/register">Pas encore de compte ? S'inscrire</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 200px);
      padding: 20px;
    }

    .login-card {
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      width: 100%;
    }

    h1 {
      color: #2c3e50;
      margin-bottom: 8px;
      font-size: 28px;
    }

    .subtitle {
      color: #7f8c8d;
      margin-bottom: 30px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      color: #2c3e50;
      font-weight: 500;
    }

    input {
      width: 100%;
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 14px;
      transition: border-color 0.3s;
    }

    input:focus {
      outline: none;
      border-color: #3498db;
    }

    input.error {
      border-color: #e74c3c;
    }

    .error-message {
      color: #e74c3c;
      font-size: 12px;
      margin-top: 4px;
    }

    .btn-primary, .btn-oidc {
      width: 100%;
      padding: 14px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-primary {
      background: #3498db;
      color: white;
      margin-top: 10px;
    }

    .btn-primary:hover:not(:disabled) {
      background: #2980b9;
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-oidc {
      background: #9b59b6;
      color: white;
    }

    .btn-oidc:hover {
      background: #8e44ad;
    }

    .divider {
      margin: 30px 0;
      text-align: center;
      position: relative;
    }

    .divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: #e0e0e0;
    }

    .divider span {
      position: relative;
      background: white;
      padding: 0 15px;
      color: #7f8c8d;
    }

    .footer-links {
      margin-top: 20px;
      text-align: center;
    }

    .footer-links a {
      color: #3498db;
      text-decoration: none;
    }

    .footer-links a:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      emailOrPhone: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.error?.message || 'Erreur de connexion. Vérifiez vos identifiants.';
        }
      });
    }
  }

  loginWithKeycloak(): void {
    this.authService.loginWithOIDC();
  }
}
