import { cx } from '../../lib/cx'
import { Chip } from './Chip'
import { Icon } from './Icon'

type ChipTone = React.ComponentProps<typeof Chip>['tone']

interface SectionHeadingProps {
  icon: string
  title: string
  tag: string
  /** Classes for the icon badge background and icon color. */
  iconClassName: string
  tagTone?: ChipTone
}

export function SectionHeading({ icon, title, tag, iconClassName, tagTone = 'muted' }: SectionHeadingProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-space-sm">
        <div
          className={cx('size-7 rounded flex items-center justify-center comic-stroke shadow-comic-sm', iconClassName)}
        >
          <Icon name={icon} className="text-base" />
        </div>
        <h2 className="font-headline-md text-headline-md uppercase text-on-surface tracking-tight">{title}</h2>
      </div>
      <Chip tone={tagTone} className="uppercase rounded">
        {tag}
      </Chip>
    </div>
  )
}
