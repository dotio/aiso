import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@web/store';
import { IAssistant } from '@web/types';

export const assistantsSelectById = createSelector(
  [
    (state: RootState, assistantId: string) => state.assistants.assistants,
    (state: RootState, assistantId: string) => assistantId
  ],
  (assistants, assistantId): IAssistant | undefined => {
    return assistants.entities[assistantId];
  }
);
