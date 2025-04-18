import { addNumber } from "./mainthing";

describe("cope", () => {
  it("when given 2 numbers add them up", () => {
    const expected = 9;
    const actual = addNumber(5, 4);

    expect(expected).toEqual(actual);
  });
});
