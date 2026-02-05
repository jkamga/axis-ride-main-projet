import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Heart,
  Zap,
  Users,
  Globe,
  Coffee,
  Plane,
  GraduationCap
} from "lucide-react";

const CareersPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const benefits = [
    { icon: <Heart className="w-5 h-5" />, ...t("careers.benefits.health", { returnObjects: true }) },
    { icon: <Plane className="w-5 h-5" />, ...t("careers.benefits.vacation", { returnObjects: true }) },
    { icon: <GraduationCap className="w-5 h-5" />, ...t("careers.benefits.training", { returnObjects: true }) },
    { icon: <Coffee className="w-5 h-5" />, ...t("careers.benefits.remote", { returnObjects: true }) },
    { icon: <Zap className="w-5 h-5" />, ...t("careers.benefits.equity", { returnObjects: true }) },
    { icon: <Users className="w-5 h-5" />, ...t("careers.benefits.teamBuilding", { returnObjects: true }) }
  ];

  const jobKeys = ["fullStack", "productManager", "growthMarketing", "communityManager", "designer", "dataAnalyst"];

  const cultureValues = [
    { icon: <Heart className="w-6 h-6" />, ...t("careers.culture.values.impact", { returnObjects: true }) },
    { icon: <Users className="w-6 h-6" />, ...t("careers.culture.values.collaboration", { returnObjects: true }) },
    { icon: <Zap className="w-6 h-6" />, ...t("careers.culture.values.innovation", { returnObjects: true }) },
    { icon: <Globe className="w-6 h-6" />, ...t("careers.culture.values.diversity", { returnObjects: true }) }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeLink="careers" />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
            <Briefcase className="w-4 h-4" />
            {t("careers.hero.badge")}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-['Outfit']">
            {t("careers.hero.title1")} <span className="gradient-text">{t("careers.hero.title2")}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("careers.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Culture */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6 font-['Outfit']">
                {t("careers.culture.title")}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t("careers.culture.description")}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {cultureValues.map((value, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      {value.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{value.title}</div>
                      <div className="text-sm text-muted-foreground">{value.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-40 rounded-2xl bg-primary/20" />
                <div className="h-56 rounded-2xl bg-secondary/20" />
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-56 rounded-2xl bg-secondary/20" />
                <div className="h-40 rounded-2xl bg-primary/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Outfit']">
              {t("careers.benefits.title")}
            </h2>
            <p className="text-muted-foreground">{t("careers.benefits.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-card border-border/50">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Outfit']">
              {t("careers.jobs.title")}
            </h2>
            <p className="text-muted-foreground">{t("careers.jobs.subtitle")}</p>
          </div>

          <div className="space-y-4">
            {jobKeys.map((key) => {
              const job = t(`careers.jobs.${key}`, { returnObjects: true });
              return (
                <Card key={key} className="bg-card border-border/50 card-hover">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="text-sm text-primary font-medium mb-1">{job.department}</div>
                        <h3 className="text-xl font-semibold text-foreground mb-2 font-['Outfit']">{job.title}</h3>
                        <p className="text-muted-foreground text-sm mb-3">{job.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.type}
                          </div>
                        </div>
                      </div>
                      <Button className="rounded-full bg-primary hover:bg-primary/90 px-6 shrink-0">
                        {t("common.apply")}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6 font-['Outfit']">
            {t("careers.cta.title")}
          </h2>
          <p className="text-muted-foreground mb-8">
            {t("careers.cta.subtitle")}
          </p>
          <Button
            onClick={() => navigate("/contact")}
            className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-6 font-semibold"
          >
            {t("careers.cta.button")}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareersPage;
