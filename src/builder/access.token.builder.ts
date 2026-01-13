/*
 * Created on Tue Dec 30 2025 23:06:26
 * File name : access.token.builder.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Tue Dec 30 2025 23:06:26
 * 2025 Ankur Gangwar
 */
 
import JwtTokenBuilder from "./jwt.token.builder.js";

interface JwtConfigBuilder {
  expiresIn(value: string | number): JwtConfigBuilder;
  issuer(value: string): JwtConfigBuilder;
  build(): {
    secret: string;
    options: Record<string, any>;
  };
}

interface users {
  id       : number,
  sessionId: string,
  role     : string |[],
  username : string
}
class AccessTokenBuilder {

  private jwtConfig: JwtConfigBuilder;

  constructor(config:JwtConfigBuilder) {
    this.jwtConfig = config;
  }

  /**
   *
   * @param {*} jwtConfig
   * @param {*} user
   * @returns
   */
  build(user: users) {
    const tokenConfig = this.jwtConfig
      .expiresIn(process.env.EXPIRE_IN_ACCESS as string)
      .issuer("login")
      .build();

    const tokenBuilder = new JwtTokenBuilder(
      tokenConfig.secret,
      tokenConfig.options
    )
      .subject(user.id)
      .sessionId(user.sessionId)
      .role(user.role)
      .claim("username", user.username)
      .tokenType("access");

    return tokenBuilder.build();
  }
}

export default AccessTokenBuilder;
