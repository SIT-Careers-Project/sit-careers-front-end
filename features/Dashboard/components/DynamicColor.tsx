const calculatePoint = (i, intervalSize, colorRangeInfo) => {
  const { colorStart, colorEnd, useEndAsStart } = colorRangeInfo
  return useEndAsStart ? colorEnd - i * intervalSize : colorStart + i * intervalSize
}

const dynamicColors = (dataLength, colorScale, colorRangeInfo) => {
  const { colorStart, colorEnd } = colorRangeInfo
  const colorRange = colorEnd - colorStart
  const intervalSize = colorRange / dataLength
  let i, colorPoint
  const colorArray = []

  for (i = 0; i < dataLength; i++) {
    colorPoint = calculatePoint(i, intervalSize, colorRangeInfo)
    colorArray.push(colorScale(colorPoint))
  }

  return colorArray
}

export default dynamicColors
