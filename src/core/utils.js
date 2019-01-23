function clamp(value, min, max) {
  return max > min
    ? Math.max(Math.min(value, max), min)
    : Math.max(Math.min(value, min), max);
}

function clone(d) {
  return JSON.parse(JSON.stringify(d));
}

export { clamp, clone };
