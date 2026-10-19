interface AppHeaderProps {
  title: string;
  subtitle: string;
  logoSrc: string;
  logoAlt?: string;
  avatarSrc: string;
  avatarAlt?: string;
}

export function AppHeader({
  title,
  subtitle,
  logoSrc,
  logoAlt = "Logo",
  /*   avatarSrc,
  avatarAlt = "Profile", */
}: AppHeaderProps) {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl shadow-bar-top pt-safe">
      <div className="h-header px-margin flex items-center justify-between">
        <div className="flex items-center gap-space-sm">
          <img
            alt={logoAlt}
            className="h-8 w-auto object-contain"
            src={logoSrc}
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm uppercase tracking-tight text-on-surface leading-none">
              {title}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              {subtitle}
            </span>
          </div>
        </div>
        {/*         <div className="flex items-center">
          <img
            alt={avatarAlt}
            className="size-8 rounded-full object-cover shadow-bar-top"
            src={avatarSrc}
          />
        </div> */}
      </div>
    </header>
  );
}
