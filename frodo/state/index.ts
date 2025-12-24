import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// PayloadAction, Redux Toolkit'te bir action'ın taşıdığı veri tipini (payload) belirtmek için kullanılır.

export interface initialStateTypes{
    isSidebarOpen: boolean;
    isDarkMode: boolean;
}

const initialState: initialStateTypes = {
    isSidebarOpen: false,
    isDarkMode: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarOpen: (state, action: PayloadAction<boolean>) => {
      // Sidebar'ın açık/kapalı olma durumunu günceller
      state.isSidebarOpen = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      // Karanlık modun aktif olup olmadığını günceller
      state.isDarkMode = action.payload;
    },
  },
});

export const { setIsSidebarOpen, setIsDarkMode } = globalSlice.actions;
export default globalSlice.reducer;
