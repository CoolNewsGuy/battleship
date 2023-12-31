import { AI } from "../scripts/AI";

describe("AI Class", () => {
    it("has its 'name' prop === 'AI' by default", () => {
        const ai = new AI();

        expect(ai.name).toBe("AI");
    });
});
