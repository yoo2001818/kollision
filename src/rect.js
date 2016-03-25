const Rect = {
  create(x1, y1, x2, y2) {
    let target = new Float32Array(4);
    return Rect.set(x1, y1, x2 == null ? target : x2, y2, target);
  },
  set(x1, y1, x2, y2, dest) {
    if (typeof x1 === 'number') {
      dest[0] = Math.min(x1, x2);
      dest[1] = Math.min(y1, y1);
      dest[2] = Math.max(x1, x2);
      dest[3] = Math.max(y1, y2);
      return dest;
    }
    let start = x1;
    let end = y1;
    x2[0] = Math.min(start[0], end[0]);
    x2[1] = Math.min(start[1], end[1]);
    x2[2] = Math.max(start[0], end[0]);
    x2[3] = Math.max(start[1], end[1]);
    return x2;
  },
  copy(target, dest) {
    dest[0] = target[0];
    dest[1] = target[1];
    dest[2] = target[2];
    dest[3] = target[3];
    return dest;
  },
  minX(target) {
    return target[0];
  },
  minY(target) {
    return target[1];
  },
  min(target, destPoint) {
    destPoint[0] = target[0];
    destPoint[1] = target[1];
    return destPoint;
  },
  maxX(target) {
    return target[2];
  },
  maxY(target) {
    return target[3];
  },
  max(target, destPoint) {
    destPoint[0] = target[2];
    destPoint[1] = target[3];
    return destPoint;
  },
  centerX(target) {
    return (target[0] + target[2]) / 2;
  },
  centerY(target) {
    return (target[1] + target[3]) / 2;
  },
  center(target, destPoint) {
    destPoint[0] = (target[0] + target[2]) / 2;
    destPoint[1] = (target[1] + target[3]) / 2;
    return destPoint;
  },
  translate(target, point, dest) {
    dest[0] = target[0] + point[0];
    dest[1] = target[1] + point[1];
    dest[2] = target[2] + point[0];
    dest[3] = target[3] + point[1];
    return dest;
  },
  width(target) {
    return Math.abs(target[0] - target[2]);
  },
  height(target) {
    return Math.abs(target[1] - target[3]);
  },
  containsPoint(target, point) {
    return target[0] <= point[0] && point[0] <= target[2] &&
      target[1] <= point[1] && point[1] <= target[3];
  },
  containsRect(container, contained) {
    return container[0] <= contained[0] && contained[2] <= container[2] &&
      container[1] <= contained[1] && contained[3] <= container[3];
  },
  intersectsLine(rect, line, destPoint, destDelta, destNormal, destNormal2) {
    // check intersection with slab method
    let dirX = line[2] - line[0];
    let dirY = line[3] - line[1];
    let dirfX = 1 / dirX;
    let dirfY = 1 / dirY;
    let tx1 = (rect[0] - line[0]) * dirfX;
    let tx2 = (rect[2] - line[0]) * dirfX;
    let txMin = Math.min(tx1, tx2);
    let txMax = Math.max(tx1, tx2);
    let ty1 = (rect[1] - line[1]) * dirfY;
    let ty2 = (rect[3] - line[1]) * dirfY;
    let tyMin = Math.min(ty1, ty2);
    let tyMax = Math.max(ty1, ty2);
    let tmin = Math.max(txMin, tyMin);
    let tmax = Math.min(txMax, tyMax);
    if (tmax < tmin) return false;
    if (tmax < 0 || tmin > 1) return false;
    tmin = Math.max(tmin, 0);
    tmax = Math.min(tmax, 1);
    if (destPoint != null) {
      destPoint[0] = tmin * dirX + line[0];
      destPoint[1] = tmin * dirY + line[1];
    }
    if (destDelta != null) {
      destDelta[0] = (tmax - tmin) * dirX;
      destDelta[1] = (tmax - tmin) * dirY;
    }
    if (destNormal != null) {
      if (txMin > tyMin) {
        destNormal[0] = dirX < 0 ? 1 : -1;
        destNormal[1] = 0;
      } else {
        destNormal[0] = 0;
        destNormal[1] = dirY < 0 ? 1 : -1;
      }
    }
    if (destNormal2 != null) {
      if (txMax < tyMax) {
        destNormal2[0] = dirX > 0 ? 1 : -1;
        destNormal2[1] = 0;
      } else {
        destNormal2[0] = 0;
        destNormal2[1] = dirY > 0 ? 1 : -1;
      }
    }
    return true;
  },
  intersectsRect(a, b, destRect) {
    // Do a simple check first
    if (a[0] > b[2] || a[2] < b[0] || a[1] > b[3] || a[3] < b[1]) return false;
    // Then write intersection
    if (destRect != null) {
      destRect[0] = Math.max(a[0], b[0]);
      destRect[1] = Math.max(a[1], b[1]);
      destRect[2] = Math.min(a[2], b[2]);
      destRect[3] = Math.min(a[3], b[3]);
    }
    return true;
  },
  union(a, b, destRect) {
    destRect[0] = Math.min(a[0], b[0]);
    destRect[1] = Math.min(a[1], b[1]);
    destRect[2] = Math.max(a[2], b[2]);
    destRect[3] = Math.max(a[3], b[3]);
    return destRect;
  }
};

export default Rect;
