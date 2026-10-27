import type { BottomNavItem } from "../shared/BottomNav";

export const NAV_ITEMS: BottomNavItem[] = [
  {
    id: "calculadora-carga",
    icon: "fitness_center",
    label: "Carga",
    href: "/",
  },
  {
    id: "config-discos",
    icon: "tune",
    label: "Discos",
    href: "/discos",
  },
  /*   {
    id: "rutina-sets",
    icon: "fact_check",
    label: "Rutina",
    href: "/rutina",
  },
  {
    id: "historial",
    icon: "military_tech",
    label: "Historial",
    href: "/historial",
  }, */
];

export const PAGE_SUBTITLES: Record<string, string> = {
  "/": "Calculadora Carga",
  "/discos": "Config Discos",
};

export const HEADER = {
  title: "GYM TOOLZ",
  logoAlt: "Gym Toolz logo",
  logoSrc: "/logo.svg",
  avatarSrc:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBn1tIcD1dAXbGoeafgTxy1-pQl3zHaBglW42YEeeqfnCkjHgmtGceciKzmBjkE9CPt4M41nd69puht33eRw1__9c66WLp1-EnvevGJTwKW70CFVfZ-hUncPWRXWWBmNKp98kwdKZ1aDfwRRimMU7Z_EhmjZHXbtz9G3H3Wq1-PZuj3jkHt3hXpVQB6P_SahkDUIOmQEpB8Hjky5hQf_fNLfYm_9DBD8UztzZRYHrnuNGcmxkr4fiM1Zw",
};
