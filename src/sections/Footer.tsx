import { motion } from "framer-motion";
import { Network } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";

export default function Footer() {
  const { language } = useLanguage();


  return (
    <footer className="py-12 px-4 bg-black">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-6 h-6 rounded-lg bg-[#6D28D9] flex items-center justify-center">
              <Network className="w-4 h-4 text-[#F5F3FF]" />
            </div>
            <span className="font-semibold text-[#F5F3FF]">CorsiHub</span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-[#C4B5FD] hover:text-[#F5F3FF] transition-colors">
              {t("footer.docs", language)}
            </a>
            <a href="#" className="text-[#C4B5FD] hover:text-[#F5F3FF] transition-colors">
              {t("footer.github", language)}
            </a>
            <a href="#" className="text-[#C4B5FD] hover:text-[#F5F3FF] transition-colors">
              {t("footer.terms", language)}
            </a>
            <a href="#" className="text-[#C4B5FD] hover:text-[#F5F3FF] transition-colors">
              {t("footer.privacy", language)}
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
