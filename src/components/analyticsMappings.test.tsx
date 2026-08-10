// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import PlayerGoalkeepingStats from "./PlayerGoalkeepingStats";
import { getGoalkeeperRadarConfig, getOffensiveRadarConfig } from "../utils/radarConfig";

afterEach(cleanup);

describe("analytics field mappings", () => {
    it("keeps offensive percentile labels aligned with their source fields", () => {
        const config = getOffensiveRadarConfig({
            us_npg_per90_percentile_position: 11,
            us_npxG_per90_percentile_position: 22,
            us_npxG_per_shot_percentile_position: 33,
            us_assists_per90_percentile_position: 44,
            us_xA_per90_percentile_position: 55,
            us_key_passes_per90_percentile_position: 66,
            us_xGBuildup_per90_percentile_position: 77,
        }, true);

        expect(config.metrics).toEqual(["NPG/90", "npxG/90", "npxG/shot", "Assists/90", "xA/90", "Key passes/90", "xG buildup/90"]);
        expect(config.data).toEqual([11, 22, 33, 44, 55, 66, 77]);
    });

    it("removes the shot-quality label and value together when it is ineligible", () => {
        const config = getOffensiveRadarConfig({
            us_npg_per90_percentile_position: 11,
            us_npxG_per90_percentile_position: 22,
            us_npxG_per_shot_percentile_position: null,
            us_assists_per90_percentile_position: 44,
            us_xA_per90_percentile_position: 55,
            us_key_passes_per90_percentile_position: 66,
            us_xGBuildup_per90_percentile_position: 77,
        }, false);

        expect(config.metrics).toEqual(["NPG/90", "npxG/90", "Assists/90", "xA/90", "Key passes/90", "xG buildup/90"]);
        expect(config.data).toEqual([11, 22, 44, 55, 66, 77]);
    });

    it("keeps goalkeeper radar labels aligned with their source fields", () => {
        const config = getGoalkeeperRadarConfig({
            "Save%": 61,
            "/90": 0.12,
            "Cmp%_stats_keeper_adv": 43,
            "Launch%": 54,
            "Stp%": 15,
            "#OPA/90": 1.4,
        });

        expect(config.metrics.map((metric) => metric.name)).toEqual(["Save %", "PSxG +/-/90", "Long pass cmp. %", "Launch %", "Cross stop %", "OPA/90"]);
        expect(config.data).toEqual([61, 0.12, 43, 54, 15, 1.4]);
    });

    it("displays goalkeeper pass completion percentage", () => {
        const player = {
            Pos: "GK",
            GA90: 1.1,
            "Save%": 72,
            CS: 8,
            Err: 1,
            "Cmp%": 76.6,
            AvgLen: 37.2,
        } satisfies Parameters<typeof PlayerGoalkeepingStats>[0];

        render(<PlayerGoalkeepingStats {...player} />);

        expect(screen.getByText("76.6%")).toBeTruthy();
    });
});
