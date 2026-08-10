// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, useLocation } from "react-router";
import Header from "./Header";
import AdvancedPlayerList from "./AdvancedPlayerList";
import ComparePlayerLists from "./PlayerListComparePlayers";

const mockedUsePlayers = vi.hoisted(() => vi.fn());

vi.mock("../hooks/usePlayers", () => ({
  default: mockedUsePlayers,
}));

function CurrentPath() {
  return <span data-testid="current-path">{useLocation().pathname}</span>;
}

beforeEach(() => {
  mockedUsePlayers.mockReturnValue({
    players: [],
    error: "Database unavailable",
    isLoading: false,
    hasPreviousPage: false,
    hasNextPage: false,
  });
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("frontend reliability states", () => {
  it("opens the mobile navigation without navigating home", () => {
    render(
      <MemoryRouter initialEntries={["/name_search"]}>
        <Header navItems={[{ page: "Advanced Search", link: "/advanced_search" }]} />
        <CurrentPath />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));

    expect(screen.getByTestId("current-path").textContent).toBe("/name_search");
    expect(screen.getByRole("menuitem", { name: "Advanced Search" })).toBeTruthy();
  });

  it.each([
    ["advanced player list", <AdvancedPlayerList />],
  ])("shows an API error instead of an empty result for the %s", (_name, component) => {
    render(<MemoryRouter>{component}</MemoryRouter>);

    expect(screen.getByRole("alert").textContent).toContain("Database unavailable");
    expect(screen.queryByText("No players found")).toBeNull();
  });

  it("identifies errors for both comparison result lists", () => {
    render(<MemoryRouter><ComparePlayerLists /></MemoryRouter>);

    expect(screen.getByText("Could not load Player X results: Database unavailable")).toBeTruthy();
    expect(screen.getByText("Could not load Player Y results: Database unavailable")).toBeTruthy();
    expect(screen.queryByText("No players found")).toBeNull();
  });
});
