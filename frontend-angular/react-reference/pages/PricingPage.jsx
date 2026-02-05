import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/App";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  Car,
  Check,
  X,
  Menu,
  Star,
  Zap,
  Crown,
  Users,
  ArrowRight
} from "lucide-react";

const PricingPage = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const plans = [
    {
      name: t("pricing.plans.passenger.name"),
      description: t("pricing.plans.passenger.description"),
      price: t("pricing.plans.passenger.price"),
      period: "",
      icon: <Users className="w-6 h-6" />,
      features: [
        { text: t("pricing.features.unlimitedSearch"), included: true },
        { text: t("pricing.features.booking"), included: true },
        { text: t("pricing.features.mobileMoney"), included: true },
        { text: t("pricing.features.notifications"), included: true },
        { text: t("pricing.features.emailSupport"), included: true },
        { text: t("pricing.features.priorityTrips"), included: false },
        { text: t("pricing.features.prioritySupport"), included: false }
      ],
      cta: t("pricing.plans.passenger.cta"),
      popular: false
    },
    {
      name: t("pricing.plans.driver.name"),
      description: t("pricing.plans.driver.description"),
      price: t("pricing.plans.driver.price"),
      period: t("pricing.plans.driver.period"),
      icon: <Car className="w-6 h-6" />,
      features: [
        { text: t("pricing.features.unlimitedPublish"), included: true },
        { text: t("pricing.features.manageBookings"), included: true },
        { text: t("pricing.features.receiveMoney"), included: true },
        { text: t("pricing.features.dashboard"), included: true },
        { text: t("pricing.features.visibility"), included: true },
        { text: t("pricing.features.verifiedBadge"), included: true },
        { text: t("pricing.features.reducedCommission"), included: false }
      ],
      cta: t("pricing.plans.driver.cta"),
      popular: true
    },
    {
      name: t("pricing.plans.driverPro.name"),
      description: t("pricing.plans.driverPro.description"),
      price: t("pricing.plans.driverPro.price"),
      period: t("pricing.plans.driverPro.period"),
      icon: <Crown className="w-6 h-6" />,
      features: [
        { text: t("pricing.features.allDriverFeatures"), included: true },
        { text: t("pricing.features.commission5"), included: true },
        { text: t("pricing.features.featuredTrips"), included: true },
        { text: t("pricing.features.support247"), included: true },
        { text: t("pricing.features.advancedStats"), included: true },
        { text: t("pricing.features.proBadge"), included: true },
        { text: t("pricing.features.instantWithdraw"), included: true }
      ],
      cta: t("pricing.plans.driverPro.cta"),
      popular: false
    }
  ];

  const faqs = [
    { question: t("pricing.faq.q1.question"), answer: t("pricing.faq.q1.answer") },
    { question: t("pricing.faq.q2.question"), answer: t("pricing.faq.q2.answer") },
    { question: t("pricing.faq.q3.question"), answer: t("pricing.faq.q3.answer") },
    { question: t("pricing.faq.q4.question"), answer: t("pricing.faq.q4.answer") }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="glass fixed w-full z-50 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Car className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground font-['Outfit']">AxisRide</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link to="/#features" className="text-muted-foreground hover:text-foreground transition-colors">{t("common.features")}</Link>
              <Link to="/pricing" className="text-foreground font-medium">{t("common.pricing")}</Link>
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">{t("common.about")}</Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher />
              {token && user ? (
                <Button onClick={() => navigate("/dashboard")} className="rounded-full bg-primary hover:bg-primary/90 px-6">
                  {t("common.dashboard")}
                </Button>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => navigate("/auth")} className="rounded-full">{t("common.login")}</Button>
                  <Button onClick={() => navigate("/auth?mode=register")} className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6">{t("common.register")}</Button>
                </>
              )}
            </div>

            <div className="md:hidden flex items-center gap-2">
              <LanguageSwitcher />
              <button className="p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background animate-slide-down">
            <div className="px-4 py-4 space-y-4">
              <Link to="/#features" className="block text-muted-foreground hover:text-foreground">{t("common.features")}</Link>
              <Link to="/pricing" className="block text-foreground font-medium">{t("common.pricing")}</Link>
              <Link to="/about" className="block text-muted-foreground hover:text-foreground">{t("common.about")}</Link>
              <div className="pt-4 space-y-2">
                {token && user ? (
                  <Button onClick={() => navigate("/dashboard")} className="w-full rounded-full bg-primary">{t("common.dashboard")}</Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => navigate("/auth")} className="w-full rounded-full">{t("common.login")}</Button>
                    <Button onClick={() => navigate("/auth?mode=register")} className="w-full rounded-full bg-secondary">{t("common.register")}</Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            {t("pricing.hero.badge")}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-['Outfit']">
            {t("pricing.hero.title1")} <span className="gradient-text">{t("pricing.hero.title2")}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("pricing.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative bg-card border-border/50 card-hover ${
                  plan.popular ? "border-primary border-2 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                      <Star className="w-4 h-4 fill-current" />
                      {t("pricing.popular")}
                    </div>
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl font-['Outfit']">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground font-['Outfit']">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground block text-sm mt-1">{plan.period}</span>}
                  </div>
                  <ul className="space-y-3 text-left">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground/50 shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? "text-foreground" : "text-muted-foreground/50"}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => navigate("/auth?mode=register")}
                    className={`w-full rounded-full py-6 ${
                      plan.popular
                        ? "bg-primary hover:bg-primary/90"
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 font-['Outfit']">
            {t("pricing.faq.title")}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-card border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6 font-['Outfit']">
            {t("pricing.cta.title")}
          </h2>
          <p className="text-muted-foreground mb-8">
            {t("pricing.cta.subtitle")}
          </p>
          <Button
            onClick={() => navigate("/auth?mode=register")}
            className="rounded-full bg-primary hover:bg-primary/90 px-10 py-6 text-lg font-semibold"
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
              <p className="text-background/60 text-sm">{t("common.tagline")}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("common.product")}</h4>
              <ul className="space-y-2 text-background/60 text-sm">
                <li><Link to="/#features" className="hover:text-background">{t("common.features")}</Link></li>
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

export default PricingPage;
