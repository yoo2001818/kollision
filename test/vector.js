import expect from 'expect';
import Vector from '../src/vector';

describe('Vector', function() {
  describe('#create', function() {
    context('when two numbers are given', function() {
      it('should return a Float32Array', function() {
        expect(Vector.create(0, 3)).toEqual(new Float32Array([0, 3]));
      });
    });
    context('when non-numbers are given', function() {
      it('should throw an error', function() {
        expect(() => Vector.create('not','number')).toThrow();
        expect(() => Vector.create('not', 0)).toThrow();
        expect(() => Vector.create(0, 'number')).toThrow();
      });
    });
    context('when NaN is given', function() {
      it('should throw an error', function() {
        expect(() => Vector.create(NaN, NaN)).toThrow();
        expect(() => Vector.create(NaN, 0)).toThrow();
        expect(() => Vector.create(0, -NaN)).toThrow();
      });
    });
  });
  describe('#set', function() {
    let a;
    beforeEach('create vector', function() {
      a = Vector.create(0, 0);
    });
    context('when two numbers are given', function() {
      it('should set the value', function() {
        Vector.set(2, 3, a);
        expect(a).toEqual(new Float32Array([2, 3]));
        Vector.set(1, 8, a);
        expect(a).toEqual(new Float32Array([1, 8]));
      });
      it('should return the Vector object', function() {
        expect(Vector.set(1, 1, a)).toBe(a);
      });
    });
    context('when non-numbers are given', function() {
      it('should throw an error', function() {
        expect(() => Vector.set('not','number', a)).toThrow();
        expect(() => Vector.set('not', 0, a)).toThrow();
        expect(() => Vector.set(0, 'number', a)).toThrow();
      });
    });
    context('when NaN is given', function() {
      it('should throw an error', function() {
        expect(() => Vector.set(NaN, NaN, a)).toThrow();
        expect(() => Vector.set(NaN, 0, a)).toThrow();
        expect(() => Vector.set(0, -NaN, a)).toThrow();
      });
    });
    context('when wrong object is given as a vector', () => {
      it('should throw an error', function() {
        expect(() => Vector.set(1, 1, undefined)).toThrow();
        expect(() => Vector.set(1, 1, null)).toThrow();
        expect(() => Vector.set(1, 1, new Float32Array(1))).toThrow();
      });
    });
  });
  describe('#copy', function() {
    let a;
    beforeEach('create vector', function() {
      a = Vector.create(0, 0);
    });
    it('should copy vector data', function() {
      Vector.copy(Vector.create(5, 3), a);
      expect(a).toEqual(new Float32Array([5, 3]));
    });
    it('should return the Vector object', function() {
      expect(Vector.copy(Vector.create(5, 3), a)).toBe(a);
    });
  });
  describe('#add', function() {
    let a;
    beforeEach('create vector', function() {
      a = Vector.create(0, 0);
    });
    it('should add two vectors', function() {
      Vector.add(Vector.create(5, 3), Vector.create(1, 2), a);
      expect(a).toEqual(new Float32Array([6, 5]));
    });
    it('should return the Vector object', function() {
      expect(Vector.add(Vector.create(0, 0), Vector.create(1, 1), a)).toBe(a);
    });
  });
  describe('#addScalar', function() {
    let a;
    beforeEach('create vector', function() {
      a = Vector.create(0, 0);
    });
    it('should add scalar value', function() {
      Vector.addScalar(Vector.create(3, 8), 2, a);
      expect(a).toEqual(new Float32Array([5, 10]));
    });
    it('should return the Vector object', function() {
      expect(Vector.addScalar(Vector.create(0, 0), 1, a)).toBe(a);
    });
  });
  describe('#subtract', function() {
    let a;
    beforeEach('create vector', function() {
      a = Vector.create(0, 0);
    });
    it('should subtract two vectors', function() {
      Vector.subtract(Vector.create(5, 3), Vector.create(1, 2), a);
      expect(a).toEqual(new Float32Array([4, 1]));
    });
    it('should return the Vector object', function() {
      expect(Vector.subtract(Vector.create(0, 0), Vector.create(1, 1), a))
        .toBe(a);
    });
  });
  describe('#multiply', function() {
    let a;
    beforeEach('create vector', function() {
      a = Vector.create(0, 0);
    });
    it('should multiply scalar value', function() {
      Vector.multiply(Vector.create(3, 8), 2, a);
      expect(a).toEqual(new Float32Array([6, 16]));
    });
    it('should return the Vector object', function() {
      expect(Vector.multiply(Vector.create(0, 0), 1, a)).toBe(a);
    });
  });
  describe('#divide', function() {
    let a;
    beforeEach('create vector', function() {
      a = Vector.create(0, 0);
    });
    it('should divide scalar value', function() {
      Vector.divide(Vector.create(3, 8), 2, a);
      expect(a).toEqual(new Float32Array([1.5, 4]));
    });
    it('should ignore 0', function() {
      Vector.divide(Vector.create(3, 8), 0, a);
      expect(a).toEqual(new Float32Array([3, 8]));
    });
    it('should return the Vector object', function() {
      expect(Vector.divide(Vector.create(0, 0), 1, a)).toBe(a);
      expect(Vector.divide(Vector.create(0, 0), 0, a)).toBe(a);
    });
  });
  describe('#invert', function() {
    let a;
    beforeEach('create vector', function() {
      a = Vector.create(0, 0);
    });
    it('should invert vector', function() {
      Vector.invert(Vector.create(3, -8), a);
      expect(a).toEqual(new Float32Array([-3, 8]));
    });
    it('should return the Vector object', function() {
      expect(Vector.invert(Vector.create(0, 0), a)).toBe(a);
    });
  });
  describe('#dot', function() {
    it('should return dot product', function() {
      expect(
        Vector.dot(Vector.create(1, 2), Vector.create(1, 2))
      ).toBe(5);
      expect(
        Vector.dot(Vector.create(1, 2), Vector.create(-2, 1))
      ).toBe(0);
    });
  });
  describe('#cross', function() {
    it('should return cross product', function() {
      expect(
        Vector.cross(Vector.create(1, 2), Vector.create(2, 4))
      ).toBe(0);
      expect(
        Vector.cross(Vector.create(1, 2), Vector.create(-2, 1))
      ).toBe(5);
    });
  });
  describe('#lengthSquared', function() {
    it('should return squared length', function() {
      expect(
        Vector.lengthSquared(Vector.create(1, 2))
      ).toBe(5);
      expect(
        Vector.lengthSquared(Vector.create(-1, 2))
      ).toBe(5);
    });
  });
  describe('#length', function() {
    it('should return length', function() {
      expect(
        Vector.length(Vector.create(3, 4))
      ).toBe(5);
      expect(
        Vector.length(Vector.create(-3, 4))
      ).toBe(5);
    });
  });
  describe('#lengthTaxi', function() {
    it('should return taxicab length', function() {
      expect(
        Vector.lengthTaxi(Vector.create(3, 4))
      ).toBe(7);
      expect(
        Vector.lengthTaxi(Vector.create(-3, 4))
      ).toBe(7);
    });
  });
  describe('#lengthInfinity', function() {
    it('should return infinity length', function() {
      expect(
        Vector.lengthInfinity(Vector.create(3, 4))
      ).toBe(4);
      expect(
        Vector.lengthInfinity(Vector.create(-3, -4))
      ).toBe(4);
    });
  });
  describe('#normalize', function() {
    let a;
    beforeEach('create vector', function() {
      a = Vector.create(0, 0);
    });
    it('should normalize vector', function() {
      Vector.normalize(Vector.create(1, 1), a);
      expect(a).toEqual(new Float32Array([
        Math.cos(Math.PI/4), Math.sin(Math.PI/4)
      ]));
    });
    it('should return the Vector object', function() {
      expect(Vector.normalize(Vector.create(0, 0), a)).toBe(a);
    });
  });
  describe('#lerp', function() {
    it('should set the linear interpolation point of two vectors', function() {
      let vector = Vector.create(0, 0);
      expect(Vector.lerp(Vector.create(1, 2), Vector.create(3, 4),
        0.5, vector)).toEqual(new Float32Array([2, 3]));
      expect(Vector.lerp(Vector.create(-2, 1), Vector.create(2, -1),
        1/4, vector)).toEqual(new Float32Array([-1, 0.5]));
    });
    it('should return the vector', function() {
      let vector = Vector.create(0, 0);
      expect(Vector.lerp(Vector.create(1, 2), Vector.create(3, 4), 0.5,
        vector)).toBe(vector);
    });
  });
  describe('#distanceSquared', function() {
    it('should return squared distance of two vectors', function() {
      expect(Vector.distanceSquared(Vector.create(4.2, 4),
        Vector.create(8.2, 7))).toBe(25);
      expect(Vector.distanceSquared(Vector.create(-9, -2),
        Vector.create(5, 3))).toBe(221);
    });
  });
  describe('#distance', function() {
    it('should return distance of two vectors', function() {
      expect(Vector.distance(Vector.create(4.2, 4),
        Vector.create(8.2, 7))).toBe(5);
      expect(Vector.distance(Vector.create(-9, -2),
        Vector.create(5, 3))).toBe(Math.sqrt(221));
    });
  });
  describe('#distanceTaxi', function() {
    it('should return taxicab distance of two vectors', function() {
      expect(Vector.distanceTaxi(Vector.create(4.2, 4),
        Vector.create(8.2, 7))).toBe(7);
      expect(Vector.distanceTaxi(Vector.create(-9, -2),
        Vector.create(5, 3))).toBe(19);
    });
  });
  describe('#distanceInfinity', function() {
    it('should return infinity distance of two vectors', function() {
      expect(Vector.distanceInfinity(Vector.create(4.2, 4),
        Vector.create(8.2, 7))).toBe(4);
      expect(Vector.distanceInfinity(Vector.create(-9, -2),
        Vector.create(5, 3))).toBe(14);
    });
  });
  describe('#project', function () {
    it('should set the projection point');
  });
});
