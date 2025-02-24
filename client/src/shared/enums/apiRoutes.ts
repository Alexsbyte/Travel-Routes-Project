// export enum AUTH_API_ROUTES {
//   REFRESH_TOKENS = 'api/auth/refreshTokens',
//   SIGN_UP = 'api/auth/signUp',
//   SIGN_IN = 'api/auth/signIn',
//   SIGN_OUT = 'api/auth/signOut',
// }

export enum ROUTE_API_ROUTES {
  GET_ALL = 'api/routes',
}

export enum MODERATIONS_API_ROUTES {
  MODERATE = 'api/moderations',
}

export enum COMMENT_API_ROUTES {
  GET_ALL_USER_COMMENTS = 'api/user/comments',
  ADD_COMMENT = 'api/comments',
  DELETE_COMMENT = 'api/comments/:comment_id',
  GET_ONE_COMMENT = 'api/routes/:route_id',
}
