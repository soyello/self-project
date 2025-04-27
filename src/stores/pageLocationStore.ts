import { PageLocation } from "@/types/typeCollection";
import { create } from "zustand";

interface PageLocationState {
  pageLocationState: PageLocation;
  setPageLocationState: (input: PageLocation) => void;
}

export const usePageLocationStore = create<PageLocationState>((set) => ({
  pageLocationState: "NO LOCATION",
  setPageLocationState: (input) => set({ pageLocationState: input }),
}));
