import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";
import { RegisterFeatures } from "@/components/RegisterFeatures";

export default function Register() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t("register.errors.nameRequired", language);
    }

    if (!formData.email.trim()) {
      newErrors.email = t("register.errors.emailRequired", language);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("register.errors.invalidEmail", language);
    }

    if (!formData.password) {
      newErrors.password = t("register.errors.passwordRequired", language);
    } else if (formData.password.length < 8) {
      newErrors.password = t("register.errors.passwordMinLength", language);
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t("register.errors.confirmPasswordRequired", language);
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t("register.errors.passwordsDoNotMatch", language);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Demo - redirect to dashboard
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen text-[#F5F3FF] relative bg-[#0E0A1A]">
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl mx-auto">
          <div className="mb-8 flex items-start justify-between">
            <div className="text-center lg:text-left">
              <Link to="/" className="inline-flex items-center gap-2.5 mb-8">
                <div className="w-8 h-8 rounded-lg bg-[#6D28D9] flex items-center justify-center">
                  <Network className="w-4 h-4 text-[#F5F3FF]" />
                </div>
                <span className="text-lg font-semibold text-[#F5F3FF]">CorsiHub</span>
              </Link>
              <h1 className="text-3xl font-semibold mb-2 text-[#F5F3FF]">
                {t('register.title', language)}
              </h1>
              <p className="text-sm text-[#9CA3AF]">
                {t('register.subtitle', language)}
              </p>
            </div>
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_1px_1fr] gap-8 items-stretch">
            <Card className="p-8 bg-[#141026] border-[rgba(109,40,217,0.15)]">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-[#C4B5FD]">
                    {t("register.name", language)}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`h-11 bg-[#18132E] border-[rgba(109,40,217,0.15)] text-[#F5F3FF] placeholder:text-[#9CA3AF] focus:border-[#7C3AED] hover:border-[rgba(109,40,217,0.25)] ${
                      errors.name ? "border-[#EF4444]" : ""
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-sm text-[#EF4444] mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-[#C4B5FD]">
                    {t("register.email", language)}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`h-11 bg-[#18132E] border-[rgba(109,40,217,0.15)] text-[#F5F3FF] placeholder:text-[#9CA3AF] focus:border-[#7C3AED] hover:border-[rgba(109,40,217,0.25)] ${
                      errors.email ? "border-[#EF4444]" : ""
                    }`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-[#EF4444] mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-[#C4B5FD]">
                    {t("register.password", language)}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`h-11 bg-[#18132E] border-[rgba(109,40,217,0.15)] text-[#F5F3FF] placeholder:text-[#9CA3AF] focus:border-[#7C3AED] hover:border-[rgba(109,40,217,0.25)] ${
                      errors.password ? "border-[#EF4444]" : ""
                    }`}
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="text-sm text-[#EF4444] mt-1">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-[#C4B5FD]">
                    {t("register.confirmPassword", language)}
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`h-11 bg-[#18132E] border-[rgba(109,40,217,0.15)] text-[#F5F3FF] placeholder:text-[#9CA3AF] focus:border-[#7C3AED] hover:border-[rgba(109,40,217,0.25)] ${
                      errors.confirmPassword ? "border-[#EF4444]" : ""
                    }`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-[#EF4444] mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#6D28D9] hover:bg-[#7C3AED] text-[#F5F3FF] h-11 font-medium transition-colors"
                >
                  {t("register.createAccount", language)}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-[#9CA3AF]">
                  {t("register.alreadyHaveAccount", language)}{" "}
                  <Link 
                    to="/login" 
                    className="text-[#C4B5FD] hover:text-[#F5F3FF] font-medium transition-colors"
                  >
                    {t("register.signIn", language)}
                  </Link>
                </p>
              </div>
            </Card>

            <div className="hidden lg:block w-px bg-[rgba(109,40,217,0.15)] self-stretch" />

            <RegisterFeatures />
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 right-4 lg:hidden z-50">
        <LanguageSwitcher />
      </div>
    </div>
  );
}
