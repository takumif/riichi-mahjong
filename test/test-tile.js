/// <reference path="../typings/index.d.ts" />
/// <reference path="../dist/index.d.ts" />
var T = require("../dist/tile");
var Tile = T.Tile, Suit = T.Suit, TileType = T.TileType, Wind = T.Wind, Dragon = T.Dragon;
var M = require("../dist/meld");
var Meld = M.Meld, Pair = M.Pair, Triple = M.Triple, Straight = M.Straight, Quadruple = M.Quadruple;
var P = require("../dist/parser");
var Parser = P.Parser;
var H = require("../dist/hand");
var Hand = H.Hand;
var U = require("./util");

var w1 = new Tile(Suit.Character, 1);
var w1_2 = new Tile(Suit.Character, 1);
var w2 = new Tile(Suit.Character, 2);
var w2_2 = new Tile(Suit.Character, 2);
var w3 = new Tile(Suit.Character, 3);
var w3_2 = new Tile(Suit.Character, 3);
var w9 = new Tile(Suit.Character, 9);
var w9_2 = new Tile(Suit.Character, 9);
var w9_3 = new Tile(Suit.Character, 9);
var p6 = new Tile(Suit.Circle, 6);
var p6_2 = new Tile(Suit.Circle, 6);
var p6_3 = new Tile(Suit.Circle, 6);
var s3 = new Tile(Suit.Bamboo, 3);
var s3_2 = new Tile(Suit.Bamboo, 3);
var s3_3 = new Tile(Suit.Bamboo, 3);
var east = new Tile(Suit.Wind, Wind.East);
var east2 = new Tile(Suit.Wind, Wind.East);
var south = new Tile(Suit.Wind, Wind.South);
var north = new Tile(Suit.Wind, Wind.North);
var bai = new Tile(Suit.Dragon, Dragon.White);
var bai2 = new Tile(Suit.Dragon, Dragon.White);

var sevenPairTiles = [U.w1, U.w1, U.w2, U.w2, U.w9, U.w9, U.p6, U.p6, U.s3, U.s3, U.e, U.e, U.white, U.white];
var ibeikou = [U.w1, U.w1, U.w2, U.w2, U.w3, U.w3, U.w9, U.w9, U.w9, U.s3, U.s3, U.s3, U.e, U.e];

describe("A tile object", () => {
    it("can get its next number right, if possible (nextNumber)", () => {
        expect(w1.nextNumber()).toEqual(w2);
        expect(w9.nextNumber()).toBeNull();
        expect(east.nextNumber()).toBeNull();
    });
    
    it("can get its next number with wrap-around (nextWithWrapAround)", () => {
        expect(w1.nextWithWrapAround()).toEqual(w2);
        expect(w9.nextWithWrapAround()).toEqual(w1);
        expect(east.nextWithWrapAround()).toEqual(south);
        expect(north.nextWithWrapAround()).toEqual(east);
    })
    
    it("equals another tile iff they have the same properties (equals)", () => {
        var tile = new Tile(Suit.Bamboo, 1);
        var same = new Tile(Suit.Bamboo, 1);
        var different1 = new Tile(Suit.Bamboo, 2);
        var different2 = new Tile(Suit.Wind, Wind.East);
        expect(tile.equals(same)).toBe(true);
        expect(tile.equals(different1)).toBe(false);
        expect(tile.equals(different1)).toBe(false);
    });
});

describe("The Tile class", () => {
    
    it("throws an error when the constructor gets invalid stuff", () => {
        expect(() => { new Tile(Suit.Bamboo, 42) }).toThrow();
        expect(() => { new Tile(Suit.Character, 0) }).toThrow();
        expect(() => { new Tile(Suit.Dragon, -1) }).toThrow();
        expect(() => { new Tile(Suit.Wind, 5) }).toThrow();
        expect(() => { new Tile(Suit.Bamboo, 7) }).not.toThrow();
    });
    
    it("orders the tiles in the order of chars, circles, bamboos, winds, then dragons", () => {
        
        expect(Tile.compare(w1, w9)).toEqual(-1);
        expect(Tile.compare(s3, w9)).toEqual(1);
        expect(Tile.compare(s3, w1)).toEqual(1);
        expect(Tile.compare(east, w9)).toEqual(1);
        expect(Tile.compare(east, bai)).toEqual(-1);
        expect(Tile.compare(bai, bai2)).toEqual(0);
        expect([east, s3, bai, w9, w1].sort(Tile.compare))
            .toEqual([w1, w9, s3, east, bai]);
    });
    
    it("gets the indices of tiles in an array", () => {
        
    });
    
    it("can recognize seven pairs", () => {
        expect(Tile.formSevenPairs(
            sevenPairTiles
        )).not.toBeNull();
        expect(Tile.formSevenPairs(
            sevenPairTiles
        ).length).toEqual(7);
    });
    
    it("can recognize a straight (extractStraight)", () => {
        var result = Tile.extractStraight([w1, w2, w3], w1);
        expect(result).not.toBeNull();
        
        var result = Tile.extractStraight([w1, w2, w3, east, east2], w1);
        expect(result.otherTiles).toEqual([east, east2]);
    });
});
