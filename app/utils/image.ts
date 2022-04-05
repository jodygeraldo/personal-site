type AcceptedImageOutput = 'png' | 'webp'

function generateSources(
  originalUrl: string,
  output: AcceptedImageOutput[],
  set: Array<{ width: number; height: number; media: string }>,
) {
  let url = `//images.weserv.nl/?url=https://jodygeraldo.com${originalUrl}`
  const sources: Array<{
    url: string
    type: string
    media: string
    width: number
    height: number
  }> = []

  set.forEach((image) => {
    const attributes = {
      media: image.media,
      width: image.width,
      height: image.height,
    }

    if (output.includes('webp')) {
      sources.push({
        url: `${url}&w=${image.width}&h=${image.height}&output=webp`,
        type: 'image/webp',
        ...attributes,
      })
    }

    if (output.includes('png')) {
      sources.push({
        url: `${url}&w=${image.width}&h=${image.height}&af`,
        type: 'image/png',
        ...attributes,
      })
    }
  })

  return sources
}

function generateFallbackImage(
  originalUrl: string,
  width: number,
  height: number,
) {
  const fallback = `//images.weserv.nl/?url=https://jodygeraldo.com${originalUrl}&w=${width}&h=${height}&af`

  return { url: fallback, width: width, height: height }
}

function generatePictureSource(
  originalUrl: string,
  width: number,
  height: number,
  output: AcceptedImageOutput[],
  set: Array<{ width: number; height: number; media: string }>,
) {
  const fallback = generateFallbackImage(originalUrl, width, height)
  const sources = generateSources(originalUrl, output, set)

  return { fallback, sources }
}

export { generatePictureSource }
