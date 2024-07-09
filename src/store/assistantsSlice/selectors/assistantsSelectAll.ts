import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@web/store';
import { STATUSES, IAssistant } from '@web/types';

export const assistantsSelectAllSelector = createSelector(
  [
    (state: RootState) => state.assistants.assistants
  ],
  (assistants): [boolean, IAssistant[]] => {
    const isLoading = assistants.status === STATUSES.PENDING;
    return [isLoading, Object.values(assistants.entities)];
  }
);
