export function changeSizeText(container, elements) {
  let fullWidth = getFullWidth(container, elements)
  let fontSize = parseFloat(window.getComputedStyle(elements[0]).fontSize)

  while (fullWidth > container.clientWidth && fontSize > 0) {
    fontSize -= 1;

    Array.from(elements).forEach(el => {
      el.style.fontSize = fontSize + 'px'
    })

    fullWidth = getFullWidth(container, elements)
  }
}

function getFullWidth(container, elements) {
  const fullColsWidth = Array.from(elements).reduce((acc, item) => item.clientWidth + acc, 0)
  const colsGapWidth = parseFloat(getComputedStyle(container).columnGap)

  return fullColsWidth + colsGapWidth * (elements.length - 1)
}