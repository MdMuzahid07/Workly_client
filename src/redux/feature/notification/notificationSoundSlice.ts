import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NotificationSoundState {
  enabled: boolean;
  volume: number; // 0.0 to 1.0
}

const initialState: NotificationSoundState = {
  enabled: true,
  volume: 0.5,
};

const notificationSoundSlice = createSlice({
  name: 'notificationSound',
  initialState,
  reducers: {
    toggleSound(state) {
      state.enabled = !state.enabled;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = Math.max(0, Math.min(1, action.payload));
    },
  },
});

export const { toggleSound, setVolume } = notificationSoundSlice.actions;
export default notificationSoundSlice.reducer;
