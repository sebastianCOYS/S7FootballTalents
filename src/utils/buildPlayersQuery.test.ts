import { describe, expect, it } from "vitest";
import { buildPlayersQuery } from "./buildPlayersQuery";

describe("buildPlayersQuery", () => {
    it("always includes the offset", () => {
        const query = buildPlayersQuery({ offset: 10 });

        expect(query).toBe("offset=10");
    });

    it("accepts all filters", () => {
        const query = buildPlayersQuery({ offset: 2, age: 2, mp: 2, gls: 2, ast: 2, prgc: 2, prgp: 2, xA: 1.1, xG: 1.1, position: "DF", player: "max" })

        //this way the test doesn't rely on parameter order...
        const parameters = new URLSearchParams(query);
        expect(parameters.get("offset")).toBe("2");
        expect(parameters.get("age_gte")).toBe("2");
        expect(parameters.get("mp_gte")).toBe("2");
        expect(parameters.get("gls_gte")).toBe("2");
        expect(parameters.get("ast_gte")).toBe("2");
        expect(parameters.get("prgc_gte")).toBe("2");
        expect(parameters.get("prgp_gte")).toBe("2");
        expect(parameters.get("xa_gte")).toBe("1.1");
        expect(parameters.get("xg_gte")).toBe("1.1");
        expect(parameters.get("pos")).toBe("DF");
        expect(parameters.get("player")).toBe("max");
    });

    it("excludes position if position is 'ANY'", () => {
        const query = buildPlayersQuery({ offset: 2, position: "ANY" })
        const parameters = new URLSearchParams(query);
        expect(parameters.has("pos")).toBe(false);
    });

    it("preserves special characters in names", () => {
        const query = buildPlayersQuery({ offset: 0, player: "João Félix" });
        const parameters = new URLSearchParams(query);
        expect(parameters.get("player")).toBe("João Félix");
    });
    it("excludes an empty player search", () => {
        const query = buildPlayersQuery({ offset: 0, player: "" });
        const parameters = new URLSearchParams(query);
        expect(parameters.has("player")).toBe(false);
    });

});
