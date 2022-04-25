import Icon from '~/components/Icon'
import type { ProjectItem as ProjectItemProps } from '~/models/projects'
import { generatePictureSource } from '~/utils/image'

export default function ProjectItem({
  name,
  description,
  image,
  sourceCodeUrl,
  demoUrl,
  tags,
}: ProjectItemProps) {
  const url = new URL(demoUrl)
  const demoUrlHostname = url.hostname

  const { fallback, sources } = generatePictureSource(
    image.url,
    512,
    288,
    ['png', 'webp'],
    [
      { width: 384, height: 216, media: '(max-width: 639px)' },
      {
        width: 464,
        height: 261,
        media: '(min-width: 640px) and (max-width: 1023px)',
      },
      { width: 512, height: 288, media: '(min-width: 1024px)' },
    ],
  )

  return (
    <li className="mx-auto max-w-lg rounded-lg bg-gray-2 px-4 py-5 shadow shadow-gray-6 sm:px-6 lg:flex lg:max-w-7xl">
      <div className="relative">
        <picture>
          {sources.map((source) => (
            <source
              key={source.url}
              srcSet={source.url}
              type={source.type}
              media={source.media}
              width={source.width}
              height={source.height}
            />
          ))}
          <img
            className="aspect-video rounded-t-lg border-2 border-gray-6 shadow-md lg:max-w-lg lg:rounded-bl-lg lg:rounded-tr-none"
            src={fallback.url}
            width={fallback.width}
            height={fallback.height}
            alt={`${name} front page`}
            loading="lazy"
          />
        </picture>

        {/* dark overlay for light image so it doesn't burn your eyes */}
        {image.dark ? null : (
          <div className="absolute inset-0 bg-gray-1 opacity-image-overlay" />
        )}
      </div>
      <div className="mt-4 lg:mt-0 lg:ml-8 lg:flex-1">
        <h3 className="text-xl font-medium text-primary-11">{name}</h3>
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
              id="externalLink"
              className="h-6 w-6 shrink-0"
              aria-hidden={true}
            />
            <a
              className="hover:text-gray-12 hover:underline"
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {demoUrlHostname}
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
