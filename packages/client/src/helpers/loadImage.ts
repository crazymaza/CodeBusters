export default async function loadImage(src: string) {
  await new Promise(resolve => {
    const image = new Image()

    image.addEventListener('load', () => {
      resolve(image)
    })

    image.src = src
  })
}
