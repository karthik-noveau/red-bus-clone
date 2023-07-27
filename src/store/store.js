import { create } from "zustand";

const loadFromSessionStorage = (key) => {
  try {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : undefined;
  } catch (error) {
    console.error(`Error loading "${key}" from session storage:`, error);
    return undefined;
  }
};

const saveToSessionStorage = (key, value) => {
  try {
    const data = JSON.stringify(value);
    sessionStorage.setItem(key, data);
  } catch (error) {
    console.error(`Error saving "${key}" to session storage:`, error);
  }
};

export const userStore = create((set) => ({
  phno: loadFromSessionStorage("phno") || "",
  selectedTravelDetails: loadFromSessionStorage("selectedTravelDetails") || {},
  seatId: loadFromSessionStorage("seatId") || {},
  checkBoxFilter: [],
  addPhno: (value) => {
    set((state) => {
      saveToSessionStorage("phno", value);
      return { phno: value };
    });
  },
  addSelectedTravelDetails: (value) => {
    set((state) => {
      saveToSessionStorage("selectedTravelDetails", value);
      return { selectedTravelDetails: value };
    });
  },
  addSeatId: (value) => {
    console.log("seatId in store ", value);
    set((state) => {
      const updatedSeatId = { ...state.seatId, ...value };
      saveToSessionStorage("seatId", updatedSeatId);
      return { seatId: updatedSeatId };
    });
  },
  addCheckBoxFilter: (value) => {
    set((state) => {
      console.log(" checkBoxFilter from checkbox ", value);
      console.log(" checkBoxFilter in store ", state.checkBoxFilter);
      return { checkBoxFilter: value };
    });
  },
}));