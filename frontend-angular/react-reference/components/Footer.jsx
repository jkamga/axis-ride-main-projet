import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Car } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Footer = () => {
  const { t } = useTranslation();

  return (
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
            <div className="mt-4">
              <LanguageSwitcher variant="footer" />
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("common.product")}</h4>
            <ul className="space-y-2 text-background/60 text-sm">
              <li><Link to="/#features" className="hover:text-background">{t("common.features")}</Link></li>
              <li><Link to="/pricing" className="hover:text-background">{t("common.pricing")}</Link></li>
              <li><Link to="/subscription" className="hover:text-background">{t("common.subscription")}</Link></li>
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
  );
};

export default Footer;
