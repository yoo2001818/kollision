const Line = {
  create(x1, y1, x2, y2) {
    let target = new Float32Array(4);
    return Line.set(x1, y1, x2 == null ? target : x2, y2, target);
  },
  set(x1, y1, x2, y2, dest) {
    if (typeof x1 === 'number') {
      dest[0] = x1;
      dest[1] = y1;
      dest[2] = x2;
      dest[3] = y2;
      return dest;
    }
    let start = x1;
    let end = y1;
    x2[0] = start[0];
    x2[1] = start[1];
    x2[2] = end[0];
    x2[3] = end[1];
    return x2;
  },
  copy(target, dest) {
    dest[0] = target[0];
    dest[1] = target[1];
    dest[2] = target[2];
    dest[3] = target[3];
    return dest;
  },
  start(target, destPoint) {
    destPoint[0] = target[0];
    destPoint[1] = target[1];
    return destPoint;
  },
  end(target, destPoint) {
    destPoint[0] = target[2];
    destPoint[1] = target[3];
    return destPoint;
  },
  translate(target, point, dest) {
    dest[0] = target[0] + point[0];
    dest[1] = target[1] + point[1];
    dest[2] = target[2] + point[0];
    dest[3] = target[3] + point[1];
    return dest;
  },
  lengthSquared(target) {
    let diffX = target[0] - target[2];
    let diffY = target[1] - target[3];
    return diffX * diffX + diffY * diffY;
  },
  length(target) {
    return Math.sqrt(Line.lengthSquared(target));
  },
  width(target) {
    return Math.abs(target[0] - target[2]);
  },
  height(target) {
    return Math.abs(target[1] - target[3]);
  },
  lerp(target, s, distPoint) {
    distPoint[0] = target[0] + s * (target[2] - target[0]);
    distPoint[1] = target[1] + s * (target[3] - target[1]);
    return distPoint;
  },
  getX(target, y) {
    let s = (y - target[1]) / (target[3] - target[1]);
    return target[0] + s * (target[2] - target[0]);
  },
  getY(target, x) {
    // P = A + s(B - A)
    // x = Ax + s(Bx - Ax)
    // x - Ax = s(Bx - Ax)
    // (x - Ax) / (Bx - Ax) = s
    // y = Ay + s(By - Ay)
    let s = (x - target[0]) / (target[2] - target[0]);
    return target[1] + s * (target[3] - target[1]);
  },
  slope(target) {
    return (target[3] - target[1]) / (target[2] - target[0]);
  },
  interceptX(target) {
    return Line.getX(target, 0);
  },
  interceptY(target) {
    return Line.getY(target, 0);
  },
  intersect(a, b, destPoint) {
    let x12 = a[2] - a[0];
    let y12 = a[3] - a[1];
    let x34 = b[2] - b[0];
    let y34 = b[3] - b[1];
    let x13 = a[0] - b[0];
    let y13 = a[1] - b[1];
    let div = (-x34 * y12 + x12 * y34);
    let s = (-y12 * x13 + x12 * y13) / div;
    let t = (x34 * y13 - y34 * x13) / div;
    if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
      if (destPoint) {
        destPoint[0] = a[0] + t * x12;
        destPoint[1] = a[1] + t * y12;
        return destPoint;
      }
      return true;
    }
    return false;
  }
};

export default Line;
