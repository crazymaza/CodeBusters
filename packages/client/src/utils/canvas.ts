const canvas = (
  canvasElement: HTMLCanvasElement,
  options?: CanvasRenderingContext2DSettings
) => {
  if (canvasElement.getContext) {
    const ctx = canvasElement.getContext('2d', options)

    return { ctx, element: canvasElement }
  } else {
    throw new TypeError('Canvas не поддерживается вашим браузером.')
  }
}

export default canvas
