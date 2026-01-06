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
import { LoginFeatures } from "@/components/LoginFeatures";

export default function Login() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,  
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = t("login.errors.emailRequired", language);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("login.errors.invalidEmail", language);
    }

    if (!formData.password) {
      newErrors.password = t("login.errors.passwordRequired", language);
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
                {t('login.title', language)}
              </h1>
              <p className="text-sm text-[#9CA3AF]">
                {t('login.subtitle', language)}
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
                  <Label htmlFor="email" className="text-sm font-medium text-[#C4B5FD]">
                    {t('login.email', language)}
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium text-[#C4B5FD]">
                      {t('login.password', language)}
                    </Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-[#C4B5FD] hover:text-[#F5F3FF] transition-colors"
                    >
                      {t('login.forgotPassword', language)}
                    </Link>
                  </div>
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

                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                      className="w-4 h-4 rounded border-[rgba(109,40,217,0.15)] bg-[#18132E] text-[#6D28D9] focus:ring-[#6D28D9] focus:ring-offset-0"
                    />
                    <span className="text-sm text-[#C4B5FD]">
                      {t('login.rememberMe', language)}
                    </span>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#6D28D9] hover:bg-[#7C3AED] text-[#F5F3FF] h-11 font-medium transition-colors"
                >
                  {t('login.signIn', language)}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-[#9CA3AF]">
                  {t('login.dontHaveAccount', language)}{" "}
                  <Link 
                    to="/register" 
                    className="text-[#C4B5FD] hover:text-[#F5F3FF] font-medium transition-colors"
                  >
                    {t('login.signUp', language)}
                  </Link>
                </p>
              </div>
            </Card>

            <div className="hidden lg:block w-px bg-[rgba(109,40,217,0.15)] self-stretch" />

            <LoginFeatures />
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 right-4 lg:hidden z-50">
        <LanguageSwitcher />
      </div>
    </div>
  );
}
