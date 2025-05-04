import en from "../i18n/en.json";
import id from "../i18n/id.json";

const translations = { en, id };

export const t = (lang: "en" | "id", key: string): string => {
    return key.split(".").reduce((obj: any, part: string) => obj?.[part], translations[lang]) ?? key;
};
