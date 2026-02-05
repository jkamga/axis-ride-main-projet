import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, ArrowUp } from "lucide-react";

const TermsPage = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sectionKeys = [
    "acceptance", "services", "registration", "driverObligations",
    "passengerObligations", "payments", "cancellation", "liability",
    "dataProtection", "termination", "disputes", "contact"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <FileText className="w-4 h-4" />
            {t("terms.hero.badge")}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-['Outfit']">
            {t("terms.hero.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("common.lastUpdated")}: Janvier 2024
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-muted/30 border-border/50">
            <CardContent className="p-6">
              <h2 className="font-semibold text-foreground mb-4">{t("terms.toc")}</h2>
              <div className="grid md:grid-cols-2 gap-2">
                {sectionKeys.map((key) => (
                  <a
                    key={key}
                    href={`#${key}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(`terms.sections.${key}.title`)}
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {sectionKeys.map((key) => (
            <div key={key} id={key} className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-4 font-['Outfit']">
                {t(`terms.sections.${key}.title`)}
              </h2>
              <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {t(`terms.sections.${key}.content`)}
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
          <h3 className="font-semibold text-foreground mb-6">{t("terms.relatedDocs")}</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/privacy">
              <Button variant="outline" className="rounded-full">{t("common.privacy")}</Button>
            </Link>
            <Link to="/cookies">
              <Button variant="outline" className="rounded-full">{t("common.cookies")}</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsPage;
