let n = 0;
noise.seed(Math.random());
const svg = d3.select("svg");
const adjustSize = () => {
  const { innerWidth, innerHeight } = window;
  svg.attr("width", innerWidth).attr("height", innerHeight);
};
window.addEventListener("resize", adjustSize);
adjustSize();
const g = svg.append("g").attr("transform", `translate(${960 / 2},${560 / 2})`);
const bars = d3.range(0, 120);

var radialGradient = svg
  .append("defs")
  .append("radialGradient")
  .attr("id", "radial-gradient")
  .attr("gradientUnits", "userSpaceOnUse")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", "30%");
radialGradient
  .append("stop")
  .attr("offset", "60%")
  .attr("stop-color", "#272e3a");

radialGradient
  .append("stop")
  .attr("offset", "100%")
  .attr("stop-color", "#d02835");

g.append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 80)
  .attr("stroke", "#272e3a")
  .attr("fill", "none");

g.selectAll("rect")
  .data(bars)
  .enter()
  .append("rect")
  .attr("x", 100)
  .attr("y", 0)
  .attr("width", 100)
  .attr("height", 4)
  .attr("fill", "url(#radial-gradient)")
  .attr("transform", d => `rotate(${d * 3})`);

const update = () => {
  n += 0.004;
  g.selectAll("rect")
    .data(bars)
    .attr("width", d => 80 + noise.perlin3(d, 1, n) * 160);
  requestAnimationFrame(update);
};
update();
