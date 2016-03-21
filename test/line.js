import expect from 'expect';
import Line from '../src/line';
import Vector from '../src/vector';

describe('Line', function() {
  describe('#create', function() {
    context('when two numbers are given', function() {
      it('should return a Float32Array', function() {
        expect(Line.create(0, 3, 2, 6)).toEqual(new Float32Array([0, 3, 2, 6]));
        expect(Line.create(5, 6, -3, -2)).toEqual(
          new Float32Array([5, 6, -3, -2])
        );
      });
    });
    context('when two Vectors are given', function() {
      it('should return a Float32Array', function() {
        expect(Line.create(Vector.create(1, 2), Vector.create(3, 4))).toEqual(
          new Float32Array([1, 2, 3, 4])
        );
      });
    });
  });
  describe('#set', function() {
    context('when two numbers are given', function() {
      it('should set the line', function() {
        let line = Line.create(0, 0, 0, 0);
        Line.set(1, 2, 3, 4, line);
        expect(line).toEqual(new Float32Array([1, 2, 3, 4]));
      });
      it('should return the line', function() {
        let line = Line.create(0, 0, 0, 0);
        expect(Line.set(1, 2, 3, 4, line)).toBe(line);
      });
    });
    context('when two Vectors are given', function() {
      it('should set the line', function() {
        let line = Line.create(0, 0, 0, 0);
        Line.set(Vector.create(1, 2), Vector.create(3, 4), line);
        expect(line).toEqual(new Float32Array([1, 2, 3, 4]));
      });
      it('should return the line', function() {
        let line = Line.create(0, 0, 0, 0);
        expect(Line.set(Vector.create(1, 2), Vector.create(3, 4), line))
          .toBe(line);
      });
    });
  });
  describe('#copy', function() {
    it('should copy the line', function() {
      let line = Line.create(0, 0, 0, 0);
      Line.copy(Line.create(1, 2, 3, 4), line);
      expect(line).toEqual(new Float32Array([1, 2, 3, 4]));
    });
    it('should return the line', function() {
      let line = Line.create(0, 0, 0, 0);
      expect(Line.copy(Line.create(1, 2, 3, 4), line)).toBe(line);
    });
  });
  describe('#start', function() {
    it('should set the vector to the start', function() {
      let vector = Vector.create(0, 0);
      Line.start(Line.create(1, 2, 3, 4), vector);
      expect(vector).toEqual(new Float32Array([1, 2]));
    });
    it('should return the vector', function() {
      let vector = Vector.create(0, 0);
      expect(Line.start(Line.create(1, 2, 3, 4), vector)).toBe(vector);
    });
  });
  describe('#end', function() {
    it('should set the vector to the end', function() {
      let vector = Vector.create(0, 0);
      Line.end(Line.create(1, 2, 3, 4), vector);
      expect(vector).toEqual(new Float32Array([3, 4]));
    });
    it('should return the vector', function() {
      let vector = Vector.create(0, 0);
      expect(Line.end(Line.create(1, 2, 3, 4), vector)).toBe(vector);
    });
  });
  describe('#translate', function() {
    it('should translate the line', function() {
      let line = Line.create(0, 0, 0, 0);
      Line.translate(Line.create(1, 2, 3, 4), Vector.create(5, 3), line);
      expect(line).toEqual(new Float32Array([6, 5, 8, 7]));
    });
    it('should return the line', function() {
      let line = Line.create(0, 0, 0, 0);
      expect(Line.translate(Line.create(1, 2, 3, 4), Vector.create(5, 3), line))
        .toBe(line);
    });
  });
  describe('#lengthSquared', function() {
    it('should return the squared length of the line', function() {
      expect(Line.lengthSquared(Line.create(4.2, 4, 8.2, 7))).toBe(25);
      expect(Line.lengthSquared(Line.create(-9, -2, 5, 3))).toBe(221);
    });
  });
  describe('#length', function() {
    it('should return the length of the line', function() {
      expect(Line.length(Line.create(4.2, 4, 8.2, 7))).toBe(5);
      expect(Line.length(Line.create(-9, -2, 5, 3))).toBe(Math.sqrt(221));
    });
  });
  describe('#width', function() {
    it('should return the width of the line', function() {
      expect(Line.width(Line.create(2, 342, 14, 1231))).toBe(12);
      expect(Line.width(Line.create(2.5, 133.4, -8.5, 1252.4))).toBe(11);
    });
  });
  describe('#height', function() {
    it('should return the height of the line', function() {
      expect(Line.height(Line.create(342, 2, 1231, 14))).toBe(12);
      expect(Line.height(Line.create(133.4, 2.5, 1252.4, -8.5))).toBe(11);
    });
  });
  describe('#lerp', function() {
    it('should set the linear interpolation point of the line', function() {
      let vector = Vector.create(0, 0);
      expect(Line.lerp(Line.create(1, 2, 3, 4), 0.5, vector)).toEqual(
        new Float32Array([2, 3])
      );
      expect(Line.lerp(Line.create(-2, 1, 2, -1), 1/4, vector)).toEqual(
        new Float32Array([-1, 0.5])
      );
    });
    it('should return the vector', function() {
      let vector = Vector.create(0, 0);
      expect(Line.lerp(Line.create(1, 2, 3, 4), 0.5, vector)).toBe(vector);
    });
  });
  describe('#getX', function() {
    it('should return matching X of Y of the line', function() {
      expect(Line.getX(Line.create(1, 2, 3, 4), 4)).toBe(3);
      expect(Line.getX(Line.create(1, 2, 3, 4), 3)).toBe(2);
      expect(Line.getX(Line.create(1, 2, 3, 4), 0)).toBe(-1);
      expect(Line.getX(Line.create(-2, 1, 2, -1), -2)).toBe(4);
      expect(Line.getX(Line.create(-2, 1, 2, -1), 3/2)).toBe(-3);
      expect(Line.getX(Line.create(-2, 1, 2, -1), 0)).toBe(0);
    });
  });
  describe('#getY', function() {
    it('should return matching Y of X of the line', function() {
      expect(Line.getY(Line.create(1, 2, 3, 4), 3)).toBe(4);
      expect(Line.getY(Line.create(1, 2, 3, 4), 2)).toBe(3);
      expect(Line.getY(Line.create(1, 2, 3, 4), -1)).toBe(0);
      expect(Line.getY(Line.create(-2, 1, 2, -1), 4)).toBe(-2);
      expect(Line.getY(Line.create(-2, 1, 2, -1), -3)).toBe(3/2);
      expect(Line.getY(Line.create(-2, 1, 2, -1), 0)).toBe(0);
    });
  });
  describe('#slope', function() {
    it('should return the slope of the line', function() {
      expect(Line.slope(Line.create(1, 2, 3, 4))).toBe(1);
      expect(Line.slope(Line.create(-5, 3, 2, 1))).toBe(-2/7);
    });
  });
  describe('#interceptX', function() {
    it('should return the X intercept of the line', function() {
      expect(Line.interceptX(Line.create(1, 2, 3, 4))).toBe(-1);
      expect(Line.interceptX(Line.create(-5, 3, 2, 1))).toBe(5.5);
    });
  });
  describe('#interceptY', function() {
    it('should return the Y intercept of the line', function() {
      expect(Line.interceptY(Line.create(1, 2, 3, 4))).toBe(1);
      expect(Line.interceptY(Line.create(-5, 3, 2, 1))).toBe(11/7);
    });
  });
  describe('#intersect', function() {
    it('should return null if not intersects', function() {
      expect(Line.intersect(Line.create(0, 0, 3, 3), Line.create(-3, 3, -1, 1)))
        .toBe(false);
    });
    it('should return true if intersects', function() {
      expect(Line.intersect(Line.create(0, 0, 2, 2), Line.create(-2, 2, 0, 0)))
        .toBe(true);
    });
    it('should return the dest point if intersects', function() {
      let vector = Vector.create(0, 0);
      expect(Line.intersect(Line.create(0, 0, 2, 2), Line.create(-2, 2, 0, 0),
        vector
      )).toBe(vector);
    });
    it('should set the dest point if intersects', function() {
      let vector = Vector.create(0, 0);
      Line.intersect(Line.create(0, 0, 2, 2), Line.create(0, 2, 2, 0),
        vector
      );
      expect(vector).toEqual(new Float32Array([1, 1]));
    });
  });
});
