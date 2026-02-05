import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/App";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Car, Menu, X } from "lucide-react";

const Navbar = ({ activeLink = "" }) => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { key: "features", label: t("common.features"), path: "/#features" },
    { key: "pricing", label: t("common.pricing"), path: "/pricing" },
    { key: "subscription", label: t("common.subscription"), path: "/subscription" },
    { key: "about", label: t("common.about"), path: "/about" },
  ];

  return (
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
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.key}
                to={link.path}
                className={`transition-colors ${
                  activeLink === link.key
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            {token && user ? (
              <Button
                onClick={() => navigate("/dashboard")}
                className="rounded-full bg-primary hover:bg-primary/90 px-6"
              >
                {t("common.dashboard")}
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/auth")}
                  className="rounded-full"
                >
                  {t("common.login")}
                </Button>
                <Button
                  onClick={() => navigate("/auth?mode=register")}
                  className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6"
                >
                  {t("common.register")}
                </Button>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background animate-slide-down">
          <div className="px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={link.path}
                className={`block ${
                  activeLink === link.key
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
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
  );
};

export default Navbar;
