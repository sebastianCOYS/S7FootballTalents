// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import AdvancedPlayerSearchForm, { type AdvancedPlayerFilters } from "./AdvancedPlayerSearchForm";

const filters: AdvancedPlayerFilters = {
    player: "",
    league: "",
    gls: 0,
    ast: 0,
    offset: 0,
    position: "ANY",
    mp: 0,
    age: 0,
    prgc: 0,
    prgp: 0,
    xG: 0,
    xA: 0,
};

afterEach(cleanup);

describe("AdvancedPlayerSearchForm", () => {
    it("offers the supported competitions and applies the selected value", () => {
        const onFiltersChange = vi.fn();

        render(<AdvancedPlayerSearchForm filters={filters} onFiltersChange={onFiltersChange} onSubmit={vi.fn()} />);
        fireEvent.mouseDown(screen.getByRole("combobox", { name: "Competition" }));

        const options = screen.getAllByRole("option");
        expect(options.map((option) => option.textContent)).toEqual([
            "Any competition",
            "La Liga",
            "Serie A",
            "Premier League",
            "Ligue 1",
            "Bundesliga",
        ]);

        fireEvent.click(screen.getByRole("option", { name: "Premier League" }));
        expect(onFiltersChange).toHaveBeenCalledWith({ ...filters, league: "eng Premier League" });
    });
});
