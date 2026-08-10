import type { playerComplete } from "../types/playerComplete";

type OffensiveRadarPlayer = Pick<playerComplete,
    | "us_npg_per90_percentile_position"
    | "us_npxG_per90_percentile_position"
    | "us_npxG_per_shot_percentile_position"
    | "us_assists_per90_percentile_position"
    | "us_xA_per90_percentile_position"
    | "us_key_passes_per90_percentile_position"
    | "us_xGBuildup_per90_percentile_position"
>;

type GoalkeeperRadarPlayer = Pick<playerComplete,
    | "Save%"
    | "/90"
    | "Cmp%_stats_keeper_adv"
    | "Launch%"
    | "Stp%"
    | "#OPA/90"
>;

const offensiveRadarFields = [
    { metric: "NPG/90", field: "us_npg_per90_percentile_position" },
    { metric: "npxG/90", field: "us_npxG_per90_percentile_position" },
    { metric: "npxG/shot", field: "us_npxG_per_shot_percentile_position", requiresShotData: true },
    { metric: "Assists/90", field: "us_assists_per90_percentile_position" },
    { metric: "xA/90", field: "us_xA_per90_percentile_position" },
    { metric: "Key passes/90", field: "us_key_passes_per90_percentile_position" },
    { metric: "xG buildup/90", field: "us_xGBuildup_per90_percentile_position" },
] as const;

const goalkeeperRadarFields = [
    { metric: { name: "Save %", min: 50, max: 90 }, field: "Save%" },
    { metric: { name: "PSxG +/-/90", min: -0.5, max: 0.5 }, field: "/90" },
    { metric: { name: "Long pass cmp. %", min: 0, max: 70 }, field: "Cmp%_stats_keeper_adv" },
    { metric: { name: "Launch %", min: 0, max: 100 }, field: "Launch%" },
    { metric: { name: "Cross stop %", min: 0, max: 30 }, field: "Stp%" },
    { metric: { name: "OPA/90", min: 0, max: 4 }, field: "#OPA/90" },
] as const;

export function getOffensiveRadarConfig(player: OffensiveRadarPlayer, includeNpxGPerShot: boolean) {
    const fields = includeNpxGPerShot
        ? offensiveRadarFields
        : offensiveRadarFields.filter((field) => !("requiresShotData" in field));

    return {
        data: fields.map((field) => Number(player[field.field])),
        metrics: fields.map((field) => field.metric),
    };
}

export function getGoalkeeperRadarConfig(player: GoalkeeperRadarPlayer) {
    return {
        data: goalkeeperRadarFields.map((field) => Number(player[field.field])),
        metrics: goalkeeperRadarFields.map((field) => ({ ...field.metric })),
    };
}
