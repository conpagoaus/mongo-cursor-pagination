import { encode, decode } from "../src/utils/bsonUrlEncoding";
import { ObjectId, Binary, Int32, Long, Decimal128 } from "mongodb";
import { EJSON } from "bson";

const testObject = {
  first_name: "Tim",
  last_name: "O’Leary",
  _id: new ObjectId("66b957b183c12a144ec4ad7f"),
};

describe("bsonUrlEncoding", () => {
  test("should encode and decode a simple object correctly", () => {
    const encoded = encode(testObject);
    const decoded = decode(encoded);
    expect(decoded).toEqual(testObject);
  });

  test("should handle undefined values in arrays", () => {
    const objWithUndefinedArray = { ...testObject, arr: [undefined] };
    const encoded = encode(objWithUndefinedArray);
    const decoded = decode(encoded);
    expect(decoded).toEqual({ ...testObject, arr: [null] });
  });

  test("should handle string input correctly", () => {
    const testString = { t: "Hello, World!" };
    const encoded = encode(testString);
    const decoded = decode(encoded);
    expect(decoded).toEqual(testString);
  });

  test("should handle empty object correctly", () => {
    const emptyObject = {};
    const encoded = encode(emptyObject);
    const decoded = decode(encoded);
    expect(decoded).toEqual(emptyObject);
  });

  test("should handle empty string correctly", () => {
    const emptyString = "";
    const encoded = encode(emptyString);
    const decoded = decode(encoded);
    expect(decoded).toBe(emptyString);
  });

  test("should be able to JSON.stringify and JSON.parse the encoded string", () => {
    const encoded = encode(testObject);
    const decoded = EJSON.parse(EJSON.stringify(decode(encoded)));
    expect(decoded).toEqual(testObject);
  });

  test("should handle EJSON Date correctly", () => {
    const dateObject = { date: new Date() };
    const encoded = encode(dateObject);
    const decoded = decode(encoded);
    expect(decoded).toEqual(dateObject);
  });

  test("should handle EJSON Binary correctly", () => {
    const binaryObject = { binary: new Binary(Buffer.from("test")) };
    const encoded = encode(binaryObject);
    const decoded = decode(encoded);
    expect(decoded).toEqual(binaryObject);
  });

  test("should handle EJSON Decimal128 correctly", () => {
    const decimal128Object = { decimal128: Decimal128.fromString("123.456") };
    const encoded = encode(decimal128Object);
    const decoded = decode(encoded);
    expect(decoded).toEqual(decimal128Object);
  });
});
