// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import FeatureCard from "./FeatureCard";
afterEach(() => {
    cleanup();
})

describe("FeatureCard", () => {
    it("displays a title, description and an icon", () => {
        render(
            <FeatureCard title="Player Search" description="Find players using statistics" icon={<span aria-label="yes">Search</span>} />
        )
        expect(screen.getByRole("heading", { name: "Player Search" })).toBeTruthy();
        expect(screen.getByText("Find players using statistics")).toBeTruthy();
        expect(screen.getByLabelText("yes")).toBeTruthy();

    })
})