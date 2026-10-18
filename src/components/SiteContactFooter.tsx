import { useI18n } from "../i18n";

const pageLinks = [
  ["home", "t0554", "/#inicio"],
  ["cases", "t0555", "/#cases"],
  ["design_services", "t0556", "/#atuacao"],
  ["badge", "t0557", "/#sobre"],
  ["analytics", "t0558", "/#evidencias"],
  ["send", "t0559", "/#contato"],
] as const;

const socialLinks = [
  ["\uF1B4", "ocrisart", "https://www.behance.net/ocrisart"],
  ["\uF08C", "@ocrisart", "https://www.linkedin.com/in/ocrisarts"],
  ["\uF232", "+55 48 99152-6789", "https://wa.me/5548991526789"],
  ["\uF2C6", "+55 48 99152-6789", "https://t.me/+5548991526789"],
] as const;

export default function SiteContactFooter() {
  const { t, text, path } = useI18n();

  return (
    <>
      <section
        id="contato"
        aria-labelledby="contact-title"
        className="flex min-h-[780px] w-full items-start bg-[#eeeff1] px-4 py-14 md:min-h-[min(1080px,100svh)] md:items-center md:px-[clamp(48px,8.333vw,160px)] md:py-32"
        data-name="section.contact-cta"
        data-node-id="6190:7169"
      >
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 md:flex-row md:items-center">
          <div className="min-w-0 flex-1 font-['Sora:Regular'] text-[#000102]">
            <h2 id="contact-title" className="mb-10 text-[44px] font-normal leading-[1.15] md:mb-16">
              {t("t0623")}
            </h2>
            <p className="max-w-[760px] text-[16px] leading-6 text-[#0d0e10]">
              {t("t0624")}<br />{t("t0625")}
            </p>
          </div>

          <form
            className="flex min-w-0 flex-1 flex-col gap-8 rounded-lg bg-[#000102] px-6 py-24"
            data-contact-form
            data-hj-suppress
            data-clarity-mask="true"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="flex h-16 items-center gap-2 rounded-lg border border-[#999faa] bg-[#eeeff1] px-4">
              <span className="font-['Material_Symbols_Outlined:Regular'] text-[16px] text-[#1e22aa]" aria-hidden="true">
                person_pin_circle
              </span>
              <span className="sr-only">{text("Nome")}</span>
              <input
                className="min-w-0 flex-1 bg-transparent font-['Sora:Regular'] text-[13px] text-[#0d0e10] outline-none"
                name="name"
                placeholder={t("t0626")}
                autoComplete="name"
              />
            </label>
            <label className="flex h-16 items-center gap-2 rounded-lg border border-[#999faa] bg-[#eeeff1] px-4">
              <span className="font-['Material_Symbols_Outlined:Regular'] text-[16px] text-[#1e22aa]" aria-hidden="true">
                alternate_email
              </span>
              <span className="sr-only">{text("Telefone ou e-mail")}</span>
              <input
                className="min-w-0 flex-1 bg-transparent font-['Sora:Regular'] text-[13px] text-[#0d0e10] outline-none"
                name="contact"
                placeholder={t("t0627")}
                autoComplete="email"
              />
            </label>
            <a
              className="flex h-[72px] min-h-[60px] items-center gap-4 rounded-xl bg-[#54000e] px-4 text-[#f2dee3]"
              href="https://wa.me/5548991526789"
              target="_blank"
              rel="noreferrer"
            >
              <span className="min-w-0 flex-1 font-['Geist:Regular'] text-[12px] leading-none">
                {t("t0628")}
              </span>
              <span className="font-['Material_Symbols_Outlined:Light'] text-[24px] leading-none" aria-hidden="true">
                mark_chat_unread
              </span>
            </a>
          </form>
        </div>
      </section>

      <footer
        className="flex min-h-[1080px] w-full items-start justify-center bg-[#eeeff1] px-4 py-3 md:items-center md:px-12 md:py-40"
        data-name="footer.site"
        data-node-id="6325:219"
      >
        <div className="flex min-h-[1056px] w-full flex-col items-center justify-start gap-6 md:min-h-[540px] md:justify-center md:gap-9">
          <div className="flex w-full flex-col items-center text-center font-['Sora:Regular']">
            <img src="/assets/shared/branding/site-brand-mark.svg" alt="" width="117" height="117" className="size-[117px]" />
            <p className="whitespace-nowrap text-[38px] font-medium leading-[1.2] text-[#6b0013] md:text-[44px]">{t("t0600")}</p>
            <div className="flex w-full flex-col items-center gap-4 px-2 py-3">
              <p className="whitespace-nowrap text-[28px] leading-[1.2] text-[#000102] md:text-[30px]">{t("t0629")}</p>
              <p className="max-w-[620px] text-[16px] leading-6 text-[#0d0e10]">{t("t0630")}</p>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-1 text-[#020305] md:gap-6">
            <nav aria-label={text("Navegação do rodapé")} className="flex w-full flex-col items-start justify-center md:w-auto md:flex-row md:items-center">
              {pageLinks.map(([icon, label, href]) => (
                <a key={label} href={path(href)} className="flex h-[60px] min-h-[60px] w-full items-center gap-1 py-2 font-['Geist:Regular'] text-[12px] md:min-w-[160px] md:w-auto md:px-[18px]">
                  <span className="font-['Material_Symbols_Outlined:Light'] text-[9px] leading-none" aria-hidden="true">{icon}</span>
                  <span className="leading-none">{t(label)}</span>
                </a>
              ))}
            </nav>
            <nav aria-label={text("Redes e contatos")} className="flex w-full flex-col items-center justify-center md:w-auto md:flex-row">
              {socialLinks.map(([icon, label, href]) => (
                <a key={href} href={href} target="_blank" rel="noreferrer" className="flex h-[50px] w-full items-center justify-center gap-1 p-2 font-['Geist:Regular'] text-[12px] md:h-[60px] md:min-w-[160px] md:w-auto">
                  <span className="font-['Font_Awesome_5_Brands:Regular'] text-[9px] leading-none" aria-hidden="true">{icon}</span>
                  <span className="leading-none">{label}</span>
                </a>
              ))}
            </nav>
          </div>

          <p className="py-4 font-['Sora:Regular'] text-[11px] leading-[1.6] text-[#0d0e10]">{t("t0633")}</p>
        </div>
      </footer>
    </>
  );
}
