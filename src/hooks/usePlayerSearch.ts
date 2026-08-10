import { useState, type FormEvent } from "react";
import usePlayers from "./usePlayers";
import type { PlayerSearchFilters } from "../utils/buildPlayersQuery";

export default function usePlayerSearch<TFilters extends PlayerSearchFilters>(initialFilters: TFilters) {
    const [draftFilters, setDraftFilters] = useState(initialFilters);
    const [appliedFilters, setAppliedFilters] = useState(initialFilters);
    const playerQuery = usePlayers(appliedFilters);

    function handleSubmit(event: FormEvent): void {
        event.preventDefault();
        setAppliedFilters({ ...draftFilters, offset: 0 });
    }

    function handleNextPage(): void {
        setAppliedFilters((currentFilters) => ({ ...currentFilters, offset: currentFilters.offset + 10 }));
    }

    function handlePreviousPage(): void {
        setAppliedFilters((currentFilters) => ({ ...currentFilters, offset: Math.max(0, currentFilters.offset - 10) }));
    }

    return { draftFilters, setDraftFilters, handleSubmit, handleNextPage, handlePreviousPage, ...playerQuery };
}
