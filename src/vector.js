function validateInput(x) {
  if (typeof x !== 'number' && !(x instanceof Number)) {
    throw new Error('Only numbers are accepted');
  }
  if (isNaN(x)) throw new Error('NaN is not accepted');
}
function validateVector(v) {
  if (v.length !== 2) throw new Error('Object is not a vector');
}

const Vector = {
  create(x, y) {
    let target = new Float32Array(2);
    return Vector.set(x, y, target);
  },
  set(x, y, dest) {
    validateVector(dest);
    validateInput(x);
    validateInput(y);
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
    if (value === 0) return Vector.copy(target, dest);
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
    return Math.sqrt(Vector.lengthSquared(target));
  },
  lengthTaxi(target) {
    return Math.abs(target[0]) + Math.abs(target[1]);
  },
  lengthInfinity(target) {
    return Math.max(Math.abs(target[0]), Math.abs(target[1]));
  },
  normalize(target, dest) {
    return Vector.divide(target, Vector.length(target), dest);
  },
  lerp(a, b, s, dest) {
    dest[0] = a[0] + s * (b[0] - a[0]);
    dest[1] = a[1] + s * (b[1] - a[1]);
    return dest;
  },
  distanceSquared(a, b) {
    let diffX = a[0] - b[0];
    let diffY = a[1] - b[1];
    return diffX * diffX + diffY * diffY;
  },
  distance(a, b) {
    return Math.sqrt(Vector.distanceSquared(a, b));
  },
  distanceTaxi(a, b) {
    return Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]);
  },
  distanceInfinity(a, b) {
    return Math.max(Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1]));
  },
  project(a, b, dest) {
    // Projects vector A to B
    //      /|
    // A - / |
    //     -->---> - B
    //   Aproj
    return Vector.multiply(b, Vector.dot(a, b) / Vector.lengthSquared(b), dest);
  }
};

export default Vector;
