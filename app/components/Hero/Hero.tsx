import { useMatches } from 'remix'
import GetFactCode from './GetFactCode'
import HeroHeader from './HeroHeader/HeroHeader'
import Introduction from './Introduction'

export default function Hero() {
  const matches = useMatches().find((match) => match.id === 'routes/index')

  return (
    <header className="mx-auto grid min-h-screen max-w-7xl grid-rows-6 items-center px-4 sm:px-6 lg:px-8">
      <HeroHeader />

      <div className="row-span-5 mx-auto grid max-w-md items-center gap-8 px-4 pb-16 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div className="max-w-lg lg:max-w-md">
          <Introduction />
        </div>
        <div className="text-gray-12 lg:max-w-md">
          <GetFactCode
            generatedText={
              matches?.data?.fact ??
              'Jody Geraldo loves UI/UX and accessibility'
            }
          />
        </div>
      </div>
    </header>
  )
}
