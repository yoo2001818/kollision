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
      it('should set the line');
      it('should return the line');
    });
    context('when two Vectors are given', function() {
      it('should set the line');
      it('should return the line');
    });
  });
  describe('#copy', function() {
    it('should copy the line');
    it('should return the line');
  });
  describe('#start', function() {
    it('should set the vector to the start');
    it('should return the vector');
  });
  describe('#end', function() {
    it('should set the vector to the end');
    it('should return the vector');
  });
  describe('#translate', function() {
    it('should translate the line');
    it('should return the line');
  });
  describe('#lengthSquared', function() {
    it('should return the squared length of the line');
  });
  describe('#length', function() {
    it('should return the length of the line');
  });
  describe('#width', function() {
    it('should return the width of the line');
  });
  describe('#height', function() {
    it('should return the height of the line');
  });
  describe('#slope', function() {
    it('should return the slope of the line');
  });
  describe('#interceptX', function() {
    it('should return the X intercept of the line');
  });
  describe('#interceptY', function() {
    it('should return the Y intercept of the line');
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
