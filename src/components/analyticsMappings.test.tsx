// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { playerComplete } from "../types/playerComplete";
import PlayerGoalkeepingStats from "./PlayerGoalkeepingStats";
import PlayerRadarChart from "./PlayerRadarChart";
import PlayersRadarChart from "./PlayersRadarChart";

vi.mock("@mui/x-charts", () => ({
    RadarChart: (props: Record<string, unknown>) => (
        <div data-testid="radar-props">{JSON.stringify(props)}</div>
    ),
}));

afterEach(cleanup);

const player = {
    Player: "Test Player",
    Pos: "GK",
    Gls: 1,
    "G-PK": 2,
    Ast: 3,
    xG: 4,
    npxG: 5,
    xAG: 6,
    "G+A": 7,
    Carries: 8,
    PrgP: 9,
    PrgC: 10,
    KP: 11,
    Fld: 98,
    Fld_stats_misc: 12,
    Crs: 13,
    GA: 1,
    GA90: 2,
    Saves: 3,
    "Save%": 4,
    CK: 99,
    CS: 5,
    PKsv: 6,
    Cmp: 474,
    "Cmp%": 76.6,
    "PSxG+/-": 0,
    Clr: 0,
    Err: 0,
    AvgLen: 0,
    Thr: 0,
    "Launch%": 0,
} as unknown as playerComplete;

function renderedRadarProps() {
    return JSON.parse(screen.getByTestId("radar-props").textContent ?? "{}");
}

describe("analytics field mappings", () => {
    it("keeps offensive radar labels aligned with their values", () => {
        render(<PlayerRadarChart player={player} chartType="offensive" />);

        const props = renderedRadarProps();
        expect(props.series[0].data).toHaveLength(props.radar.metrics.length);
        expect(props.series[0].data.slice(-3)).toEqual([11, 12, 13]);
        expect(props.radar.metrics.slice(-3)).toEqual(["key passes", "fouls Drawn", "crosses"]);
    });

    it("uses clean sheets instead of corner kicks in goalkeeper radars", () => {
        render(<PlayerRadarChart player={player} chartType="goalkeeping" />);
        expect(renderedRadarProps().series[0].data[4]).toBe(5);

        cleanup();
        render(<PlayersRadarChart players={[player]} chartType="goalkeeping" />);
        expect(renderedRadarProps().series[0].data[4]).toBe(5);
    });

    it("displays goalkeeper pass completion percentage", () => {
        render(<PlayerGoalkeepingStats {...player} />);

        expect(screen.getByText("76.6%")).toBeTruthy();
        expect(screen.queryByText("474%")).toBeNull();
    });
});
