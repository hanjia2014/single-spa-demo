import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectUsers = (state: RootState) => state.userState.users;

export const selectUserById = id => createSelector(
    selectUsers,
    users => (users || []).filter((u: any) => u.id === id)
)