import clsx from 'clsx'

interface Props {
  id: string
  title: string
  description?: string
  scaleUpColor?: boolean
  children: React.ReactNode
}

export default function Section({
  children,
  id,
  title,
  description,
  scaleUpColor,
}: Props) {
  return (
    <section
      aria-labelledby={`section-${id}`}
      className={clsx(
        scaleUpColor && 'bg-gray-2',
        'relative py-16 sm:py-24 lg:py-32',
      )}
    >
      <div className="mx-auto max-w-md space-y-16 px-4 sm:max-w-3xl sm:space-y-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="text-center">
          <h2
            id={`section-${id}`}
            className="text-center text-3xl font-extrabold text-gray-12 sm:text-4xl lg:scroll-mt-32"
          >
            {title}
          </h2>
          {description ? (
            <p className="mx-auto mt-5 max-w-xl text-xl text-primary-11">
              {description}
            </p>
          ) : null}
        </div>

        {children}
      </div>
    </section>
  )
}
