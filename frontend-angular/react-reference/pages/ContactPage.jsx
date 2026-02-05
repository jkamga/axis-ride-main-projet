import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  HelpCircle,
  Building2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";

const ContactPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: t("contact.form.success"),
      description: t("contact.form.successDescription")
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    { icon: <Mail className="w-6 h-6" />, ...t("contact.info.email", { returnObjects: true }) },
    { icon: <Phone className="w-6 h-6" />, ...t("contact.info.phone", { returnObjects: true }) },
    { icon: <MapPin className="w-6 h-6" />, ...t("contact.info.address", { returnObjects: true }) },
    { icon: <Clock className="w-6 h-6" />, ...t("contact.info.support", { returnObjects: true }) }
  ];

  const quickLinks = [
    { icon: <HelpCircle className="w-5 h-5" />, ...t("contact.quickLinks.helpCenter", { returnObjects: true }) },
    { icon: <MessageCircle className="w-5 h-5" />, ...t("contact.quickLinks.liveChat", { returnObjects: true }) },
    { icon: <Building2 className="w-5 h-5" />, ...t("contact.quickLinks.partnerships", { returnObjects: true }) }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeLink="contact" />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Mail className="w-4 h-4" />
            {t("contact.hero.badge")}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-['Outfit']">
            {t("contact.hero.title1")} <span className="gradient-text">{t("contact.hero.title2")}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("contact.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="bg-card border-border/50 card-hover">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {info.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                  <div className="text-primary font-medium mb-1">{info.value}</div>
                  <div className="text-sm text-muted-foreground">{info.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 font-['Outfit']">
                {t("contact.form.title")}
              </h2>
              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">{t("contact.form.name")}</label>
                        <Input
                          placeholder={t("contact.form.namePlaceholder")}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="bg-background"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">{t("contact.form.email")}</label>
                        <Input
                          type="email"
                          placeholder={t("contact.form.emailPlaceholder")}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="bg-background"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">{t("contact.form.phone")}</label>
                        <Input
                          placeholder={t("contact.form.phonePlaceholder")}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-background"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">{t("contact.form.subject")}</label>
                        <Input
                          placeholder={t("contact.form.subjectPlaceholder")}
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                          className="bg-background"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">{t("contact.form.message")}</label>
                      <Textarea
                        placeholder={t("contact.form.messagePlaceholder")}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={6}
                        className="bg-background resize-none"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full rounded-full bg-primary hover:bg-primary/90 py-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? t("contact.form.sending") : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          {t("contact.form.submit")}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Quick Links & Map */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6 font-['Outfit']">
                  {t("contact.quickLinks.title")}
                </h2>
                <div className="space-y-4">
                  {quickLinks.map((link, index) => (
                    <Card key={index} className="bg-card border-border/50 card-hover cursor-pointer">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          {link.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{link.title}</h3>
                          <p className="text-sm text-muted-foreground">{link.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6 font-['Outfit']">
                  {t("contact.location.title")}
                </h2>
                <Card className="bg-card border-border/50 overflow-hidden">
                  <div className="h-64 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                      <div className="text-foreground font-semibold">Dakar, Sénégal</div>
                      <div className="text-muted-foreground text-sm">Plateau, Rue Carnot</div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">{t("contact.social.title")}</h3>
                <div className="flex gap-3">
                  {[
                    { icon: <Facebook className="w-5 h-5" /> },
                    { icon: <Twitter className="w-5 h-5" /> },
                    { icon: <Instagram className="w-5 h-5" /> },
                    { icon: <Linkedin className="w-5 h-5" /> }
                  ].map((social, index) => (
                    <Button key={index} variant="outline" size="icon" className="w-12 h-12 rounded-full border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary">
                      {social.icon}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
