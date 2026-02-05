import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Cookie, ArrowUp, Check, Settings } from "lucide-react";

const CookiesPage = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cookieTypeKeys = ["essential", "performance", "functional", "advertising"];
  const sectionKeys = ["definition", "usage", "management", "duration", "thirdParty", "rights", "changes", "contact"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
            <Cookie className="w-4 h-4" />
            {t("cookies.hero.badge")}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-['Outfit']">
            {t("cookies.hero.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("common.lastUpdated")}: Janvier 2024
          </p>
        </div>
      </section>

      {/* Cookie Types */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 font-['Outfit']">{t("cookies.types.title")}</h2>
          <div className="space-y-6">
            {cookieTypeKeys.map((key) => {
              const isRequired = key === "essential";
              const examples = t(`cookies.types.${key}.examples`, { returnObjects: true });
              return (
                <Card key={key} className="bg-card border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Cookie className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{t(`cookies.types.${key}.name`)}</h3>
                          {isRequired && (
                            <span className="text-xs text-primary">{t(`cookies.types.${key}.required`)}</span>
                          )}
                        </div>
                      </div>
                      {isRequired ? (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-green-500" />
                          {t(`cookies.types.${key}.required`)}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Settings className="w-4 h-4" />
                          {t(`cookies.types.${key}.configurable`)}
                        </div>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-4">{t(`cookies.types.${key}.description`)}</p>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="text-sm font-medium text-foreground mb-2">{t("cookies.examples")}</div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {Array.isArray(examples) && examples.map((example, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card border-border/50">
            <CardContent className="p-6">
              <h2 className="font-semibold text-foreground mb-4">{t("cookies.toc")}</h2>
              <div className="grid md:grid-cols-2 gap-2">
                {sectionKeys.map((key) => (
                  <a
                    key={key}
                    href={`#${key}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(`cookies.sections.${key}.title`)}
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {sectionKeys.map((key) => (
            <div key={key} id={key} className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-4 font-['Outfit']">
                {t(`cookies.sections.${key}.title`)}
              </h2>
              <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {t(`cookies.sections.${key}.content`)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Back to top */}
      <div className="fixed bottom-8 right-8">
        <Button
          onClick={scrollToTop}
          size="icon"
          className="rounded-full bg-primary hover:bg-primary/90 w-12 h-12 shadow-lg"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </div>

      {/* Related Links */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="font-semibold text-foreground mb-6">{t("cookies.relatedDocs")}</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/terms">
              <Button variant="outline" className="rounded-full">{t("common.terms")}</Button>
            </Link>
            <Link to="/privacy">
              <Button variant="outline" className="rounded-full">{t("common.privacy")}</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CookiesPage;
