import { create } from "zustand";

export const useAuthStore = create((set) => ({
    authUser: {name: "Mouli", _id: 12345, age: 22},
    isLoggedIn: false,

    login: () => {
        console.log("Login");
        set({ isLoggedIn: true });
    }
}));