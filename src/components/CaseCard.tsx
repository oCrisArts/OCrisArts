import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { caseSlugs } from '../data/cases'
const assetPathPrefix = "/assets";
const imgCardImg = `${assetPathPrefix}/front-page/cases/navegacao-confusa.png`;
const imgCardImg1 = `${assetPathPrefix}/front-page/cases/cadastros-complexos.png`;
const imgCardFigure = `${assetPathPrefix}/front-page/cases/card-background.png`;
const imgCardImg2 = `${assetPathPrefix}/front-page/cases/regra-incerta.png`;
const imgCardImg3 = `${assetPathPrefix}/front-page/cases/qualificacao-complexa.png`;
const imgCardImg4 = `${assetPathPrefix}/front-page/cases/corrida-em-jogo.png`;
const imgCardImg5 = `${assetPathPrefix}/front-page/cases/beneficios-dispersos.png`;
const imgCardImg6 = `${assetPathPrefix}/front-page/cases/cadastro-travado.png`;
const imgCardImg7 = `${assetPathPrefix}/front-page/cases/uma-marca-por-cliente.png`;
export { caseSlugs }
export default function CaseCard({slug}: {slug: string}) {
const {t,path}=useI18n();
switch(slug){
case "navegacao-confusa": return (<Link className="bg-[#eeeff1] border border-[#bbbcbe] border-solid content-stretch flex flex-col h-[568px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-[320px]" data-name="article.case-card" data-case-slug="navegacao-confusa" to={path("/cases/navegacao-confusa")}>
            <div className="content-stretch flex flex-[1_0_0] isolate items-center justify-center mb-[-140px] min-h-px overflow-clip relative w-full" data-name="card-figure">
              <div className="aspect-[352/632] flex-[1_0_0] min-w-px relative z-[2]" data-name="card-img">
                <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCardImg} />
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] h-[140px] items-start justify-center min-h-[140px] p-[16px] relative shrink-0 w-full" data-name="card-caption">
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Geist:Regular'] font-normal leading-[1.6] min-w-px relative text-[#020305] text-[20px]">
                  {t("t0567")}</p>
              </div>
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Sora:Light'] font-light leading-[1.6] min-w-px relative text-[#020305] text-[24px]">
                  {t("t0568")}</p>
              </div>
            </div>
          </Link>)
case "cadastros-complexos": return (<Link className="bg-[#eeeff1] border border-[#bbbcbe] border-solid content-stretch flex flex-col h-[568px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-[320px]" data-name="article.case-card" data-case-slug="cadastros-complexos" to={path("/cases/cadastros-complexos")}>
            <div className="content-stretch flex flex-[1_0_0] isolate items-center justify-center mb-[-140px] min-h-px overflow-clip relative w-full" data-name="card-figure">
              <div className="aspect-[352/632] flex-[1_0_0] min-w-px relative z-[2]" data-name="card-img">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-full left-[-196.76%] max-w-none top-0 w-[321.69%]" src={imgCardImg1} />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] h-[140px] items-start justify-center min-h-[140px] p-[16px] relative shrink-0 w-full" data-name="card-caption">
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Geist:Regular'] font-normal leading-[1.6] min-w-px relative text-[#f9f9f9] text-[20px]">
                  {t("t0159")}</p>
              </div>
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Sora:Light'] font-light leading-[1.6] min-w-px relative text-[#f9f9f9] text-[24px]">
                  {t("t0160")}</p>
              </div>
            </div>
          </Link>)
case "regra-incerta": return (<Link className="bg-[#eeeff1] border border-[#bbbcbe] border-solid content-stretch flex flex-col h-[568px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-[320px]" data-name="article.case-card" data-case-slug="regra-incerta" to={path("/cases/regra-incerta")}>
            <div className="content-stretch flex flex-[1_0_0] isolate items-center justify-center mb-[-140px] min-h-px overflow-clip relative w-full" data-name="card-figure">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCardFigure} />
              <div className="flex-[1_0_0] h-full min-w-px relative z-[2]" data-name="card-img">
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  <div className="absolute bg-[#f9f9f9] inset-0" />
                  <div className="absolute inset-0 overflow-hidden">
                    <img alt="" className="absolute left-[10%] max-w-none size-[80%] top-[-0.03%]" src={imgCardImg2} />
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] h-[140px] items-start justify-center min-h-[140px] p-[16px] relative shrink-0 w-full" data-name="card-caption">
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Geist:Regular'] font-normal leading-[1.6] min-w-px relative text-[#020305] text-[20px]">
                  {t("t0569")}</p>
              </div>
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Sora:Light'] font-light leading-[1.6] min-w-px relative text-[#020305] text-[24px]">
                  {t("t0570")}</p>
              </div>
            </div>
          </Link>)
case "qualificacao-complexa": return (<Link className="bg-[#eeeff1] border border-[#bbbcbe] border-solid content-stretch flex flex-col h-[568px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-[320px]" data-name="article.case-card" data-case-slug="qualificacao-complexa" to={path("/cases/qualificacao-complexa")}>
            <div className="content-stretch flex flex-[1_0_0] isolate items-center justify-center mb-[-140px] min-h-px overflow-clip relative w-full" data-name="card-figure">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCardFigure} />
              <div className="flex-[1_0_0] h-full min-w-px relative z-[2]" data-name="card-img">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgCardImg3} />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] h-[140px] items-start justify-center min-h-[140px] p-[16px] relative shrink-0 w-full" data-name="card-caption">
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Geist:Regular'] font-normal leading-[1.6] min-w-px relative text-[#fcfdfe] text-[20px]">
                  {t("t0571")}</p>
              </div>
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Sora:Light'] font-light leading-[1.6] min-w-px relative text-[#fcfdfe] text-[24px]">
                  {t("t0572")}</p>
              </div>
            </div>
          </Link>)
case "corrida-em-jogo": return (<Link className="bg-[#eeeff1] border border-[#bbbcbe] border-solid content-stretch flex flex-col h-[568px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-[320px]" data-name="article.case-card" data-case-slug="corrida-em-jogo" to={path("/cases/corrida-em-jogo")}>
            <div className="content-stretch flex flex-[1_0_0] isolate items-center justify-center mb-[-140px] min-h-px overflow-clip relative w-full" data-name="card-figure">
              <div aria-hidden className="absolute inset-0 pointer-events-none">
                <img alt="" className="absolute max-w-none object-cover size-full" src={imgCardFigure} />
                <div className="absolute bg-black inset-0" />
              </div>
              <div className="flex-[1_0_0] h-full min-w-px relative z-[2]" data-name="card-img">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-full left-[-216.97%] max-w-none top-0 w-[321.69%]" src={imgCardImg4} />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] h-[140px] items-start justify-center min-h-[140px] p-[16px] relative shrink-0 w-full" data-name="card-caption">
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Geist:Regular'] font-normal leading-[1.6] min-w-px relative text-[#f9f9f9] text-[20px]">
                  {t("t0349")}</p>
              </div>
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Sora:Light'] font-light leading-[1.6] min-w-px relative text-[#f9f9f9] text-[24px]">
                  {t("t0350")}</p>
              </div>
            </div>
          </Link>)
case "beneficios-dispersos": return (<Link className="bg-[#eeeff1] border border-[#bbbcbe] border-solid content-stretch flex flex-col h-[568px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-[320px]" data-name="article.case-card" data-case-slug="beneficios-dispersos" to={path("/cases/beneficios-dispersos")}>
            <div className="content-stretch flex flex-[1_0_0] isolate items-center justify-center mb-[-140px] min-h-px overflow-clip relative w-full" data-name="card-figure">
              <div aria-hidden className="absolute inset-0 pointer-events-none">
                <img alt="" className="absolute max-w-none object-cover size-full" src={imgCardFigure} />
                <div className="absolute bg-black inset-0" />
              </div>
              <div className="flex-[1_0_0] h-full min-w-px relative z-[2]" data-name="card-img">
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  <div className="absolute bg-[#060709] inset-0" />
                  <div className="absolute inset-0 overflow-hidden">
                    <img alt="" className="absolute left-[15.31%] max-w-none size-[69.38%] top-[6.23%]" src={imgCardImg5} />
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] h-[140px] items-start justify-center min-h-[140px] p-[16px] relative shrink-0 w-full" data-name="card-caption">
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Geist:Regular'] font-normal leading-[1.6] min-w-px relative text-[#f9f9f9] text-[20px]">
                  {t("t0010")}</p>
              </div>
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Sora:Light'] font-light leading-[1.6] min-w-px relative text-[#f9f9f9] text-[24px]">
                  {t("t0011")}</p>
              </div>
            </div>
          </Link>)
case "cadastro-travado": return (<Link className="bg-[#eeeff1] border border-[#bbbcbe] border-solid content-stretch flex flex-col h-[568px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-[320px]" data-name="article.case-card" data-case-slug="cadastro-travado" to={path("/cases/cadastro-travado")}>
            <div className="content-stretch flex flex-[1_0_0] isolate items-center justify-center mb-[-140px] min-h-px overflow-clip relative w-full" data-name="card-figure">
              <div className="flex-[1_0_0] h-full min-w-px relative z-[2]" data-name="card-img">
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  <div className="absolute bg-[#020305] inset-0" />
                  <div className="absolute inset-0 overflow-hidden">
                    <img alt="" className="absolute h-[123.39%] left-[-102.41%] max-w-none top-[-13.71%] w-[248.12%]" src={imgCardImg6} />
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] h-[140px] items-start justify-center min-h-[140px] p-[16px] relative shrink-0 w-full" data-name="card-caption">
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Geist:Regular'] font-normal leading-[1.6] min-w-px relative text-[#f9f9f9] text-[20px]">
                  {t("t0276")}</p>
              </div>
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Sora:Light'] font-light leading-[1.6] min-w-px relative text-[#f9f9f9] text-[24px]">
                  {t("t0277")}</p>
              </div>
            </div>
          </Link>)
case "uma-marca-por-cliente": return (<Link className="border border-[#bbbcbe] border-solid content-stretch flex flex-col h-[568px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-[320px]" data-name="article.case-card" data-case-slug="uma-marca-por-cliente" to={path("/cases/uma-marca-por-cliente")}>
            <div className="bg-white content-stretch flex flex-[1_0_0] isolate items-center justify-center mb-[-140px] min-h-px overflow-clip relative w-full" data-name="card-figure">
              <div className="flex-[1_0_0] h-full min-w-px relative z-[2]" data-name="card-img">
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  <div className="absolute bg-[#060709] inset-0" />
                  <div className="absolute inset-0 overflow-hidden">
                    <img alt="" className="absolute h-[77.82%] left-0 max-w-none top-0 w-full" src={imgCardImg7} />
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] h-[140px] items-start justify-center min-h-[140px] p-[16px] relative shrink-0 w-full" data-name="card-caption">
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Geist:Regular'] font-normal leading-[1.6] min-w-px relative text-[#f9f9f9] text-[20px]">
                  {t("t0574")}</p>
              </div>
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="card-title">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Sora:Light'] font-light leading-[1.6] min-w-px relative text-[#f9f9f9] text-[24px]">
                  {t("t0575")}</p>
              </div>
            </div>
          </Link>)
default: return null;
}}
