import { createAction } from '@reduxjs/toolkit';
import { IProfile } from '@web/types';

export const ASSISTANTS_START_ACTION = 'assistants/start';

export const assistantsStartAction = createAction<IProfile>(ASSISTANTS_START_ACTION);
