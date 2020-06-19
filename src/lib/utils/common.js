import * as Utils from './index'

export const preserveProps = (props, values) => {
  const { preservePosition } = props || {}
  return preservePosition ? { ...props,  ...values } : props
}

export const setTotalItemsInSlide = (responsiveConfig, childrenLength) => {
  let items = 1
  if (responsiveConfig) {
    const configKeys = Object.keys(responsiveConfig)

    if (configKeys.length) {
      configKeys.forEach((width) => {
        if (width < window.innerWidth) {
          items = Math.min(responsiveConfig[width].items, childrenLength) || items
        }
      })
    }
  }
  return items
}

export const calculateInitialProps = (props, el) => {
  const sizesGrid = Utils.createSizeGrid(el)
  Utils.debug(sizesGrid)
  const { startIndex, responsive, infinite, autoPlay, autoWidth } = props
  const style = Utils.getDefaultStyles()
  const slides = Utils.getSlides(props)
  const stagePadding = Utils.getStagePadding(props)
  const items = autoWidth ? 1 : setTotalItemsInSlide(responsive, slides.length)
  const currentIndex = Utils.setStartIndex(slides.length, startIndex)
  const { width: galleryWidth } = Utils.getElementDimensions(el)
  const itemWidth = autoWidth ? '' : Utils.getItemWidth(galleryWidth, items)
  const clones = Utils.cloneCarouselItems(slides, items, { stagePadding, infinite })
  const translate3d = -sizesGrid[currentIndex] || Utils.getTranslate3dPosition(currentIndex, { itemWidth, items, stagePadding, infinite })
  Utils.debug(translate3d)
  return {
    items,
    itemWidth,
    currentIndex,
    slides,
    clones,
    infinite,
    translate3d,
    sizesGrid,
    stagePadding,
    style,
    isAutoPlaying: autoPlay,
  }
}
