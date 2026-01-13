/*
 * Created on Thu Jan 08 2026 23:09:57
 * File name : auth.response.builder.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Thu Jan 08 2026 23:09:57
 * 2026 Ankur Gangwar
 */

interface AuthUserPayload {
  id: string | number;
  email?: string;
  username?: string;
  role?: string[];     // keeping original behavior
  loginAt?: string | Date;
}

interface BuiltAuthUser {
  id: string | number;
  email?: string;
  username?: string;
  roles: string[];
  loginAt?: string | Date;
}

interface AuthResponseMeta {
  [key: string]: unknown;
}

interface AuthResponse {
  token       : string;
  refreshToken: string | null;
  user        : BuiltAuthUser;
  meta        : AuthResponseMeta;
}


/**
 * 
 */
class AuthResponseBuilder extends Error {
  private _token: string | null;
  private _refreshToken: string | null;
  private _user: BuiltAuthUser | null;
  private _meta: AuthResponseMeta;


  constructor() {
    super();
    this._token = null;
    this._refreshToken = null;
    this._user = null;
    this._meta = {};
  }

  withToken(token : string) :this {
    this._token = token;
    return this;
  }

  withRefreshToken(token: string):this {
    this._refreshToken = token;
    return this;
  }


  withUser(user:AuthUserPayload):this { 
    if (!user?.id ) {
      throw new Error("AuthResponseBuilder: invalid user payload");
    }
    this._user = {
      id      : user.id,
      email   : user.email,
      username: user.username,
      roles   : user.role || [],
      loginAt : user.loginAt,
    };
    return this;
  }

  withMeta(meta: AuthResponseMeta = {}):this {
    this._meta = meta;
    return this;
  }

  build(): Readonly<AuthResponse> {
    if (!this._token) {
      throw new Error("AuthResponseBuilder: token is required");
    }

    if (!this._user) {
      throw new Error("AuthResponseBuilder: user is required");
    }

    return Object.freeze({
      token       : this._token,
      refreshToken: this._refreshToken,
      user        : this._user,
      meta        : this._meta,
    });
  }
}

export default AuthResponseBuilder;