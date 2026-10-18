// @ts-nocheck -- Figma-generated exact visual component
import CaseCard, { caseSlugs } from "./CaseCard";
import TaxonomyTags from "./TaxonomyTags";
import ServiceCard from "./ServiceCard";
import { useI18n } from "../i18n";
const assetPathPrefix = "/assets";
const imgAdranBrand = `${assetPathPrefix}/89c53.svg`;
const imgCardImg = `${assetPathPrefix}/46d18.png`;
const imgCardImg1 = `${assetPathPrefix}/b1c4c.png`;
const imgCardFigure = `${assetPathPrefix}/268b2.png`;
const imgCardImg2 = `${assetPathPrefix}/5f2cc.png`;
const imgCardImg3 = `${assetPathPrefix}/50614.png`;
const imgCardImg4 = `${assetPathPrefix}/277dd.png`;
const imgCardImg5 = `${assetPathPrefix}/3469a.png`;
const imgCardImg6 = `${assetPathPrefix}/56713.png`;
const imgCardImg7 = `${assetPathPrefix}/adf92.png`;
const imgAdranBrand1 = `${assetPathPrefix}/8afaf.svg`;
const imgPosterHeroFallback = `${assetPathPrefix}/44412.svg`;
const imgAdranBrand2 = `${assetPathPrefix}/5a215.svg`;

type NavbarStandartFillGlobalDefaultFooterProps = {
  className?: string;
  brand?: boolean;
  cases?: boolean;
  lang?: boolean;
  pages?: boolean;
  social?: boolean;
};

function NavbarStandartFillGlobalDefaultFooter({ className, brand = true, cases = true, lang = true, pages = true, social = true }: NavbarStandartFillGlobalDefaultFooterProps) {
  const { t, text, path } = useI18n();
  return (
    <div className={className || "bg-[#0d0e10] content-stretch flex items-center relative rounded-tl-[8px] rounded-tr-[8px]"} data-node-id="4:28236" data-name="Navbar/standart/fill/global/default/↑ Footer">
      {brand && (
        <div className="relative shrink-0 size-[60px]" data-node-id="4:28237" data-name="Adran.brand">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgAdranBrand} />
        </div>
      )}
      {pages && (
        <div className="content-stretch flex items-center relative shrink-0" data-node-id="4:28238" data-name="nav#pages">
          <div className="flex flex-row items-center self-stretch" data-node-id="4:28239">
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] h-full items-center justify-center max-w-[80px] min-h-[60px] min-w-[60px] p-[8px] relative shrink-0 text-[#fcfdfe] w-[80px] whitespace-nowrap" data-name="btn">
              <p className="font-['Material_Symbols_Outlined:Light'] font-light leading-none relative shrink-0 text-[9px]" data-node-id="I4:28239;4532:6696" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
                home
              </p>
              <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:28239;4532:6697">
                <p className="leading-none">{t("t0554")}</p>
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-center justify-center max-w-[80px] min-h-[60px] min-w-[60px] px-[18px] py-[8px] relative shrink-0 text-[#fcfdfe] w-[80px] whitespace-nowrap" data-node-id="4:28240" data-name="btn">
            <p className="font-['Material_Symbols_Outlined:Light'] font-light leading-none relative shrink-0 text-[9px]" data-node-id="I4:28240;4532:6696" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
              cases
            </p>
            <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:28240;4532:6697">
              <p className="leading-none">{t("t0555")}</p>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-center justify-center max-w-[80px] min-h-[60px] min-w-[60px] px-[18px] py-[8px] relative shrink-0 text-[#fcfdfe] w-[80px] whitespace-nowrap" data-node-id="4:28241" data-name="btn">
            <p className="font-['Material_Symbols_Outlined:Light'] font-light leading-none relative shrink-0 text-[9px]" data-node-id="I4:28241;4532:6696" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
              design_services
            </p>
            <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:28241;4532:6697">
              <p className="leading-none">{t("t0556")}</p>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-center justify-center max-w-[80px] min-h-[60px] min-w-[60px] px-[18px] py-[8px] relative shrink-0 text-[#fcfdfe] w-[80px] whitespace-nowrap" data-node-id="4:28242" data-name="btn">
            <p className="font-['Material_Symbols_Outlined:Light'] font-light leading-none relative shrink-0 text-[9px]" data-node-id="I4:28242;4532:6696" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
              badge
            </p>
            <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:28242;4532:6697">
              <p className="leading-none">{t("t0557")}</p>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-center justify-center max-w-[80px] min-h-[60px] min-w-[60px] p-[8px] relative shrink-0 text-[#fcfdfe] w-[80px] whitespace-nowrap" data-node-id="4:28243" data-name="btn">
            <p className="font-['Material_Symbols_Outlined:Light'] font-light leading-none relative shrink-0 text-[9px]" data-node-id="I4:28243;4532:6696" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
              analytics
            </p>
            <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:28243;4532:6697">
              <p className="leading-none">{t("t0558")}</p>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-center justify-center max-w-[80px] min-h-[60px] min-w-[60px] px-[18px] py-[8px] relative shrink-0 text-[#fcfdfe] w-[80px] whitespace-nowrap" data-node-id="4:28244" data-name="btn">
            <p className="font-['Material_Symbols_Outlined:Light'] font-light leading-none relative shrink-0 text-[9px]" data-node-id="I4:28244;4532:6696" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
              send
            </p>
            <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:28244;4532:6697">
              <p className="leading-none">{t("t0559")}</p>
            </div>
          </div>
        </div>
      )}
      {cases && (
        <div className="content-stretch flex items-center relative shrink-0" data-node-id="4:28245" data-name="nav#case">
          <div className="flex flex-row items-center self-stretch" data-node-id="4:28246">
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] h-full items-center justify-center max-w-[80px] min-h-[60px] min-w-[60px] p-[8px] relative shrink-0 text-[#fcfdfe] w-[80px] whitespace-nowrap" data-name="btn">
              <p className="font-['Material_Symbols_Outlined:Light'] font-light leading-none relative shrink-0 text-[9px]" data-node-id="I4:28246;4532:6696" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
                arrow_back
              </p>
              <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:28246;4532:6697">
                <p className="leading-none">{t("t0554")}</p>
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-center justify-center max-w-[80px] min-h-[60px] min-w-[60px] px-[18px] py-[8px] relative shrink-0 text-[#fcfdfe] w-[80px] whitespace-nowrap" data-node-id="4:28247" data-name="btn">
            <p className="font-['Material_Symbols_Outlined:Light'] font-light leading-none relative shrink-0 text-[9px]" data-node-id="I4:28247;4532:6696" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
              cases
            </p>
            <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:28247;4532:6697">
              <p className="leading-none">{t("t0560")}</p>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-center justify-center max-w-[80px] min-h-[60px] min-w-[60px] px-[18px] py-[8px] relative shrink-0 text-[#fcfdfe] w-[80px] whitespace-nowrap" data-node-id="4:28248" data-name="btn">
            <p className="font-['Material_Symbols_Outlined:Light'] font-light leading-none relative shrink-0 text-[9px]" data-node-id="I4:28248;4532:6696" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
              travel_explore
            </p>
            <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:28248;4532:6697">
              <p className="leading-none">{t("t0561")}</p>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-center justify-center max-w-[80px] min-h-[60px] min-w-[60px] px-[18px] py-[8px] relative shrink-0 text-[#fcfdfe] w-[80px] whitespace-nowrap" data-node-id="4:28249" data-name="btn">
            <p className="font-['Material_Symbols_Outlined:Light'] font-light leading-none relative shrink-0 text-[9px]" data-node-id="I4:28249;4532:6696" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
              account_tree
            </p>
            <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:28249;4532:6697">
              <p className="leading-none">{t("t0562")}</p>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-center justify-center max-w-[80px] min-h-[60px] min-w-[60px] p-[8px] relative shrink-0 text-[#fcfdfe] w-[80px] whitespace-nowrap" data-node-id="4:28250" data-name="btn">
            <p className="font-['Material_Symbols_Outlined:Light'] font-light leading-none relative shrink-0 text-[9px]" data-node-id="I4:28250;4532:6696" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
              monitoring
            </p>
            <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:28250;4532:6697">
              <p className="leading-none">{t("t0563")}</p>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-center justify-center max-w-[80px] min-h-[60px] min-w-[60px] px-[18px] py-[8px] relative shrink-0 text-[#fcfdfe] w-[80px] whitespace-nowrap" data-node-id="4:28251" data-name="btn">
            <p className="font-['Material_Symbols_Outlined:Light'] font-light leading-none relative shrink-0 text-[9px]" data-node-id="I4:28251;4532:6696" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
              send
            </p>
            <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:28251;4532:6697">
              <p className="leading-none">{t("t0559")}</p>
            </div>
          </div>
        </div>
      )}
      {social && (
        <div className="flex flex-row items-center self-stretch" data-node-id="4:28252">
          <div className="[word-break:break-word] content-stretch flex h-full items-center relative shrink-0 text-[#fcfdfe] w-[586.667px] whitespace-nowrap" data-name="nav#social">
            <div className="content-stretch flex gap-[4px] h-full items-center justify-center p-[8px] relative shrink-0 w-[140px]" data-node-id="4:28253" data-name="btn">
              <p className="font-['Font_Awesome_5_Brands:Regular'] leading-[1.6] not-italic relative shrink-0 text-[9px] text-center" data-node-id="I4:28253;4532:6680">{`\uF1B4`}</p>
              <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:28253;4532:6681">
                <p className="leading-none">ocrisdesing</p>
              </div>
            </div>
            <div className="content-stretch flex gap-[4px] h-full items-center justify-center p-[8px] relative shrink-0 w-[140px]" data-node-id="4:28254" data-name="btn">
              <p className="font-['Font_Awesome_5_Brands:Regular'] leading-[1.6] not-italic relative shrink-0 text-[9px] text-center" data-node-id="I4:28254;4532:6680">{`\uF08C`}</p>
              <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:28254;4532:6681">
                <p className="leading-none">{t("t0564")}</p>
              </div>
            </div>
            <div className="content-stretch flex gap-[4px] h-full items-center justify-center p-[8px] relative shrink-0 w-[140px]" data-node-id="4:28255" data-name="btn">
              <p className="font-['Font_Awesome_5_Brands:Regular'] leading-[1.6] not-italic relative shrink-0 text-[9px] text-center" data-node-id="I4:28255;4532:6680">{`\uF232`}</p>
              <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:28255;4532:6681">
                <p className="leading-none">{`+55 48 99152-6789 `}</p>
              </div>
            </div>
            <div className="content-stretch flex gap-[4px] h-full items-center justify-center p-[8px] relative shrink-0 w-[140px]" data-node-id="4:28256" data-name="btn">
              <p className="font-['Font_Awesome_5_Brands:Regular'] leading-[1.6] not-italic relative shrink-0 text-[9px]" data-node-id="I4:28256;4532:6680">{`\uF2C6`}</p>
              <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:28256;4532:6681">
                <p className="leading-none">{`+55 48 99152-6789 `}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {lang && (
        <div className="content-stretch flex items-center relative shrink-0" data-node-id="4:28257" data-name="nav#lang">
          <div className="[word-break:break-word] content-stretch flex gap-[4px] items-center justify-center min-h-[60px] min-w-[60px] p-[8px] relative shrink-0 text-[#fcfdfe] w-[60px] whitespace-nowrap" data-node-id="4:28258" data-name="btn">
            <p className="font-['Material_Symbols_Outlined:Light'] font-light leading-none relative shrink-0 text-[9px]" data-node-id="I4:28258;4532:6680" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
              translate
            </p>
            <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:28258;4532:6681">
              <p className="leading-none">pt</p>
            </div>
            <div className="flex flex-col font-['Material_Symbols_Outlined:Light'] font-light justify-center leading-[0] relative shrink-0 text-[9px] text-center" data-node-id="I4:28258;4532:6682" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
              <p className="leading-none">arrow_drop_down</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MainHome() {
  const { t, text, path } = useI18n();
  return (
    <div className="bg-[#eeeff1] content-stretch flex flex-col items-start relative size-full" data-node-id="4:35819" data-name="main#home">
      <div className="bg-[#0d0e10] content-stretch flex items-center relative shrink-0 w-full" data-node-id="4:35820" data-name="Navbar">
        <div className="relative shrink-0 size-[60px]" data-node-id="I4:35820;4532:6630" data-name="Adran.brand">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgAdranBrand1} />
        </div>
        <div className="flex flex-[1_0_0] flex-row items-center self-stretch" data-node-id="I4:35820;6308:20773">
          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] h-full items-center justify-end min-w-px relative text-[#fcfdfe] whitespace-nowrap" data-name="nav#social">
            <div className="content-stretch flex gap-[4px] h-full items-center justify-center p-[8px] relative shrink-0 w-[140px]" data-node-id="I4:35820;6308:20774" data-name="btn">
              <p className="font-['Font_Awesome_5_Brands:Regular'] leading-[1.6] not-italic relative shrink-0 text-[9px] text-center" data-node-id="I4:35820;6308:20774;4532:6680">{`\uF1B4`}</p>
              <div className="flex flex-col font-['Sora:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:35820;6308:20774;4532:6681">
                <p className="leading-[1.6]">ocrisdesing</p>
              </div>
            </div>
            <div className="content-stretch flex gap-[4px] h-full items-center justify-center p-[8px] relative shrink-0 w-[140px]" data-node-id="I4:35820;6308:20775" data-name="btn">
              <p className="font-['Font_Awesome_5_Brands:Regular'] leading-[1.6] not-italic relative shrink-0 text-[9px] text-center" data-node-id="I4:35820;6308:20775;4532:6680">{`\uF08C`}</p>
              <div className="flex flex-col font-['Sora:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:35820;6308:20775;4532:6681">
                <p className="leading-[1.6]">{t("t0564")}</p>
              </div>
            </div>
            <div className="content-stretch flex gap-[4px] h-full items-center justify-center p-[8px] relative shrink-0 w-[140px]" data-node-id="I4:35820;6308:20776" data-name="btn">
              <p className="font-['Font_Awesome_5_Brands:Regular'] leading-[1.6] not-italic relative shrink-0 text-[9px] text-center" data-node-id="I4:35820;6308:20776;4532:6680">{`\uF232`}</p>
              <div className="flex flex-col font-['Sora:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:35820;6308:20776;4532:6681">
                <p className="leading-[1.6]">{`+55 48 99152-6789 `}</p>
              </div>
            </div>
            <div className="content-stretch flex gap-[4px] h-full items-center justify-center p-[8px] relative shrink-0 w-[140px]" data-node-id="I4:35820;6308:20777" data-name="btn">
              <p className="font-['Font_Awesome_5_Brands:Regular'] leading-[1.6] not-italic relative shrink-0 text-[9px]" data-node-id="I4:35820;6308:20777;4532:6680">{`\uF2C6`}</p>
              <div className="flex flex-col font-['Sora:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:35820;6308:20777;4532:6681">
                <p className="leading-[1.6]">{`+55 48 99152-6789 `}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex items-center relative shrink-0" data-node-id="I4:35820;4532:6643" data-name="nav#lang">
          <div className="[word-break:break-word] content-stretch flex gap-[4px] items-center justify-center min-h-[60px] min-w-[60px] p-[8px] relative shrink-0 text-[#fcfdfe] w-[60px] whitespace-nowrap" data-node-id="I4:35820;4532:6644" data-name="btn">
            <p className="font-['Material_Symbols_Outlined:Light'] font-light leading-none relative shrink-0 text-[9px]" data-node-id="I4:35820;4532:6644;4532:6680" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
              translate
            </p>
            <div className="flex flex-col font-['Sora:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:35820;4532:6644;4532:6681">
              <p className="leading-none">pt</p>
            </div>
            <div className="flex flex-col font-['Material_Symbols_Outlined:Light'] font-light justify-center leading-[0] relative shrink-0 text-[9px] text-center" data-node-id="I4:35820;4532:6644;4532:6682" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
              <p className="leading-none">arrow_drop_down</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#020305] content-stretch flex flex-col h-[1080px] isolate items-center justify-end overflow-clip pb-[226px] relative shrink-0 w-full" data-node-id="4:35821" data-name="header.intro">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-center relative shrink-0 text-[#fcfdfe] w-full whitespace-nowrap z-[3]" data-node-id="4:35822" data-name="div.flex.flex-col.w-full">
          <h1 className="font-['Sora:SemiBold'] font-semibold leading-[1.1] relative shrink-0 text-[36px]" data-node-id="4:35823">
            {t("t0565")}</h1>
          <p className="font-['Sora:Regular'] font-normal leading-[1.3] relative shrink-0 text-[18px]" data-node-id="4:35824">
            {t("t0566")}</p>
        </div>
        <div className="absolute h-[1080px] left-0 top-0 w-[1920px] z-[1]" data-node-id="4:35826" data-name="video.hero-teaser.loop">
          <video autoPlay className="absolute inset-0 size-full object-cover" loop muted playsInline poster="/videos/hero-poster.jpg" preload="auto">
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="content-stretch flex flex-col h-[1080px] isolate items-center justify-center pb-[112px] relative shrink-0 w-[1920px]" data-node-id="4:35827" data-name="section.cases">
        <div className="absolute content-stretch flex gap-[24px] items-center left-[316px] top-[-200px] z-[4]" data-node-id="4:35828" data-name="div.case-track.scroll-linked-x">
          <a className="bg-[#eeeff1] border border-[#bbbcbe] border-solid content-stretch flex flex-col h-[568px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-[320px]" data-node-id="4:35829" data-name="article.case-card" data-case-slug="navegacao-confusa" href={path("/cases/navegacao-confusa")}>
            <div className="content-stretch flex flex-[1_0_0] isolate items-center justify-center mb-[-140px] min-h-px overflow-clip relative w-full" data-node-id="I4:35829;5339:9858" data-name="card-figure">
              <div className="aspect-[352/632] flex-[1_0_0] min-w-px relative z-[2]" data-node-id="I4:35829;5339:9859" data-name="card-img">
                <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCardImg} />
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] h-[140px] items-start justify-center min-h-[140px] p-[16px] relative shrink-0 w-full" data-node-id="I4:35829;5339:9849" data-name="card-caption">
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="I4:35829;5339:9850" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Geist:Regular'] font-normal leading-[1.6] min-w-px relative text-[#020305] text-[20px]" data-node-id="I4:35829;5339:9851">
                  {t("t0567")}</p>
              </div>
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="I4:35829;5339:9852" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Sora:Light'] font-light leading-[1.6] min-w-px relative text-[#020305] text-[24px]" data-node-id="I4:35829;5339:9853">
                  {t("t0568")}</p>
              </div>
            </div>
          </a>
          <a className="bg-[#eeeff1] border border-[#bbbcbe] border-solid content-stretch flex flex-col h-[568px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-[320px]" data-node-id="4:35830" data-name="article.case-card" data-case-slug="cadastros-complexos" href={path("/cases/cadastros-complexos")}>
            <div className="content-stretch flex flex-[1_0_0] isolate items-center justify-center mb-[-140px] min-h-px overflow-clip relative w-full" data-node-id="I4:35830;5339:9858" data-name="card-figure">
              <div className="aspect-[352/632] flex-[1_0_0] min-w-px relative z-[2]" data-node-id="I4:35830;5339:9859" data-name="card-img">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-full left-[-196.76%] max-w-none top-0 w-[321.69%]" src={imgCardImg1} />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] h-[140px] items-start justify-center min-h-[140px] p-[16px] relative shrink-0 w-full" data-node-id="I4:35830;5339:9849" data-name="card-caption">
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="I4:35830;5339:9850" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Geist:Regular'] font-normal leading-[1.6] min-w-px relative text-[#f9f9f9] text-[20px]" data-node-id="I4:35830;5339:9851">
                  {t("t0159")}</p>
              </div>
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="I4:35830;5339:9852" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Sora:Light'] font-light leading-[1.6] min-w-px relative text-[#f9f9f9] text-[24px]" data-node-id="I4:35830;5339:9853">
                  {t("t0160")}</p>
              </div>
            </div>
          </a>
          <a className="bg-[#eeeff1] border border-[#bbbcbe] border-solid content-stretch flex flex-col h-[568px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-[320px]" data-node-id="4:35831" data-name="article.case-card" data-case-slug="regra-incerta" href={path("/cases/regra-incerta")}>
            <div className="content-stretch flex flex-[1_0_0] isolate items-center justify-center mb-[-140px] min-h-px overflow-clip relative w-full" data-node-id="I4:35831;5339:9858" data-name="card-figure">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCardFigure} />
              <div className="flex-[1_0_0] h-full min-w-px relative z-[2]" data-node-id="I4:35831;5339:9859" data-name="card-img">
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  <div className="absolute bg-[#f9f9f9] inset-0" />
                  <div className="absolute inset-0 overflow-hidden">
                    <img alt="" className="absolute left-[10%] max-w-none size-[80%] top-[-0.03%]" src={imgCardImg2} />
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] h-[140px] items-start justify-center min-h-[140px] p-[16px] relative shrink-0 w-full" data-node-id="I4:35831;5339:9849" data-name="card-caption">
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="I4:35831;5339:9850" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Geist:Regular'] font-normal leading-[1.6] min-w-px relative text-[#020305] text-[20px]" data-node-id="I4:35831;5339:9851">
                  {t("t0569")}</p>
              </div>
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="I4:35831;5339:9852" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Sora:Light'] font-light leading-[1.6] min-w-px relative text-[#020305] text-[24px]" data-node-id="I4:35831;5339:9853">
                  {t("t0570")}</p>
              </div>
            </div>
          </a>
          <a className="bg-[#eeeff1] border border-[#bbbcbe] border-solid content-stretch flex flex-col h-[568px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-[320px]" data-node-id="4:35832" data-name="article.case-card" data-case-slug="qualificacao-complexa" href={path("/cases/qualificacao-complexa")}>
            <div className="content-stretch flex flex-[1_0_0] isolate items-center justify-center mb-[-140px] min-h-px overflow-clip relative w-full" data-node-id="I4:35832;5339:9858" data-name="card-figure">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCardFigure} />
              <div className="flex-[1_0_0] h-full min-w-px relative z-[2]" data-node-id="I4:35832;5339:9859" data-name="card-img">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgCardImg3} />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] h-[140px] items-start justify-center min-h-[140px] p-[16px] relative shrink-0 w-full" data-node-id="I4:35832;5339:9849" data-name="card-caption">
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="I4:35832;5339:9850" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Geist:Regular'] font-normal leading-[1.6] min-w-px relative text-[#fcfdfe] text-[20px]" data-node-id="I4:35832;5339:9851">
                  {t("t0571")}</p>
              </div>
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="I4:35832;5339:9852" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Sora:Light'] font-light leading-[1.6] min-w-px relative text-[#fcfdfe] text-[24px]" data-node-id="I4:35832;5339:9853">
                  {t("t0572")}</p>
              </div>
            </div>
          </a>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center min-h-[112px] px-[160px] py-[24px] relative shrink-0 w-full z-[3]" data-node-id="4:35834" data-name="<h2>">
          <h2 className="[word-break:break-word] font-['Sora:Regular'] font-normal leading-[1.15] relative shrink-0 text-[#000102] text-[44px] text-center w-[1180px]" data-node-id="4:35835">
            {t("t0573")}</h2>
        </div>
        <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full z-[2]" data-node-id="4:35836" data-name="div.case-track.scroll-linked-x">
          <a className="bg-[#eeeff1] border border-[#bbbcbe] border-solid content-stretch flex flex-col h-[568px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-[320px]" data-node-id="4:35837" data-name="article.case-card" data-case-slug="navegacao-confusa" href={path("/cases/navegacao-confusa")}>
            <div className="content-stretch flex flex-[1_0_0] isolate items-center justify-center mb-[-140px] min-h-px overflow-clip relative w-full" data-node-id="I4:35837;5339:9858" data-name="card-figure">
              <div className="aspect-[352/632] flex-[1_0_0] min-w-px relative z-[2]" data-node-id="I4:35837;5339:9859" data-name="card-img">
                <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCardImg} />
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] h-[140px] items-start justify-center min-h-[140px] p-[16px] relative shrink-0 w-full" data-node-id="I4:35837;5339:9849" data-name="card-caption">
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="I4:35837;5339:9850" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Geist:Regular'] font-normal leading-[1.6] min-w-px relative text-[#020305] text-[20px]" data-node-id="I4:35837;5339:9851">
                  {t("t0567")}</p>
              </div>
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="I4:35837;5339:9852" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Sora:Light'] font-light leading-[1.6] min-w-px relative text-[#020305] text-[24px]" data-node-id="I4:35837;5339:9853">
                  {t("t0568")}</p>
              </div>
            </div>
          </a>
          <a className="bg-[#eeeff1] border border-[#bbbcbe] border-solid content-stretch flex flex-col h-[568px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-[320px]" data-node-id="4:35838" data-name="article.case-card" data-case-slug="cadastros-complexos" href={path("/cases/cadastros-complexos")}>
            <div className="content-stretch flex flex-[1_0_0] isolate items-center justify-center mb-[-140px] min-h-px overflow-clip relative w-full" data-node-id="I4:35838;5339:9858" data-name="card-figure">
              <div className="aspect-[352/632] flex-[1_0_0] min-w-px relative z-[2]" data-node-id="I4:35838;5339:9859" data-name="card-img">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-full left-[-196.76%] max-w-none top-0 w-[321.69%]" src={imgCardImg1} />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] h-[140px] items-start justify-center min-h-[140px] p-[16px] relative shrink-0 w-full" data-node-id="I4:35838;5339:9849" data-name="card-caption">
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="I4:35838;5339:9850" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Geist:Regular'] font-normal leading-[1.6] min-w-px relative text-[#f9f9f9] text-[20px]" data-node-id="I4:35838;5339:9851">
                  {t("t0159")}</p>
              </div>
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="I4:35838;5339:9852" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Sora:Light'] font-light leading-[1.6] min-w-px relative text-[#f9f9f9] text-[24px]" data-node-id="I4:35838;5339:9853">
                  {t("t0160")}</p>
              </div>
            </div>
          </a>
          <a className="bg-[#eeeff1] border border-[#bbbcbe] border-solid content-stretch flex flex-col h-[568px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-[320px]" data-node-id="4:35839" data-name="article.case-card" data-case-slug="regra-incerta" href={path("/cases/regra-incerta")}>
            <div className="content-stretch flex flex-[1_0_0] isolate items-center justify-center mb-[-140px] min-h-px overflow-clip relative w-full" data-node-id="I4:35839;5339:9858" data-name="card-figure">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCardFigure} />
              <div className="flex-[1_0_0] h-full min-w-px relative z-[2]" data-node-id="I4:35839;5339:9859" data-name="card-img">
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  <div className="absolute bg-[#f9f9f9] inset-0" />
                  <div className="absolute inset-0 overflow-hidden">
                    <img alt="" className="absolute left-[10%] max-w-none size-[80%] top-[-0.03%]" src={imgCardImg2} />
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] h-[140px] items-start justify-center min-h-[140px] p-[16px] relative shrink-0 w-full" data-node-id="I4:35839;5339:9849" data-name="card-caption">
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="I4:35839;5339:9850" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Geist:Regular'] font-normal leading-[1.6] min-w-px relative text-[#020305] text-[20px]" data-node-id="I4:35839;5339:9851">
                  {t("t0569")}</p>
              </div>
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="I4:35839;5339:9852" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Sora:Light'] font-light leading-[1.6] min-w-px relative text-[#020305] text-[24px]" data-node-id="I4:35839;5339:9853">
                  {t("t0570")}</p>
              </div>
            </div>
          </a>
          <a className="bg-[#eeeff1] border border-[#bbbcbe] border-solid content-stretch flex flex-col h-[568px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-[320px]" data-node-id="4:35840" data-name="article.case-card" data-case-slug="qualificacao-complexa" href={path("/cases/qualificacao-complexa")}>
            <div className="content-stretch flex flex-[1_0_0] isolate items-center justify-center mb-[-140px] min-h-px overflow-clip relative w-full" data-node-id="I4:35840;5339:9858" data-name="card-figure">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCardFigure} />
              <div className="flex-[1_0_0] h-full min-w-px relative z-[2]" data-node-id="I4:35840;5339:9859" data-name="card-img">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgCardImg3} />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] h-[140px] items-start justify-center min-h-[140px] p-[16px] relative shrink-0 w-full" data-node-id="I4:35840;5339:9849" data-name="card-caption">
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="I4:35840;5339:9850" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Geist:Regular'] font-normal leading-[1.6] min-w-px relative text-[#fcfdfe] text-[20px]" data-node-id="I4:35840;5339:9851">
                  {t("t0571")}</p>
              </div>
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="I4:35840;5339:9852" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Sora:Light'] font-light leading-[1.6] min-w-px relative text-[#fcfdfe] text-[24px]" data-node-id="I4:35840;5339:9853">
                  {t("t0572")}</p>
              </div>
            </div>
          </a>
          <a className="bg-[#eeeff1] border border-[#bbbcbe] border-solid content-stretch flex flex-col h-[568px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-[320px]" data-node-id="4:35841" data-name="article.case-card" data-case-slug="corrida-em-jogo" href={path("/cases/corrida-em-jogo")}>
            <div className="content-stretch flex flex-[1_0_0] isolate items-center justify-center mb-[-140px] min-h-px overflow-clip relative w-full" data-node-id="I4:35841;5339:9858" data-name="card-figure">
              <div aria-hidden className="absolute inset-0 pointer-events-none">
                <img alt="" className="absolute max-w-none object-cover size-full" src={imgCardFigure} />
                <div className="absolute bg-black inset-0" />
              </div>
              <div className="flex-[1_0_0] h-full min-w-px relative z-[2]" data-node-id="I4:35841;5339:9859" data-name="card-img">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-full left-[-216.97%] max-w-none top-0 w-[321.69%]" src={imgCardImg4} />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] h-[140px] items-start justify-center min-h-[140px] p-[16px] relative shrink-0 w-full" data-node-id="I4:35841;5339:9849" data-name="card-caption">
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="I4:35841;5339:9850" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Geist:Regular'] font-normal leading-[1.6] min-w-px relative text-[#f9f9f9] text-[20px]" data-node-id="I4:35841;5339:9851">
                  {t("t0349")}</p>
              </div>
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="I4:35841;5339:9852" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Sora:Light'] font-light leading-[1.6] min-w-px relative text-[#f9f9f9] text-[24px]" data-node-id="I4:35841;5339:9853">
                  {t("t0350")}</p>
              </div>
            </div>
          </a>
          <a className="bg-[#eeeff1] border border-[#bbbcbe] border-solid content-stretch flex flex-col h-[568px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-[320px]" data-node-id="4:35842" data-name="article.case-card" data-case-slug="beneficios-dispersos" href={path("/cases/beneficios-dispersos")}>
            <div className="content-stretch flex flex-[1_0_0] isolate items-center justify-center mb-[-140px] min-h-px overflow-clip relative w-full" data-node-id="I4:35842;5339:9858" data-name="card-figure">
              <div aria-hidden className="absolute inset-0 pointer-events-none">
                <img alt="" className="absolute max-w-none object-cover size-full" src={imgCardFigure} />
                <div className="absolute bg-black inset-0" />
              </div>
              <div className="flex-[1_0_0] h-full min-w-px relative z-[2]" data-node-id="I4:35842;5339:9859" data-name="card-img">
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  <div className="absolute bg-[#060709] inset-0" />
                  <div className="absolute inset-0 overflow-hidden">
                    <img alt="" className="absolute left-[15.31%] max-w-none size-[69.38%] top-[6.23%]" src={imgCardImg5} />
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] h-[140px] items-start justify-center min-h-[140px] p-[16px] relative shrink-0 w-full" data-node-id="I4:35842;5339:9849" data-name="card-caption">
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="I4:35842;5339:9850" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Geist:Regular'] font-normal leading-[1.6] min-w-px relative text-[#f9f9f9] text-[20px]" data-node-id="I4:35842;5339:9851">
                  {t("t0010")}</p>
              </div>
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="I4:35842;5339:9852" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Sora:Light'] font-light leading-[1.6] min-w-px relative text-[#f9f9f9] text-[24px]" data-node-id="I4:35842;5339:9853">
                  {t("t0011")}</p>
              </div>
            </div>
          </a>
          <a className="bg-[#eeeff1] border border-[#bbbcbe] border-solid content-stretch flex flex-col h-[568px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-[320px]" data-node-id="4:35843" data-name="article.case-card" data-case-slug="cadastro-travado" href={path("/cases/cadastro-travado")}>
            <div className="content-stretch flex flex-[1_0_0] isolate items-center justify-center mb-[-140px] min-h-px overflow-clip relative w-full" data-node-id="I4:35843;5339:9858" data-name="card-figure">
              <div className="flex-[1_0_0] h-full min-w-px relative z-[2]" data-node-id="I4:35843;5339:9859" data-name="card-img">
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  <div className="absolute bg-[#020305] inset-0" />
                  <div className="absolute inset-0 overflow-hidden">
                    <img alt="" className="absolute h-[123.39%] left-[-102.41%] max-w-none top-[-13.71%] w-[248.12%]" src={imgCardImg6} />
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] h-[140px] items-start justify-center min-h-[140px] p-[16px] relative shrink-0 w-full" data-node-id="I4:35843;5339:9849" data-name="card-caption">
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="I4:35843;5339:9850" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Geist:Regular'] font-normal leading-[1.6] min-w-px relative text-[#f9f9f9] text-[20px]" data-node-id="I4:35843;5339:9851">
                  {t("t0276")}</p>
              </div>
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="I4:35843;5339:9852" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Sora:Light'] font-light leading-[1.6] min-w-px relative text-[#f9f9f9] text-[24px]" data-node-id="I4:35843;5339:9853">
                  {t("t0277")}</p>
              </div>
            </div>
          </a>
          <a className="border border-[#bbbcbe] border-solid content-stretch flex flex-col h-[568px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-[320px]" data-node-id="4:35844" data-name="article.case-card" data-case-slug="uma-marca-por-cliente" href={path("/cases/uma-marca-por-cliente")}>
            <div className="bg-white content-stretch flex flex-[1_0_0] isolate items-center justify-center mb-[-140px] min-h-px overflow-clip relative w-full" data-node-id="I4:35844;5339:9858" data-name="card-figure">
              <div className="flex-[1_0_0] h-full min-w-px relative z-[2]" data-node-id="I4:35844;5339:9859" data-name="card-img">
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  <div className="absolute bg-[#060709] inset-0" />
                  <div className="absolute inset-0 overflow-hidden">
                    <img alt="" className="absolute h-[77.82%] left-0 max-w-none top-0 w-full" src={imgCardImg7} />
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] h-[140px] items-start justify-center min-h-[140px] p-[16px] relative shrink-0 w-full" data-node-id="I4:35844;5339:9849" data-name="card-caption">
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="I4:35844;5339:9850" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Geist:Regular'] font-normal leading-[1.6] min-w-px relative text-[#f9f9f9] text-[20px]" data-node-id="I4:35844;5339:9851">
                  {t("t0574")}</p>
              </div>
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="I4:35844;5339:9852" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Sora:Light'] font-light leading-[1.6] min-w-px relative text-[#f9f9f9] text-[24px]" data-node-id="I4:35844;5339:9853">
                  {t("t0575")}</p>
              </div>
            </div>
          </a>
        </div>
        <div className="content-stretch flex flex-col gap-[24px] items-center px-[160px] py-[24px] relative shrink-0 w-full z-[1]" data-node-id="4:35846" data-name="div.flex.flex-col.gap-6.w-full">
          <div className="[word-break:break-word] font-['Sora:Regular'] font-normal leading-[0] relative shrink-0 text-[#0d0e10] text-[24px] text-center w-[900px] whitespace-pre-wrap" data-node-id="4:35847">
            <p className="leading-[1.5] mb-0">{t("t0576")}</p>
            <p className="leading-[1.5]">{t("t0577")}</p>
          </div>
        </div>
      </div>
      <div className="bg-[#eeeff1] content-stretch flex flex-col gap-[24px] h-[1080px] items-start justify-center px-[160px] py-[128px] relative shrink-0 w-[1920px]" data-node-id="4:35850" data-name="section.services">
        <div className="gap-x-[32px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[94px] relative shrink-0 w-full" data-node-id="4:35851" data-name="div.grid.grid-cols-12.gap-8.w-full">
          <div className="[word-break:break-word] col-[1/span_6] content-stretch flex flex-col font-['Sora:Regular'] font-normal items-start justify-self-stretch relative row-1 self-center shrink-0 text-[#000102] whitespace-nowrap" data-node-id="4:35852" data-name="div.col-span-12.lg:col-span-6">
            <h2 className="leading-[1.15] relative shrink-0 text-[44px]" data-node-id="4:35853">{t("t0578")}</h2>
            <p className="leading-[1.2] relative shrink-0 text-[36px]" data-node-id="4:35854">
              {t("t0579")}</p>
          </div>
          <div className="col-[7/span_6] content-stretch flex flex-col items-start justify-end justify-self-stretch relative row-1 self-center shrink-0" data-node-id="4:35855" data-name="div.col-span-12.lg:col-span-6">
            <p className="[word-break:break-word] font-['Sora:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#0d0e10] text-[20px] w-full" data-node-id="4:35856">
              {t("t0580")}</p>
          </div>
        </div>
        <div className="content-center flex flex-wrap gap-[24px] items-center justify-center relative shrink-0 w-full" data-node-id="4:35857" data-name="div.flex.flex-row.gap-6.w-full">
          <ServiceCard
            service="branding"
            titleKey="t0581"
            subtitleKey="t0582"
            tags={[
              { icon: "palette", label: "Branding" },
              { icon: "palette", label: "Identidade visual" }
            ]}
            additionalTags={[
              { icon: "square", translationKey: "t0583" },
              { icon: "square", translationKey: "t0584" }
            ]}
            poster="/videos/service-brand-poster.jpg"
            videoSrc="/videos/service-brand.mp4"
          />
          <ServiceCard
            service="web"
            titleKey="t0585"
            subtitleKey="t0586"
            tags={[
              { icon: "language", label: "Sites" },
              { icon: "web", label: "Landing pages" },
              { icon: "storefront", label: "Lojas virtuais" }
            ]}
            additionalTags={[
              { icon: "square", translationKey: "t0587" },
              { icon: "square", translationKey: "t0588" },
              { icon: "square", translationKey: "t0589" }
            ]}
            poster="/videos/service-web-poster.jpg"
            videoSrc="/videos/service-web.mp4"
          />
          <ServiceCard
            service="apps"
            titleKey="t0590"
            subtitleKey="t0591"
            tags={[
              { icon: "smartphone", label: "Aplicativos" },
              { icon: "devices", label: "Sistemas" },
              { icon: "cloud", label: "SaaS" }
            ]}
            additionalTags={[
              { icon: "square", translationKey: "t0592" },
              { icon: "square", translationKey: "t0593" },
              { icon: "square", translationKey: "t0594" }
            ]}
            poster="/videos/service-app-poster.jpg"
            videoSrc="/videos/service-app.mp4"
          />
          <ServiceCard
            service="ux"
            titleKey="t0595"
            subtitleKey="t0596"
            tags={[
              { icon: "search", label: "UX Research" },
              { icon: "widgets", label: "Design Systems" }
            ]}
            additionalTags={[
              { icon: "square", translationKey: "t0597" },
              { icon: "square", translationKey: "t0598" }
            ]}
            poster="/videos/service-ux-poster.jpg"
            videoSrc="/videos/service-ux.mp4"
          />
        </div>
      </div>
      <section id="sobre" className="bg-[#eeeff1] flex gap-[64px] h-[1080px] px-[160px] py-[128px] relative shrink-0 w-[1920px] lg:flex-row flex-col" data-node-id="4:35862" data-name="section.about-teaser">
        <div className="flex flex-col gap-[16px] w-full lg:w-1/2" data-node-id="4:35863" data-name="col">
          <div className="flex flex-col gap-[8px]" data-node-id="4:35864" data-name="title">
            <h2 className="font-['Sora:Regular'] font-normal leading-[1.15] text-[#000102] text-[36px]" data-node-id="4:35865">
              {t("t0599")}
            </h2>
            <p className="font-['Sora:Medium'] font-medium leading-[1.2] text-[#6b0013] text-[44px]" data-node-id="4:35866">
              {t("t0600")}
            </p>
          </div>
          <div className="flex flex-col gap-[16px]" data-node-id="4:35867" data-name="profile">
            <p className="font-['Sora:Regular'] font-normal leading-[1.4] text-[#000102] text-[20px]" data-node-id="4:35868">
              {t("t0601")}
            </p>
            <p className="font-['Sora:Regular'] font-normal leading-[1.5] text-[#000102] text-[16px]" data-node-id="4:35869">
              {t("t0602")}
            </p>
            <ul className="flex flex-wrap gap-[12px] list-none m-0 p-0" data-node-id="4:35873" data-name="tags">
              <li className="bg-[#f9f9f9] flex gap-[8px] items-center px-[8px] py-[4px] rounded-[12px]" data-node-id="4:35874" data-name="tag">
                <span className="font-['Material_Symbols_Outlined:Light'] font-light text-[10px]" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
                  psychology
                </span>
                <span className="font-['Sora:Regular'] font-normal text-[11px]">
                  {t("t0650")}
                </span>
              </li>
              <li className="bg-[#f9f9f9] flex gap-[8px] items-center px-[8px] py-[4px] rounded-[12px]" data-node-id="4:35876" data-name="tag">
                <span className="font-['Material_Symbols_Outlined:Light'] font-light text-[10px]" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
                  cycle
                </span>
                <span className="font-['Sora:Regular'] font-normal text-[11px]">
                  {t("t0651")}
                </span>
              </li>
              <li className="bg-[#f9f9f9] flex gap-[8px] items-center px-[8px] py-[4px] rounded-[12px]" data-node-id="4:35877" data-name="tag">
                <span className="font-['Material_Symbols_Outlined:Light'] font-light text-[10px]" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
                  monitoring
                </span>
                <span className="font-['Sora:Regular'] font-normal text-[11px]">
                  {t("t0652")}
                </span>
              </li>
              <li className="bg-[#f9f9f9] flex gap-[8px] items-center px-[8px] py-[4px] rounded-[12px]" data-node-id="4:35878" data-name="tag">
                <span className="font-['Material_Symbols_Outlined:Light'] font-light text-[10px]" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
                  travel_explore
                </span>
                <span className="font-['Sora:Regular'] font-normal text-[11px]">
                  {t("t0653")}
                </span>
              </li>
              <li className="bg-[#f9f9f9] flex gap-[8px] items-center px-[8px] py-[4px] rounded-[12px]" data-node-id="4:35879" data-name="tag">
                <span className="font-['Material_Symbols_Outlined:Light'] font-light text-[10px]" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
                  hub
                </span>
                <span className="font-['Sora:Regular'] font-normal text-[11px]">
                  {t("t0654")}
                </span>
              </li>
              <li className="bg-[#f9f9f9] flex gap-[8px] items-center px-[8px] py-[4px] rounded-[12px]" data-node-id="4:35879" data-name="tag">
                <span className="font-['Material_Symbols_Outlined:Light'] font-light text-[10px]" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
                  diamond
                </span>
                <span className="font-['Sora:Regular'] font-normal text-[11px]">
                  {t("t0655")}
                </span>
              </li>
              <li className="bg-[#f9f9f9] flex gap-[8px] items-center px-[8px] py-[4px] rounded-[12px]" data-node-id="4:35879" data-name="tag">
                <span className="font-['Material_Symbols_Outlined:Light'] font-light text-[10px]" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
                  view_list
                </span>
                <span className="font-['Sora:Regular'] font-normal text-[11px]">
                  {t("t0656")}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="h-[586px] overflow-hidden relative w-full lg:w-1/2 max-w-[586px]" data-node-id="4:35924" data-name="figure.product-illustration">
          <video autoPlay className="absolute inset-0 size-full object-contain" loop muted playsInline poster="/videos/about-poster.jpg" preload="metadata">
            <source src="/videos/about.mp4" type="video/mp4" />
          </video>
        </div>
      </section>
      <div className="bg-[#000102] content-stretch flex flex-col gap-[10px] h-[1080px] items-start overflow-clip relative shrink-0 w-[1920px]" data-node-id="4:35925" data-name="section.case-stories">
        <div className="bg-[#000102] content-stretch flex flex-col gap-[10px] h-[1080px] items-start overflow-clip relative shrink-0 w-[1920px]" data-node-id="4:35926" data-name="div.motion-slideshow.vegas.loop.fade2">
          <div className="bg-[#000102] h-[1080px] overflow-clip relative shrink-0 w-[1920px]" data-node-id="4:35927" data-name="video.slide-00.intro.problem-to-evidence">
            <div className="[word-break:break-word] absolute content-stretch flex flex-col font-['Sora:Regular'] font-normal gap-[14px] items-start left-[160px] overflow-clip text-[#fcfdfe] top-[720px] w-[980px] whitespace-nowrap" data-node-id="4:35928" data-name="div.overlay-copy.intro">
              <p className="leading-[1.15] relative shrink-0 text-[44px]" data-node-id="4:35929">
                {t("t0606")}</p>
              <p className="leading-[0] relative shrink-0 text-[0px]" data-node-id="4:35930">
                <span className="leading-[1.15] text-[54px]">{t("t0607")}</span>
                <span className="font-['Sora:Bold'] font-bold leading-[1.15] text-[#9e1030] text-[54px]">{t("t1082")}</span>
                <span className="leading-[1.15] text-[54px]">.</span>
              </p>
            </div>
          </div>
        </div>
        <div className="absolute left-[420px] size-[1080px] top-0" data-node-id="4:35945" data-name="poster.hero-fallback">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPosterHeroFallback} />
        </div>
      </div>
      <div className="bg-[#eeeff1] content-stretch flex h-[1080px] items-center px-[160px] py-[128px] relative shrink-0 w-[1920px]" data-node-id="4:35946" data-name="section.evidence">
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px relative rounded-[16px]" data-node-id="4:35947" data-name="div.flex.flex-col.w-full">
          <div className="[word-break:break-word] content-stretch flex flex-col font-['Sora:Regular'] font-normal items-start relative shrink-0 text-[#000102] w-full" data-node-id="4:35948" data-name="div.flex.flex-col.w-full">
            <h2 className="leading-[1.15] relative shrink-0 text-[44px] whitespace-nowrap" data-node-id="4:35949">
              {t("t0608")}</h2>
            <p className="leading-[1.2] relative shrink-0 text-[54px] w-[900px]" data-node-id="4:35950">
              {t("t0609")}</p>
          </div>
          <p className="[word-break:break-word] font-['Sora:Regular'] font-normal leading-[1.4] relative shrink-0 text-[#000102] text-[20px] w-[1040px]" data-node-id="4:35951">
            {t("t0610")}</p>
          <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="4:35952" data-name="p">
            <p className="[word-break:break-word] font-['Sora:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#0d0e10] text-[16px] w-[760px]" data-node-id="4:35953">
              {t("t0611")}</p>
          </div>
          <div className="content-stretch flex gap-[24px] h-[100px] items-start overflow-clip relative shrink-0 w-[3816px]" data-node-id="4:35956" data-name="div.evidence-track">
            <div className="content-stretch flex items-end relative shrink-0 w-[438px]" data-node-id="4:35957" data-name="metric-result.outcome">
              <div className="bg-[#020305] content-stretch flex flex-col items-center justify-center max-h-[100px] min-h-[100px] min-w-[100px] px-[16px] py-[4px] relative rounded-[8px] shrink-0" data-node-id="I4:35957;6312:1003" data-name="number">
                <p className="[word-break:break-word] font-['Sora:Regular'] font-normal leading-none relative shrink-0 text-[#fcfdfe] text-[20px] whitespace-nowrap" data-node-id="I4:35957;6312:1004">
                  25%
                </p>
              </div>
              <div className="flex flex-[1_0_0] flex-row items-end self-stretch" data-node-id="I4:35957;6312:1005">
                <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-center min-w-px relative" data-name="content">
                  <div className="[word-break:break-word] bg-[#101113] content-stretch flex flex-col font-['Sora:Regular'] font-normal gap-[8px] items-start leading-none p-[16px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0 text-[#fcfdfe] w-full whitespace-nowrap" data-node-id="I4:35957;6312:1006" data-name="<title>">
                    <p className="relative shrink-0 text-[20px]" data-node-id="I4:35957;6312:1007">
                      {t("t0612")}</p>
                    <p className="relative shrink-0 text-[13px]" data-node-id="I4:35957;6312:1008">
                      {t("t0613")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex items-end relative shrink-0 w-[438px]" data-node-id="4:35958" data-name="metric-result.evidence">
              <div className="bg-[#020305] content-stretch flex flex-col items-center justify-center max-h-[100px] min-h-[100px] min-w-[100px] px-[16px] py-[4px] relative rounded-[8px] shrink-0" data-node-id="I4:35958;6312:1003" data-name="number">
                <p className="[word-break:break-word] font-['Sora:Regular'] font-normal leading-none relative shrink-0 text-[#fcfdfe] text-[20px] whitespace-nowrap" data-node-id="I4:35958;6312:1004">
                  100%
                </p>
              </div>
              <div className="flex flex-[1_0_0] flex-row items-end self-stretch" data-node-id="I4:35958;6312:1005">
                <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-center min-w-px relative" data-name="content">
                  <div className="[word-break:break-word] bg-[#101113] content-stretch flex flex-col font-['Sora:Regular'] font-normal gap-[8px] items-start leading-none p-[16px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0 text-[#fcfdfe] w-full whitespace-nowrap" data-node-id="I4:35958;6312:1006" data-name="<title>">
                    <p className="relative shrink-0 text-[20px]" data-node-id="I4:35958;6312:1007">
                      {t("t0267")}</p>
                    <p className="relative shrink-0 text-[13px]" data-node-id="I4:35958;6312:1008">
                      {t("t0268")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex items-end relative shrink-0 w-[438px]" data-node-id="4:35959" data-name="metric-result.product.outcome">
              <div className="bg-[#020305] content-stretch flex flex-col items-center justify-center max-h-[100px] min-h-[100px] min-w-[100px] px-[16px] py-[4px] relative rounded-[8px] shrink-0" data-node-id="I4:35959;6312:1003" data-name="number">
                <p className="[word-break:break-word] font-['Sora:Regular'] font-normal leading-none relative shrink-0 text-[#fcfdfe] text-[20px] whitespace-nowrap" data-node-id="I4:35959;6312:1004">
                  {t("t0614")}</p>
              </div>
              <div className="flex flex-[1_0_0] flex-row items-end self-stretch" data-node-id="I4:35959;6312:1005">
                <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-center min-w-px relative" data-name="content">
                  <div className="[word-break:break-word] bg-[#101113] content-stretch flex flex-col font-['Sora:Regular'] font-normal gap-[8px] items-start leading-none p-[16px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0 text-[#fcfdfe] w-full whitespace-nowrap" data-node-id="I4:35959;6312:1006" data-name="<title>">
                    <p className="relative shrink-0 text-[20px]" data-node-id="I4:35959;6312:1007">
                      {t("t0615")}</p>
                    <p className="relative shrink-0 text-[13px]" data-node-id="I4:35959;6312:1008">
                      {t("t0616")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex items-end relative shrink-0 w-[438px]" data-node-id="4:35960" data-name="metric-result.product-reach">
              <div className="bg-[#020305] content-stretch flex flex-col items-center justify-center max-h-[100px] min-h-[100px] min-w-[100px] px-[16px] py-[4px] relative rounded-[8px] shrink-0" data-node-id="I4:35960;6312:1003" data-name="number">
                <p className="[word-break:break-word] font-['Sora:Regular'] font-normal leading-none relative shrink-0 text-[#fcfdfe] text-[20px] whitespace-nowrap" data-node-id="I4:35960;6312:1004">
                  {t("t0617")}</p>
              </div>
              <div className="flex flex-[1_0_0] flex-row items-end self-stretch" data-node-id="I4:35960;6312:1005">
                <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-center min-w-px relative" data-name="content">
                  <div className="[word-break:break-word] bg-[#101113] content-stretch flex flex-col font-['Sora:Regular'] font-normal gap-[8px] items-start leading-none p-[16px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0 text-[#fcfdfe] w-full whitespace-nowrap" data-node-id="I4:35960;6312:1006" data-name="<title>">
                    <p className="relative shrink-0 text-[20px]" data-node-id="I4:35960;6312:1007">
                      {t("t0618")}</p>
                    <p className="relative shrink-0 text-[13px]" data-node-id="I4:35960;6312:1008">
                      {t("t0156")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex items-end relative shrink-0 w-[438px]" data-node-id="4:35961" data-name="metric-result.product.outcome">
              <div className="bg-[#020305] content-stretch flex flex-col items-center justify-center max-h-[100px] min-h-[100px] min-w-[100px] px-[16px] py-[4px] relative rounded-[8px] shrink-0" data-node-id="I4:35961;6312:1003" data-name="number">
                <p className="[word-break:break-word] font-['Sora:Regular'] font-normal leading-none relative shrink-0 text-[#fcfdfe] text-[20px] whitespace-nowrap" data-node-id="I4:35961;6312:1004">
                  15%
                </p>
              </div>
              <div className="flex flex-[1_0_0] flex-row items-end self-stretch" data-node-id="I4:35961;6312:1005">
                <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-center min-w-px relative" data-name="content">
                  <div className="[word-break:break-word] bg-[#101113] content-stretch flex flex-col font-['Sora:Regular'] font-normal gap-[8px] items-start leading-none p-[16px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0 text-[#fcfdfe] w-full whitespace-nowrap" data-node-id="I4:35961;6312:1006" data-name="<title>">
                    <p className="relative shrink-0 text-[20px]" data-node-id="I4:35961;6312:1007">
                      {t("t0619")}</p>
                    <p className="relative shrink-0 text-[13px]" data-node-id="I4:35961;6312:1008">
                      {t("t0620")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex items-end relative shrink-0 w-[438px]" data-node-id="4:35963" data-name="metric-result.product.outcome">
              <div className="bg-[#020305] content-stretch flex flex-col items-center justify-center max-h-[100px] min-h-[100px] min-w-[100px] px-[16px] py-[4px] relative rounded-[8px] shrink-0" data-node-id="I4:35963;6312:1003" data-name="number">
                <p className="[word-break:break-word] font-['Sora:Regular'] font-normal leading-none relative shrink-0 text-[#fcfdfe] text-[20px] whitespace-nowrap" data-node-id="I4:35963;6312:1004">
                  56.423
                </p>
              </div>
              <div className="flex flex-[1_0_0] flex-row items-end self-stretch" data-node-id="I4:35963;6312:1005">
                <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-center min-w-px relative" data-name="content">
                  <div className="[word-break:break-word] bg-[#101113] content-stretch flex flex-col font-['Sora:Regular'] font-normal gap-[8px] items-start leading-none p-[16px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0 text-[#fcfdfe] w-full whitespace-nowrap" data-node-id="I4:35963;6312:1006" data-name="<title>">
                    <p className="relative shrink-0 text-[20px]" data-node-id="I4:35963;6312:1007">
                      {t("t0345")}</p>
                    <p className="relative shrink-0 text-[13px]" data-node-id="I4:35963;6312:1008">
                      {t("t0346")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex items-end relative shrink-0 w-[438px]" data-node-id="4:35964" data-name="metric-result.product.outcome">
              <div className="bg-[#020305] content-stretch flex flex-col items-center justify-center max-h-[100px] min-h-[100px] min-w-[100px] px-[16px] py-[4px] relative rounded-[8px] shrink-0" data-node-id="I4:35964;6312:1003" data-name="number">
                <p className="[word-break:break-word] font-['Sora:Regular'] font-normal leading-none relative shrink-0 text-[#fcfdfe] text-[20px] whitespace-nowrap" data-node-id="I4:35964;6312:1004">
                  {t("t0154")}</p>
              </div>
              <div className="flex flex-[1_0_0] flex-row items-end self-stretch" data-node-id="I4:35964;6312:1005">
                <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-center min-w-px relative" data-name="content">
                  <div className="[word-break:break-word] bg-[#101113] content-stretch flex flex-col font-['Sora:Regular'] font-normal gap-[8px] items-start leading-none p-[16px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0 text-[#fcfdfe] w-full whitespace-nowrap" data-node-id="I4:35964;6312:1006" data-name="<title>">
                    <p className="relative shrink-0 text-[20px]" data-node-id="I4:35964;6312:1007">
                      {t("t0621")}</p>
                    <p className="relative shrink-0 text-[13px]" data-node-id="I4:35964;6312:1008">
                      {t("t0622")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="bg-[#eeeff1] content-stretch flex h-[1080px] px-[160px] py-[128px] relative shrink-0 w-[1920px]" data-node-id="4:35965" data-name="section.contact-cta">
        <div className="flex gap-[64px] items-center w-full lg:flex-row flex-col" data-node-id="4:35966" data-name="row">
          <div className="flex flex-col gap-[24px] w-full lg:w-1/2" data-node-id="4:35967" data-name="col">
            <h2 className="font-['Sora:Regular'] font-normal leading-[1.15] text-[#000102] text-[44px]" data-node-id="4:35968">
              {t("t0623")}
            </h2>
            <p className="font-['Sora:Regular'] font-normal leading-[1.2] text-[#000102] text-[36px]" data-node-id="4:35969">{` `}</p>
            <div className="text-[#0d0e10] text-[16px] whitespace-pre-wrap" data-node-id="4:35970">
              <p className="leading-[1.5] mb-0">{t("t0624")}</p>
              <p className="leading-[1.5]">{t("t0625")}</p>
            </div>
          </div>
          <form className="flex flex-col gap-[24px] w-full lg:w-1/2 whitespace-nowrap" data-node-id="4:35971" data-name="<form>" data-contact-form data-hj-suppress data-clarity-mask="true" onSubmit={event => event.preventDefault()}>
            <div className="bg-[#eeeff1] border border-[#999faa] border-solid flex gap-[8px] h-[64px] items-center px-[24px] rounded-[8px]" data-node-id="4:35972" data-name="input-wrapper">
              <span className="font-['Material_Symbols_Outlined:Regular'] text-[#1e22aa]" data-node-id="4:35973" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
                person_pin_circle
              </span>
              <input className="font-['Sora:Regular'] text-[#0d0e10] exact-contact-input w-full" data-node-id="4:35974" name="name" placeholder={t("t0626")} aria-label={text("Nome")} autoComplete="name" />
            </div>
            <div className="bg-[#eeeff1] border border-[#999faa] border-solid flex gap-[8px] h-[64px] items-center px-[24px] rounded-[8px]" data-node-id="4:35975" data-name="input-wrapper">
              <span className="font-['Material_Symbols_Outlined:Regular'] text-[#1e22aa]" data-node-id="4:35976" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
                alternate_email
              </span>
              <input className="font-['Sora:Regular'] text-[#0d0e10] exact-contact-input w-full" data-node-id="4:35977" name="contact" placeholder={t("t0627")} aria-label={text("Telefone ou e-mail")} autoComplete="email" />
            </div>
            <a className="bg-[#0d0e10] flex gap-[16px] items-center justify-center min-h-[60px] px-[16px] py-[8px] rounded-[12px] text-[#f2dee3]" data-node-id="4:35978" data-name="btn" href="https://wa.me/5548991526789" target="_blank" rel="noreferrer">
              <span className="font-['Material_Symbols_Outlined:Light'] font-light text-[24px]" data-node-id="I4:35978;5318:11702" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
                mark_chat_unread
              </span>
              <span className="font-['Geist:Regular'] font-normal text-[12px]" data-node-id="I4:35978;5318:11703">
                {t("t0628")}
              </span>
              <span className="font-['Material_Symbols_Outlined:Light'] font-light text-[24px] text-center" data-node-id="I4:35978;5318:11704" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
                mark_chat_unread
              </span>
            </a>
          </form>
        </div>
      </section>
      <div className="content-stretch flex flex-col h-[1080px] items-start justify-center overflow-clip relative shrink-0 w-[1920px]" data-node-id="4:35979" data-name="footer.site">
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[36px] items-center justify-center min-h-[540px] px-[48px] py-[160px] relative w-full" data-node-id="4:35980" data-name="div.flex.flex-col.w-full">
          <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-node-id="4:35981" data-name="div.flex.flex-row.w-full">
            <div className="content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative" data-node-id="4:35982" data-name="div.flex.flex-col.w-full">
              <div className="relative shrink-0 size-[117px]" data-node-id="4:35983" data-name="Adran.brand">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgAdranBrand2} />
              </div>
              <p className="[word-break:break-word] font-['Sora:Regular'] font-medium leading-[1.2] relative shrink-0 text-[#6b0013] text-[44px] whitespace-nowrap" data-node-id="4:35984">
                {t("t0600")}</p>
              <div className="[word-break:break-word] content-stretch flex flex-col font-['Sora:Regular'] font-normal items-center px-[8px] py-[12px] relative rounded-br-[7.686px] rounded-tr-[7.686px] shrink-0 text-center w-full" data-node-id="4:35985" data-name="<title>">
                <p className="leading-[1.2] relative shrink-0 text-[#000102] text-[30px] whitespace-nowrap" data-node-id="4:35986">
                  {t("t0629")}</p>
                <p className="leading-[1.5] relative shrink-0 text-[#0d0e10] text-[16px] w-[620px]" data-node-id="4:35987">
                  {t("t0630")}</p>
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-center justify-center relative shrink-0 text-[#020305] w-full whitespace-nowrap" data-node-id="4:35988" data-name="div.flex.flex-col.w-full">
            <div className="content-stretch flex h-[60px] items-center relative shrink-0 w-[588px]" data-node-id="4:35989" data-name="nav#pages">
              <div className="content-stretch flex flex-[1_0_0] gap-[4px] h-full items-center min-h-[60px] min-w-px p-[8px] relative" data-node-id="4:35990" data-name="btn">
                <p className="font-['Material_Symbols_Outlined:Light'] font-light leading-none relative shrink-0 text-[9px]" data-node-id="I4:35990;4532:6680" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
                  home
                </p>
                <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:35990;4532:6681">
                  <p className="leading-none">{t("t0554")}</p>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-[60px] min-w-px px-[18px] py-[8px] relative" data-node-id="4:35991" data-name="btn">
                <p className="font-['Material_Symbols_Outlined:Light'] font-light leading-none relative shrink-0 text-[9px]" data-node-id="I4:35991;4532:6680" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
                  cases
                </p>
                <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:35991;4532:6681">
                  <p className="leading-none">{t("t0555")}</p>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-[60px] min-w-px px-[18px] py-[8px] relative" data-node-id="4:35992" data-name="btn">
                <p className="font-['Material_Symbols_Outlined:Light'] font-light leading-none relative shrink-0 text-[9px]" data-node-id="I4:35992;4532:6680" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
                  design_services
                </p>
                <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:35992;4532:6681">
                  <p className="leading-none">{t("t0556")}</p>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-[60px] min-w-px px-[18px] py-[8px] relative" data-node-id="4:35993" data-name="btn">
                <p className="font-['Material_Symbols_Outlined:Light'] font-light leading-none relative shrink-0 text-[9px]" data-node-id="I4:35993;4532:6680" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
                  badge
                </p>
                <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:35993;4532:6681">
                  <p className="leading-none">{t("t0557")}</p>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-[60px] min-w-px p-[8px] relative" data-node-id="4:35994" data-name="btn">
                <p className="font-['Material_Symbols_Outlined:Light'] font-light leading-none relative shrink-0 text-[9px]" data-node-id="I4:35994;4532:6680" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
                  analytics
                </p>
                <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:35994;4532:6681">
                  <p className="leading-none">{t("t0558")}</p>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-[60px] min-w-px px-[18px] py-[8px] relative" data-node-id="4:35995" data-name="btn">
                <p className="font-['Material_Symbols_Outlined:Light'] font-light leading-none relative shrink-0 text-[9px]" data-node-id="I4:35995;4532:6680" style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}>
                  send
                </p>
                <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:35995;4532:6681">
                  <p className="leading-none">{t("t0559")}</p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex h-[60px] items-center relative shrink-0 w-[586.667px]" data-node-id="4:35996" data-name="nav#social">
              <a className="content-stretch flex gap-[4px] h-full items-center justify-center p-[8px] relative shrink-0 w-[140px]" data-node-id="4:35997" data-name="btn" href="https://www.behance.net/ocrisart" target="_blank" rel="noreferrer">
                <p className="font-['Font_Awesome_5_Brands:Regular'] leading-[1.6] not-italic relative shrink-0 text-[9px] text-center" data-node-id="I4:35997;4532:6680">{`\uF1B4`}</p>
                <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:35997;4532:6681">
                  <p className="leading-none">ocrisart</p>
                </div>
              </a>
              <a className="content-stretch flex gap-[4px] h-full items-center justify-center p-[8px] relative shrink-0 w-[140px]" data-node-id="4:35998" data-name="btn" href="mailto:cristiano-acosta@hotmail.com">
                <p className="font-['Material_Symbols_Outlined:Regular'] leading-[1.6] not-italic relative shrink-0 text-[9px] text-center" data-node-id="I4:35998;4532:6680">mail</p>
                <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:35998;4532:6681">
                  <p className="leading-none">falecom@</p>
                </div>
              </a>
              <a className="content-stretch flex gap-[4px] h-full items-center justify-center p-[8px] relative shrink-0 w-[140px]" data-node-id="4:35999" data-name="btn" href="https://wa.me/5548991526789" target="_blank" rel="noreferrer">
                <p className="font-['Font_Awesome_5_Brands:Regular'] leading-[1.6] not-italic relative shrink-0 text-[9px] text-center" data-node-id="I4:35999;4532:6680">{`\uF232`}</p>
                <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:35999;4532:6681">
                  <p className="leading-none">{`+55 48 99152-6789 `}</p>
                </div>
              </a>
              <a className="content-stretch flex gap-[4px] h-full items-center justify-center p-[8px] relative shrink-0 w-[140px]" data-node-id="4:36000" data-name="btn" href="https://www.linkedin.com/in/ocrisarts" target="_blank" rel="noreferrer">
                <p className="font-['Font_Awesome_5_Brands:Regular'] leading-[1.6] not-italic relative shrink-0 text-[9px]" data-node-id="I4:36000;4532:6680">{`\uF08C`}</p>
                <div className="flex flex-col font-['Geist:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[12px]" data-node-id="I4:36000;4532:6681">
                  <p className="leading-none">{t("t0632")}</p>
                </div>
              </a>
            </div>
          </div>
          <div className="content-stretch flex items-center justify-center py-[16px] relative shrink-0 w-full" data-node-id="4:36001" data-name="Copyright Container">
            <div className="[word-break:break-word] flex flex-col font-['Sora:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#0d0e10] text-[11px] whitespace-nowrap" data-node-id="4:36002">
              <p className="leading-[1.6]">{t("t0633")}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 content-stretch flex flex-col items-center left-0 w-[1920px]" data-node-id="4:36003" data-name="Navbar">
        <NavbarStandartFillGlobalDefaultFooter cases={false} className="bg-[#0d0e10] content-stretch flex items-center relative rounded-tl-[8px] rounded-tr-[8px] shrink-0" lang={false} social={false} />
      </div>
    </div>
  );
}
