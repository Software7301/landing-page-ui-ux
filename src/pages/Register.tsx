import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Network, Loader2, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";
import { RegisterFeatures } from "@/components/RegisterFeatures";
import { registerSchema, type RegisterFormData } from "@/lib/form-schema";
import { toast } from "sonner";
import { useState } from "react";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function Register() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { strength: 0, label: "", color: "" };
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;

    if (strength <= 2) return { strength, label: "Weak", color: "#F87171" };
    if (strength <= 3) return { strength, label: "Medium", color: "#FBBF24" };
    return { strength, label: "Strong", color: "#4ADE80" };
  };

  const passwordStrength = getPasswordStrength(password || "");

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success(t("register.success", language) || "Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(t("register.errors.registrationFailed", language) || "Registration failed. Please try again.");
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
                {t("register.title", language)}
              </h1>
              <p className="text-sm text-[#9CA3AF]">
                {t("register.subtitle", language)}
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
                    <Label htmlFor="name" className="text-sm font-medium text-[#E5E7EB]">
                      {t("register.name", language)}
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      {...register("name")}
                      className={`h-11 bg-[#0B0F17] border-[rgba(109,40,217,0.15)] text-[#E5E7EB] placeholder:text-[#9CA3AF] focus:border-[#6D28D9] hover:border-[rgba(109,40,217,0.25)] transition-colors ${
                        errors.name ? "border-[#F87171]" : ""
                      }`}
                      placeholder="John Doe"
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-[#F87171] mt-1"
                      >
                        {errors.name.message}
                      </motion.p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-[#E5E7EB]">
                      {t("register.email", language)}
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
                    <Label htmlFor="password" className="text-sm font-medium text-[#E5E7EB]">
                      {t("register.password", language)}
                    </Label>
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
                    {password && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex-1 h-1.5 bg-[#0B0F17] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: passwordStrength.color }}
                            />
                          </div>
                          <span className="text-xs text-[#9CA3AF]">{passwordStrength.label}</span>
                        </div>
                        <div className="text-xs text-[#9CA3AF] space-y-1">
                          <div className="flex items-center gap-2">
                            {password.length >= 8 ? (
                              <CheckCircle2 className="w-3 h-3 text-[#4ADE80]" />
                            ) : (
                              <div className="w-3 h-3 rounded-full border border-[#9CA3AF]" />
                            )}
                            <span>At least 8 characters</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {/[A-Z]/.test(password) ? (
                              <CheckCircle2 className="w-3 h-3 text-[#4ADE80]" />
                            ) : (
                              <div className="w-3 h-3 rounded-full border border-[#9CA3AF]" />
                            )}
                            <span>One uppercase letter</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {/[0-9]/.test(password) ? (
                              <CheckCircle2 className="w-3 h-3 text-[#4ADE80]" />
                            ) : (
                              <div className="w-3 h-3 rounded-full border border-[#9CA3AF]" />
                            )}
                            <span>One number</span>
                          </div>
                        </div>
                      </div>
                    )}
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

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-[#E5E7EB]">
                      {t("register.confirmPassword", language)}
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        {...register("confirmPassword")}
                        className={`h-11 bg-[#0B0F17] border-[rgba(109,40,217,0.15)] text-[#E5E7EB] placeholder:text-[#9CA3AF] focus:border-[#6D28D9] hover:border-[rgba(109,40,217,0.25)] transition-colors pr-10 ${
                          errors.confirmPassword ? "border-[#F87171]" : ""
                        }`}
                        placeholder="••••••••"
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-[#F87171] mt-1"
                      >
                        {errors.confirmPassword.message}
                      </motion.p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#6D28D9] hover:bg-[#8B5CF6] text-[#E5E7EB] h-11 font-semibold transition-all duration-300 shadow-lg shadow-[#6D28D9]/20 hover:shadow-xl hover:shadow-[#6D28D9]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t("register.creatingAccount", language) || "Creating account..."}
                      </>
                    ) : (
                      t("register.createAccount", language)
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-[#9CA3AF]">
                    {t("register.alreadyHaveAccount", language)}{" "}
                    <Link
                      to="/login"
                      className="text-[#6D28D9] hover:text-[#8B5CF6] font-medium transition-colors"
                    >
                      {t("register.signIn", language)}
                    </Link>
                  </p>
                </div>
              </Card>
            </motion.div>

            <div className="hidden lg:block w-px bg-[rgba(109,40,217,0.15)] self-stretch" />

            <motion.div variants={fadeInUp}>
              <RegisterFeatures />
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
