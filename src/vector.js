const vector = {
  create(x, y) {
    let target = new Float32Array(2);
    target[0] = x;
    target[1] = y;
    return target;
  },
  set(x, y, dest) {
    dest[0] = x;
    dest[1] = y;
    return dest;
  },
  copy(target, dest) {
    dest[0] = target[0];
    dest[1] = target[1];
    return dest;
  },
  add(a, b, dest) {
    dest[0] = a[0] + b[0];
    dest[1] = a[1] + b[1];
    return dest;
  },
  addScalar(target, value, dest) {
    dest[0] = value + target[0];
    dest[1] = value + target[1];
    return dest;
  },
  subtract(a, b, dest) {
    dest[0] = a[0] - b[0];
    dest[1] = a[1] - b[1];
    return dest;
  },
  multiply(target, value, dest) {
    dest[0] = value * target[0];
    dest[1] = value * target[1];
    return dest;
  },
  divide(target, value, dest) {
    if (value === 0) return dest;
    dest[0] = target[0] / value;
    dest[1] = target[1] / value;
    return dest;
  },
  invert(target, dest) {
    dest[0] = -target[0];
    dest[1] = -target[1];
    return dest;
  },
  dot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
  },
  cross(a, b) {
    return a[0] * b[1] - a[1] * b[0];
  },
  lengthSquared(target) {
    return target[0] * target[0] + target[1] * target[1];
  },
  length(target) {
    return Math.sqrt(vector.lengthSquared(target));
  },
  normalize(target, dest) {
    return vector.divide(target, vector.length(target), dest);
  }
};

export default vector;
