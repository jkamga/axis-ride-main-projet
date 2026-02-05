import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Target,
  Heart,
  Globe,
  Users,
  Award,
  MapPin,
  Linkedin,
  Twitter
} from "lucide-react";

const AboutPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const values = [
    { icon: <Heart className="w-6 h-6" />, title: t("about.values.community.title"), description: t("about.values.community.description") },
    { icon: <Target className="w-6 h-6" />, title: t("about.values.accessibility.title"), description: t("about.values.accessibility.description") },
    { icon: <Globe className="w-6 h-6" />, title: t("about.values.sustainability.title"), description: t("about.values.sustainability.description") },
    { icon: <Award className="w-6 h-6" />, title: t("about.values.excellence.title"), description: t("about.values.excellence.description") }
  ];

  const team = [
    { ...t("about.team.amadou", { returnObjects: true }), initials: "AD" },
    { ...t("about.team.fatou", { returnObjects: true }), initials: "FS" },
    { ...t("about.team.moussa", { returnObjects: true }), initials: "MK" },
    { ...t("about.team.aicha", { returnObjects: true }), initials: "AT" }
  ];

  const milestones = [
    { year: "2022", event: t("about.timeline.2022_1") },
    { year: "2023", event: t("about.timeline.2023_1") },
    { year: "2023", event: t("about.timeline.2023_2") },
    { year: "2024", event: t("about.timeline.2024_1") },
    { year: "2024", event: t("about.timeline.2024_2") }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeLink="about" />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            {t("about.hero.badge")}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-['Outfit']">
            {t("about.hero.title1")} <span className="gradient-text">{t("about.hero.title2")}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("about.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6 font-['Outfit']">
                {t("about.mission.title")}
              </h2>
              <p className="text-muted-foreground mb-6">{t("about.mission.p1")}</p>
              <p className="text-muted-foreground mb-6">{t("about.mission.p2")}</p>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary font-['Outfit']">3</div>
                  <div className="text-sm text-muted-foreground">{t("about.mission.countries")}</div>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary font-['Outfit']">50+</div>
                  <div className="text-sm text-muted-foreground">{t("about.mission.cities")}</div>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary font-['Outfit']">10K+</div>
                  <div className="text-sm text-muted-foreground">{t("about.mission.users")}</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&h=400&fit=crop"
                alt="Team collaboration"
                className="rounded-2xl w-full object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-2xl">
                <MapPin className="w-8 h-8 mb-2" />
                <div className="font-semibold">Dakar, Sénégal</div>
                <div className="text-sm opacity-80">{t("about.mission.headquarters")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Outfit']">
              {t("about.values.title")}
            </h2>
            <p className="text-muted-foreground">{t("about.values.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-card border-border/50 card-hover">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {value.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 font-['Outfit']">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 font-['Outfit']">{t("about.timeline.title")}</h2>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-primary/20" />
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                  <div className="text-primary font-bold font-['Outfit']">{milestone.year}</div>
                  <div className="text-foreground">{milestone.event}</div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Outfit']">
              {t("about.team.title")}
            </h2>
            <p className="text-muted-foreground">{t("about.team.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="bg-card border-border/50 card-hover text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary-foreground font-['Outfit']">
                      {member.initials}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground font-['Outfit']">{member.name}</h3>
                  <div className="text-sm text-primary mb-3">{member.role}</div>
                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                  <div className="flex justify-center gap-2">
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                      <Twitter className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6 font-['Outfit']">
            {t("about.cta.title")}
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            {t("about.cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/auth?mode=register")}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-8 py-6 font-semibold"
            >
              {t("about.cta.createAccount")}
            </Button>
            <Button
              onClick={() => navigate("/careers")}
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 rounded-full px-8 py-6"
            >
              {t("about.cta.viewJobs")}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
