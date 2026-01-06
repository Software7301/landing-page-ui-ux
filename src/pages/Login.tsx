import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Network, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";
import { LoginFeatures } from "@/components/LoginFeatures";
import { loginSchema, type LoginFormData } from "@/lib/form-schema";
import { toast } from "sonner";
import { useState } from "react";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function Login() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success(t("login.success", language) || "Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(t("login.errors.loginFailed", language) || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen text-[#E5E7EB] relative bg-gradient-to-b from-[#0B0F17] via-[#101827] to-[#0B0F17]">
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-8 flex items-start justify-between"
          >
            <motion.div variants={fadeInUp} className="text-center lg:text-left">
              <Link to="/" className="inline-flex items-center gap-2.5 mb-8 group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-lg bg-[#6D28D9] flex items-center justify-center shadow-lg shadow-[#6D28D9]/20"
                >
                  <Network className="w-4 h-4 text-[#E5E7EB]" />
                </motion.div>
                <span className="text-lg font-semibold text-[#E5E7EB] group-hover:text-[#8B5CF6] transition-colors">
                  CorsiHub
                </span>
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-[#E5E7EB]">
                {t("login.title", language)}
              </h1>
              <p className="text-sm text-[#9CA3AF]">
                {t("login.subtitle", language)}
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="hidden lg:block">
              <LanguageSwitcher />
            </motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_1px_1fr] gap-8 items-stretch">
            <motion.div variants={fadeInUp}>
              <Card className="p-8 bg-[#141C2C] border-[rgba(109,40,217,0.15)] shadow-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-[#E5E7EB]">
                      {t("login.email", language)}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className={`h-11 bg-[#0B0F17] border-[rgba(109,40,217,0.15)] text-[#E5E7EB] placeholder:text-[#9CA3AF] focus:border-[#6D28D9] hover:border-[rgba(109,40,217,0.25)] transition-colors ${
                        errors.email ? "border-[#F87171]" : ""
                      }`}
                      placeholder="you@example.com"
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-[#F87171] mt-1"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-sm font-medium text-[#E5E7EB]">
                        {t("login.password", language)}
                      </Label>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-[#6D28D9] hover:text-[#8B5CF6] transition-colors"
                      >
                        {t("login.forgotPassword", language)}
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        className={`h-11 bg-[#0B0F17] border-[rgba(109,40,217,0.15)] text-[#E5E7EB] placeholder:text-[#9CA3AF] focus:border-[#6D28D9] hover:border-[rgba(109,40,217,0.25)] transition-colors pr-10 ${
                          errors.password ? "border-[#F87171]" : ""
                        }`}
                        placeholder="••••••••"
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-[#F87171] mt-1"
                      >
                        {errors.password.message}
                      </motion.p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        {...register("rememberMe")}
                        className="w-4 h-4 rounded border-[rgba(109,40,217,0.15)] bg-[#0B0F17] text-[#6D28D9] focus:ring-[#6D28D9] focus:ring-offset-0 cursor-pointer"
                        disabled={isSubmitting}
                      />
                      <span className="text-sm text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">
                        {t("login.rememberMe", language)}
                      </span>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#6D28D9] hover:bg-[#8B5CF6] text-[#E5E7EB] h-11 font-semibold transition-all duration-300 shadow-lg shadow-[#6D28D9]/20 hover:shadow-xl hover:shadow-[#6D28D9]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t("login.signingIn", language) || "Signing in..."}
                      </>
                    ) : (
                      t("login.signIn", language)
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-[#9CA3AF]">
                    {t("login.dontHaveAccount", language)}{" "}
                    <Link
                      to="/register"
                      className="text-[#6D28D9] hover:text-[#8B5CF6] font-medium transition-colors"
                    >
                      {t("login.signUp", language)}
                    </Link>
                  </p>
                </div>
              </Card>
            </motion.div>

            <div className="hidden lg:block w-px bg-[rgba(109,40,217,0.15)] self-stretch" />

            <motion.div variants={fadeInUp}>
              <LoginFeatures />
            </motion.div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 right-4 lg:hidden z-50">
        <LanguageSwitcher />
      </div>
    </div>
  );
}
