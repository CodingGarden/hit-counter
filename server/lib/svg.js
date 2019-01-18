function escapeHtml(text = '') {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#039;'
  };

  return text.toString().replace(/[&<>"']/g, (m) => map[m]);
}

function generate({
  width,
  height,
  backgroundColor,
  fontColor,
  fontFamily,
  fontSize,
  maxLength
}, count) {
  return `<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  width="${width}px"
  height="${height}px"
  preserveAspectRatio="xMidYMid meet">
  <rect
    x="0"
    y="0"
    width="100%"
    height="100%"
    style="fill: ${backgroundColor}; stroke: none;"/>
  <text
    x="50%"
    y="50%"
    dominant-baseline="middle"
    text-anchor="middle"
    style="fill: ${fontColor};font-family: ${fontFamily};font-size: ${fontSize}px;">
    ${count.toString().padStart(maxLength, '0')}
  </text>
</svg>`;
}

module.exports = {
  generate,
  escapeHtml
};
