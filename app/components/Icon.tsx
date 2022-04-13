import type { IconId } from '~/models/icons'
import * as Icons from '~/models/icons'

interface Props {
  id: IconId
}

export default function Icon({
  id,
  ...props
}: Props & React.HTMLAttributes<SVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" {...props}>
      <use href={`${Icons[id]}#id`} />
    </svg>
  )
}
