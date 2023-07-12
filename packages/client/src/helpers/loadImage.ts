export default function loadImage(src: string) {
  return new Promise(resolve => {
    const image = new Image()

    image.addEventListener('load', () => {
      resolve(image)
    })

    image.src = src
  })
}
