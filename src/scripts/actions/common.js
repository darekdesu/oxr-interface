import { createAction } from 'redux-actions';

import * as actionTypes from '../consts/actionTypes';

export const logout = createAction(actionTypes.LOGOUT);
