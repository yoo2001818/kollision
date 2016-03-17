export default class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  set(x, y) {
    if (x instanceof Vector) {
      return this.setVector(x);
    }
    this.x = x;
    this.y = y;
    return this;
  }
  setVector(target) {
    this.x = target.x;
    this.y = target.y;
    return this;
  }
  add(x, y) {
    if (x instanceof Vector) {
      return this.addValue(x);
    }
    this.x += x;
    this.y += y;
    return this;
  }
  addVector(target) {
    this.x += target.x;
    this.y += target.y;
    return this;
  }
  addScalar(value) {
    this.x += value;
    this.y += value;
    return this;
  }
  subtract(x, y) {
    if (x instanceof Vector) {
      return this.subtractVector(x);
    }
    this.x -= x;
    this.y -= y;
    return this;
  }
  subtractVector(target) {
    this.x -= target.x;
    this.y -= target.y;
    return this;
  }
  multiply(value) {
    this.x *= value;
    this.y *= value;
    return this;
  }
  divide(value) {
    // Filter 0, since 0 will cause a problem
    if (value === 0) return this;
    this.x /= value;
    this.y /= value;
    return this;
  }
  invert() {
    this.x -= this.x;
    this.y -= this.y;
    return this;
  }
  dot(target) {
    return this.x * target.x + this.y * target.y;
  }
  cross(target) {
    return this.x * target.y - this.y * target.x;
  }
  lengthSquared() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.lengthSquared());
  }
  setLength(l) {
    return this.multiply(l / this.length());
  }
  normalize() {
    return this.divide(this.length());
  }
  angle() {
    return Math.atan2(this.y, this.x);
  }
  distanceSquared(target) {
    let distX = target.x - this.x;
    let distY = target.y - this.y;
    return distX * distX + distY * distY;
  }
  distance(target) {
    return Math.sqrt(this.distanceSquared(target));
  }
  equals(target) {
    return this.x === target.x && this.y === target.y;
  }
  clone() {
    return new Vector(this.x, this.y);
  }
  translate(target) {
    return this.add(target);
  }
}
