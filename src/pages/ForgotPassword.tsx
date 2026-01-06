import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Network, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";
import { AnimatedBackground } from "@/components/animated-background";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function ForgotPassword() {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (isSubmitted) {
      setShowSuccess(true);
    }
  }, [isSubmitted]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      setTimeout(() => {
        alert("Código enviado para o email! (This is a demo)");
      }, 500);
    }
  };

  return (
    <div className="min-h-screen text-[#F5F3FF] relative bg-[#0E0A1A]">
      <AnimatedBackground />
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md mx-auto">
          <div className="hidden lg:block absolute top-8 right-8">
            <LanguageSwitcher />
          </div>

          <Card 
            className={`p-6 bg-[#18132E] border-[rgba(109,40,217,0.15)] hover:border-[rgba(109,40,217,0.3)] hover:shadow-lg hover:shadow-[#6D28D9]/10 transition-all duration-500 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div 
              className={`text-center mb-6 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#6D28D9] flex items-center justify-center">
                  <Network className="w-4 h-4 text-[#F5F3FF]" />
                </div>
                <span className="text-lg font-semibold text-[#F5F3FF]">CorsiHub</span>
              </Link>
              <h1 className="text-2xl font-semibold mb-2 text-[#F5F3FF]">
                {t('forgotPassword.title', language)}
              </h1>
              <p className="text-sm text-[#9CA3AF]">
                {t('forgotPassword.description', language)}
              </p>
            </div>

            {!isSubmitted ? (
              <form 
                onSubmit={handleSubmit} 
                className={`space-y-4 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#C4B5FD] text-sm font-medium">{t('forgotPassword.email', language)}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`h-11 bg-[#141026] border-[rgba(109,40,217,0.15)] text-[#F5F3FF] placeholder:text-[#9CA3AF] transition-all duration-200 ${errors.email ? "border-[#6D28D9]" : "focus:border-[#8B5CF6] focus:ring-[#6D28D9]/30 hover:border-[rgba(109,40,217,0.25)]"}`}
                    placeholder="name@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-[#6D28D9] mt-1">{errors.email}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#6D28D9] hover:bg-[#7C3AED] hover:shadow-lg hover:shadow-[#6D28D9]/20 hover:-translate-y-0.5 text-[#F5F3FF] h-11 font-medium transition-all duration-300 ease-out active:scale-95"
                >
                  {t('forgotPassword.submit', language)}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div 
                  className={`w-16 h-16 rounded-full bg-[#6D28D9]/10 flex items-center justify-center mx-auto transition-all duration-500 ${
                    showSuccess ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  style={{ transitionDelay: '100ms' }}
                >
                  <Network className="w-8 h-8 text-[#8B5CF6]" />
                </div>
                <h2 
                  className={`text-xl font-semibold text-[#F5F3FF] transition-all duration-500 ${
                    showSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}
                  style={{ transitionDelay: '200ms' }}
                >
                  {t('forgotPassword.successTitle', language)}
                </h2>
                <p 
                  className={`text-sm text-[#9CA3AF] transition-all duration-500 ${
                    showSuccess ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transitionDelay: '300ms' }}
                >
                  {t('forgotPassword.successDescription', language)}
                </p>
              </div>
            )}

            <div className="mt-5 text-center">
              <p className="text-sm text-[#9CA3AF]">
                {t('forgotPassword.rememberPassword', language)}{" "}
                <Link to="/login" className="text-[#8B5CF6] hover:text-[#A78BFA] font-medium transition-colors">
                  {t('forgotPassword.signIn', language)}
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>
      <div className="fixed bottom-4 right-4 lg:hidden z-50">
        <LanguageSwitcher />
      </div>
    </div>
  );
}

