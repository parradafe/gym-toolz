import { cx } from '../../lib/cx'

export function Panel({ className, children, ...rest }: React.ComponentProps<'div'>) {
  return (
    <div className={cx('bg-surface-container-lowest p-space-md comic-panel', className)} {...rest}>
      {children}
    </div>
  )
}
