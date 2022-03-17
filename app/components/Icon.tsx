export type IconIdType =
  | 'sun'
  | 'moon'
  | 'arrow-down'
  | 'envelope-closed'
  | 'github'
  | 'twitter'
  | 'discord'
  | 'external-link'
  | 'paper-plane'
  | 'play'
  | 'hamburger-menu'
  | 'cross'
  | 'rocket'
  | 'globe'
  | 'chevron-down'

interface Props {
  id: IconIdType
}

export default function Icon({
  id,
  ...props
}: Props & React.HTMLAttributes<SVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" {...props}>
      <use href={`/assets/icons/radix.svg#${id}`} />
    </svg>
  )
}
