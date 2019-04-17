import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMember, defaultValue } from 'app/shared/model/member.model';

export const ACTION_TYPES = {
  FETCH_MEMBER_LIST: 'member/FETCH_MEMBER_LIST',
  FETCH_MEMBER: 'member/FETCH_MEMBER',
  CREATE_MEMBER: 'member/CREATE_MEMBER',
  UPDATE_MEMBER: 'member/UPDATE_MEMBER',
  DELETE_MEMBER: 'member/DELETE_MEMBER',
  RESET: 'member/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMember>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type MemberState = Readonly<typeof initialState>;

// Reducer

export default (state: MemberState = initialState, action): MemberState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MEMBER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MEMBER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MEMBER):
    case REQUEST(ACTION_TYPES.UPDATE_MEMBER):
    case REQUEST(ACTION_TYPES.DELETE_MEMBER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MEMBER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MEMBER):
    case FAILURE(ACTION_TYPES.CREATE_MEMBER):
    case FAILURE(ACTION_TYPES.UPDATE_MEMBER):
    case FAILURE(ACTION_TYPES.DELETE_MEMBER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEMBER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEMBER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MEMBER):
    case SUCCESS(ACTION_TYPES.UPDATE_MEMBER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MEMBER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/members';

// Actions

export const getEntities: ICrudGetAllAction<IMember> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MEMBER_LIST,
  payload: axios.get<IMember>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IMember> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MEMBER,
    payload: axios.get<IMember>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMember> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MEMBER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMember> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MEMBER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMember> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MEMBER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
