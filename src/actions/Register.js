import { API_ROOT, createDispatcherForPost } from './index'; 

export const REG_SUBMITTED = 'REG_SUBMITTED';
export const REG_SUCCESS = 'REG_SUCCESS';
export const REG_INVALID = 'REG_INVALID';

export const REG_FAILURE = 'REG_FAILURE';

export function registerUser({ name, email, password }){
    return createDispatcherForPost(
        `${API_ROOT}/users`,
        { name, email, password },
        {
            actionLabel: REG_SUBMITTED,
            successLabel: REG_SUCCESS,
            invalidLabel: REG_INVALID,
            failureLabel: REG_FAILURE,
        }
    );
}
