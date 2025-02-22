export enum AUTH_API_ROUTES {
  REFRESH_TOKENS = 'api/auth/refreshTokens',
  SIGN_UP = 'api/auth/signUp',
  SIGN_IN = 'api/auth/signIn',
  SIGN_OUT = 'api/auth/signOut',
}

export enum ROUTE_API_ROUTES {
  GET_ALL = 'api/routes',
}

export enum POINTS_API_ROUTES {
  GET_ALL_AND_ADD_POINTS = '/routes/:id/points',
  UPDATE_DELETE_POINT = '/points/:id',
}