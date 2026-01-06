import { useState, useEffect } from "react";
import { Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";

const DASHBOARD_PASSWORD_KEY = "corsihub_dashboard_authenticated";
const DEMO_PASSWORD = "admin"; // Senha simples para demo

interface DashboardPasswordGateProps {
  children: React.ReactNode;
}

export function DashboardPasswordGate({ children }: DashboardPasswordGateProps) {
  const { language } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const authenticated = localStorage.getItem(DASHBOARD_PASSWORD_KEY);
    if (authenticated === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password === DEMO_PASSWORD) {
      localStorage.setItem(DASHBOARD_PASSWORD_KEY, "true");
      setIsAuthenticated(true);
    } else {
      setError(t("dashboard.passwordGate.invalidPassword", language));
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#060B14] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2EE6D6] to-[#1CB8A8] flex items-center justify-center shadow-[0_0_20px_rgba(46,230,214,0.4)]">
              <Network className="w-4 h-4 text-[#060B14]" />
            </div>
            <span className="text-lg font-semibold text-[#E6EDF3]">CorsiHub</span>
          </div>
          
          <h1 className="text-2xl font-semibold text-[#E6EDF3] mb-2">
            {t("dashboard.passwordGate.title", language)}
          </h1>
          <p className="text-sm text-[#9FB0C7]">
            {t("dashboard.passwordGate.subtitle", language)}
          </p>
        </div>

        <Card className="p-8 bg-gradient-to-b from-[#0E1625] to-[#142B4F] border-[#1C2A3F]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-[#9FB0C7]">
                {t("dashboard.passwordGate.password", language)}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className={`h-11 bg-[#0E1625] border-[#1C2A3F] text-[#E6EDF3] placeholder:text-[#9FB0C7] focus:border-[#2EE6D6] hover:border-[#2EE6D6]/50 focus:shadow-[0_0_15px_rgba(46,230,214,0.2)] ${
                  error ? "border-[#F26D6D]" : ""
                }`}
                placeholder="••••••••"
                autoFocus
              />
              {error && (
                <p className="text-sm text-[#F26D6D] mt-1">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#2EE6D6] to-[#1CB8A8] hover:shadow-[0_0_20px_rgba(46,230,214,0.4)] text-[#060B14] h-11 font-semibold transition-all duration-300"
            >
              {t("dashboard.passwordGate.submit", language)}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

