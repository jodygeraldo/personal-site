import Icon from '~/components/Icon'

export interface ProjectItemProps {
  name: string
  description: string
  imageUrl: {
    default: string
    sources: {
      url: string
      media?: string
      type: 'png' | 'webp' | 'avif'
    }[]
    dark?: boolean
  }
  sourceCodeUrl: string
  demoUrl: string
  tags: string[]
}

export default function ProjectItem({
  name,
  description,
  imageUrl,
  sourceCodeUrl,
  demoUrl,
  tags,
}: ProjectItemProps) {
  const parsedDemoUrl = demoUrl.slice(0, -1).replace(/^https?:\/\//, '')
  if (parsedDemoUrl.endsWith('/')) {
    parsedDemoUrl.slice(0, -1)
  }

  return (
    <li className="mx-auto max-w-lg rounded-lg bg-gray-2 p-4 shadow shadow-gray-6 sm:p-6 lg:flex lg:max-w-7xl">
      <div className="relative">
        <picture>
          {imageUrl.sources.map((source) => (
            <source
              key={source.url}
              srcSet={source.url}
              type={`image/${source.type}`}
              media={source.media}
            />
          ))}
          <img
            className="aspect-video rounded-t-lg border-2 border-gray-6 shadow-md lg:max-w-lg lg:rounded-bl-lg lg:rounded-tr-none"
            src={imageUrl.default}
            width="640"
            height="360"
            alt={`${name} front page`}
            loading="lazy"
          />
        </picture>

        {/* dark overlay for light image so it doesn't burn your eyes */}
        {imageUrl.dark ? null : (
          <div className="absolute inset-0 bg-gray-1 opacity-image-overlay" />
        )}
      </div>
      <div className="mt-4 lg:mt-0 lg:ml-8 lg:flex-1">
        <h3 className="text-xl font-medium text-primary-9">{name}</h3>
        <p className="mt-2 text-gray-11">{description}</p>
        <div className="my-4 flex items-center gap-4 text-sm text-gray-11">
          <span className="sr-only">Built with</span>
          <Icon id="rocket" className="h-6 w-6 shrink-0" aria-hidden={true} />
          <ul className="flex flex-wrap gap-4">
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-4 border-t border-gray-6 pt-4 text-gray-11">
          <div className="flex items-center gap-4">
            <Icon
              id="external-link"
              className="h-6 w-6 shrink-0"
              aria-hidden={true}
            />
            <a
              className="hover:text-gray-12 hover:underline"
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {parsedDemoUrl}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Icon id="github" className="h-6 w-6 shrink-0" aria-hidden={true} />
            <a
              className="hover:text-gray-12 hover:underline"
              href={sourceCodeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source code on github
            </a>
          </div>
        </div>
      </div>
    </li>
  )
}
