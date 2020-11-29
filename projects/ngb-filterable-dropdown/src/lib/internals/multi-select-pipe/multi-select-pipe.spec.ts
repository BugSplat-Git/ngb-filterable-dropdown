import { MultiSelectPipe } from "./multi-select-pipe";

describe("MultiSelectPipe", () => {
    describe("transform", () => {
        const placeholder = "No Items Selected";

        it("should return placeholder text if input value is empty string", () => {
            const result = new MultiSelectPipe().transform("", placeholder);

            expect(result).toEqual(placeholder);
        });

        it("should return input value if input value is a non-empty string", () => {
            const input = "Charizard";

            const result = new MultiSelectPipe().transform(input, placeholder);

            expect(result).toEqual(input);
        });

        it("should return placeholder text if input value is empty array", () => {
            const result = new MultiSelectPipe().transform([], placeholder);

            expect(result).toEqual(placeholder);
        });

        it("should return first value in array if array length is 1", () => {
            const item = "Blastoise";

            const result = new MultiSelectPipe().transform([item], placeholder);

            expect(result).toEqual(item);
        });

        it("should return string \"Multiple\" if array length is greater than 1", () => {
            const result = new MultiSelectPipe().transform(["Mew", "Mewtoo"], placeholder);

            expect(result).toEqual(MultiSelectPipe.MULTIPLE_ITEMS_STRING);
        });

        it("should return placeholder if input value is null or undefined", () => {
            const result = new MultiSelectPipe().transform(undefined, placeholder);

            expect(result).toEqual(placeholder);
        });
    });
});
