import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/App";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { 
  Car, 
  Users, 
  Shield, 
  Wallet, 
  MapPin, 
  ChevronRight,
  Menu,
  X,
  Star,
  ArrowRight
} from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Car className="w-8 h-8" />,
      title: t("landing.features.reliable.title"),
      description: t("landing.features.reliable.description")
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t("landing.features.community.title"),
      description: t("landing.features.community.description")
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t("landing.features.payment.title"),
      description: t("landing.features.payment.description")
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: t("landing.features.price.title"),
      description: t("landing.features.price.description")
    }
  ];

  const stats = [
    { value: "10K+", label: t("landing.stats.users") },
    { value: "5K+", label: t("landing.stats.trips") },
    { value: "50+", label: t("landing.stats.axes") },
    { value: "98%", label: t("landing.stats.satisfaction") }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="glass fixed w-full z-50 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Car className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground font-['Outfit']">AxisRide</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">{t("common.features")}</a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">{t("common.howItWorks")}</a>
              <a href="#community" className="text-muted-foreground hover:text-foreground transition-colors">{t("common.community")}</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher />
              {token && user ? (
                <Button 
                  onClick={() => navigate("/dashboard")}
                  className="rounded-full bg-primary hover:bg-primary/90 px-6"
                  data-testid="dashboard-btn"
                >
                  {t("common.dashboard")}
                </Button>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate("/auth")}
                    className="rounded-full"
                    data-testid="login-btn"
                  >
                    {t("common.login")}
                  </Button>
                  <Button 
                    onClick={() => navigate("/auth?mode=register")}
                    className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6"
                    data-testid="register-btn"
                  >
                    {t("common.register")}
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <LanguageSwitcher />
              <button 
                className="p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="mobile-menu-btn"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background animate-slide-down">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-muted-foreground hover:text-foreground">{t("common.features")}</a>
              <a href="#how-it-works" className="block text-muted-foreground hover:text-foreground">{t("common.howItWorks")}</a>
              <a href="#community" className="block text-muted-foreground hover:text-foreground">{t("common.community")}</a>
              <div className="pt-4 space-y-2">
                {token && user ? (
                  <Button 
                    onClick={() => navigate("/dashboard")}
                    className="w-full rounded-full bg-primary"
                  >
                    {t("common.dashboard")}
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate("/auth")}
                      className="w-full rounded-full"
                    >
                      {t("common.login")}
                    </Button>
                    <Button 
                      onClick={() => navigate("/auth?mode=register")}
                      className="w-full rounded-full bg-secondary"
                    >
                      {t("common.register")}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1766330301961-6366c58297d0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlbGVjdHJpYyUyMGNhciUyMGNpdHklMjBzdHJlZXQlMjBhZnJpY2F8ZW58MHx8fHwxNzY5Nzk2NzkyfDA&ixlib=rb-4.1.0&q=85"
            alt="Hero background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="stagger-children">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Star className="w-4 h-4 fill-current" />
                {t("landing.hero.badge")}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6 font-['Outfit']">
                {t("landing.hero.title1")}
                <span className="block gradient-text">{t("landing.hero.title2")}</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                {t("landing.hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate("/auth?mode=register")}
                  className="rounded-full bg-primary hover:bg-primary/90 px-8 py-6 text-lg font-semibold btn-hover-lift"
                  data-testid="hero-register-btn"
                >
                  {t("landing.hero.ctaPassenger")}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate("/auth?mode=register&role=driver")}
                  className="rounded-full border-2 border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg"
                  data-testid="hero-driver-btn"
                >
                  {t("landing.hero.ctaDriver")}
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card 
                  key={index} 
                  className="bg-card/70 backdrop-blur-sm border-border/50 card-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-1 font-['Outfit']">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Outfit']">
              {t("landing.features.title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("landing.features.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-card border-border/50 card-hover group"
                data-testid={`feature-card-${index}`}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 font-['Outfit']">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Outfit']">
              {t("landing.howItWorks.title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("landing.howItWorks.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: t("landing.howItWorks.step1.title"), desc: t("landing.howItWorks.step1.description") },
              { step: "02", title: t("landing.howItWorks.step2.title"), desc: t("landing.howItWorks.step2.description") },
              { step: "03", title: t("landing.howItWorks.step3.title"), desc: t("landing.howItWorks.step3.description") }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-8xl font-bold text-primary/10 absolute -top-6 -left-2 font-['Outfit']">
                  {item.step}
                </div>
                <div className="relative pt-12">
                  <h3 className="text-xl font-semibold text-foreground mb-3 font-['Outfit']">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4">
                    <ChevronRight className="w-8 h-8 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 px-4 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6 font-['Outfit']">
                {t("landing.community.title")}
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
                {t("landing.community.subtitle")}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-primary-foreground/10 rounded-full px-4 py-2">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                  <span className="text-primary-foreground">Dakar - Thiès</span>
                </div>
                <div className="flex items-center gap-2 bg-primary-foreground/10 rounded-full px-4 py-2">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                  <span className="text-primary-foreground">Abidjan - Yamoussoukro</span>
                </div>
                <div className="flex items-center gap-2 bg-primary-foreground/10 rounded-full px-4 py-2">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                  <span className="text-primary-foreground">Douala - Yaoundé</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1516047001178-6dcd2a01c694?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGFmcmljYW4lMjBwZW9wbGUlMjBjYXJwb29saW5nJTIwdHJhdmVsfGVufDB8fHx8MTc2OTc5Njc4Nnww&ixlib=rb-4.1.0&q=85"
                alt="Community 1"
                className="rounded-2xl w-full h-48 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1708347456816-db9d5d7efe3b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwzfHxoYXBweSUyMGFmcmljYW4lMjBwZW9wbGUlMjBjYXJwb29saW5nJTIwdHJhdmVsfGVufDB8fHx8MTc2OTc5Njc4Nnww&ixlib=rb-4.1.0&q=85"
                alt="Community 2"
                className="rounded-2xl w-full h-48 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-['Outfit']">
            {t("landing.cta.title")}
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            {t("landing.cta.subtitle")}
          </p>
          <Button 
            onClick={() => navigate("/auth?mode=register")}
            className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground px-10 py-6 text-lg font-semibold btn-hover-lift"
            data-testid="cta-register-btn"
          >
            {t("common.freeAccount")}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Car className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold font-['Outfit']">AxisRide</span>
              </div>
              <p className="text-background/60 text-sm">
                {t("common.tagline")}
              </p>
              <div className="mt-4">
                <LanguageSwitcher variant="footer" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("common.product")}</h4>
              <ul className="space-y-2 text-background/60 text-sm">
                <li><a href="#features" className="hover:text-background">{t("common.features")}</a></li>
                <li><Link to="/pricing" className="hover:text-background">{t("common.pricing")}</Link></li>
                <li><Link to="/mobile-app" className="hover:text-background">{t("common.mobileApp")}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("common.company")}</h4>
              <ul className="space-y-2 text-background/60 text-sm">
                <li><Link to="/about" className="hover:text-background">{t("common.about")}</Link></li>
                <li><Link to="/careers" className="hover:text-background">{t("common.careers")}</Link></li>
                <li><Link to="/contact" className="hover:text-background">{t("common.contact")}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("common.legal")}</h4>
              <ul className="space-y-2 text-background/60 text-sm">
                <li><Link to="/terms" className="hover:text-background">{t("common.terms")}</Link></li>
                <li><Link to="/privacy" className="hover:text-background">{t("common.privacy")}</Link></li>
                <li><Link to="/cookies" className="hover:text-background">{t("common.cookies")}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/10 mt-12 pt-8 text-center text-background/40 text-sm">
            {t("common.copyright")}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
