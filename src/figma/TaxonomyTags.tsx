import { useI18n } from '../i18n'

export type TaxonomyTag = { icon: string; label: string }
export default function TaxonomyTags({ items, kind = 'meta', dark = false }: { items: TaxonomyTag[]; kind?: string; dark?: boolean }) {
  const { text } = useI18n()
  return <ul className={`taxonomy-tags${dark ? ' taxonomy-tags--dark' : ''}`} data-name={`ul.${kind}`}>
    {items.map(({ icon, label }, index) => <li className="taxonomy-tag" key={`${label}-${index}`}>
      <span className="taxonomy-tag__icon" aria-hidden="true">{icon}</span>
      <span>{text(label)}</span>
    </li>)}
  </ul>
}
