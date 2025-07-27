import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./select";
import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  return (
    <Select value={i18n.language} onValueChange={lng => i18n.changeLanguage(lng)}>
      <SelectTrigger className="w-32">
        <SelectValue>{t(i18n.language === "ka" ? "georgian" : "english")}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">{t("english")}</SelectItem>
        <SelectItem value="ka">{t("georgian")}</SelectItem>
      </SelectContent>
    </Select>
  );
}
