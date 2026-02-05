import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Car,
  Smartphone,
  Bell,
  MapPin,
  Shield,
  Zap,
  Star,
  Apple,
  Play,
  QrCode
} from "lucide-react";

const MobileAppPage = () => {
  const { t } = useTranslation();

  const features = [
    { icon: <Bell className="w-6 h-6" />, ...t("mobileApp.features.notifications", { returnObjects: true }) },
    { icon: <MapPin className="w-6 h-6" />, ...t("mobileApp.features.geolocation", { returnObjects: true }) },
    { icon: <Shield className="w-6 h-6" />, ...t("mobileApp.features.securePayment", { returnObjects: true }) },
    { icon: <Zap className="w-6 h-6" />, ...t("mobileApp.features.quickBooking", { returnObjects: true }) }
  ];

  const screenshots = [
    t("mobileApp.screenshots.search", { returnObjects: true }),
    t("mobileApp.screenshots.booking", { returnObjects: true }),
    t("mobileApp.screenshots.tracking", { returnObjects: true })
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeLink="mobileApp" />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
                <Smartphone className="w-4 h-4" />
                {t("mobileApp.hero.badge")}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-['Outfit']">
                {t("mobileApp.hero.title")} <span className="gradient-text">{t("mobileApp.hero.titleHighlight")}</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {t("mobileApp.hero.subtitle")}
              </p>
              
              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button className="flex items-center gap-3 bg-foreground hover:bg-foreground/90 text-background rounded-xl px-6 py-6">
                  <Apple className="w-8 h-8" />
                  <div className="text-left">
                    <div className="text-xs opacity-80">{t("mobileApp.hero.comingSoon")}</div>
                    <div className="font-semibold">{t("mobileApp.hero.appStore")}</div>
                  </div>
                </Button>
                <Button className="flex items-center gap-3 bg-foreground hover:bg-foreground/90 text-background rounded-xl px-6 py-6">
                  <Play className="w-8 h-8" />
                  <div className="text-left">
                    <div className="text-xs opacity-80">{t("mobileApp.hero.comingSoon")}</div>
                    <div className="font-semibold">{t("mobileApp.hero.playStore")}</div>
                  </div>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex gap-8">
                <div>
                  <div className="text-3xl font-bold text-primary font-['Outfit']">100K+</div>
                  <div className="text-sm text-muted-foreground">{t("mobileApp.stats.preRegistrations")}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary font-['Outfit']">4.8</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" /> {t("mobileApp.stats.expectedRating")}
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="relative">
              <div className="relative mx-auto w-64 h-[500px] bg-foreground rounded-[3rem] p-3 shadow-2xl">
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-6 bg-background rounded-full" />
                <div className="w-full h-full bg-gradient-to-br from-primary via-primary/80 to-secondary rounded-[2.5rem] flex flex-col items-center justify-center">
                  <Car className="w-16 h-16 text-primary-foreground mb-4" />
                  <span className="text-2xl font-bold text-primary-foreground font-['Outfit']">AxisRide</span>
                  <span className="text-primary-foreground/80 text-sm mt-2">{t("common.tagline")}</span>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Outfit']">
              {t("mobileApp.features.title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("mobileApp.features.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card border-border/50 card-hover">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 font-['Outfit']">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Outfit']">
              {t("mobileApp.screenshots.title")}
            </h2>
            <p className="text-muted-foreground">{t("mobileApp.screenshots.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {screenshots.map((screen, index) => (
              <Card key={index} className="bg-card border-border/50 overflow-hidden card-hover">
                <div className="h-64 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <div className="w-32 h-48 bg-foreground/10 rounded-2xl border border-border/50 flex items-center justify-center">
                    <Smartphone className="w-12 h-12 text-muted-foreground" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2 font-['Outfit']">{screen.title}</h3>
                  <p className="text-sm text-muted-foreground">{screen.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <QrCode className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6 font-['Outfit']">
            {t("mobileApp.newsletter.title")}
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            {t("mobileApp.newsletter.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder={t("mobileApp.newsletter.placeholder")}
              className="px-6 py-4 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 w-full sm:w-80"
            />
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-8 py-4 font-semibold">
              <Bell className="w-5 h-5 mr-2" />
              {t("mobileApp.newsletter.button")}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MobileAppPage;
