/*
 * Created on Sat Dec 27 2025 22:53:15
 * File name : jwt.builder.js
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Sat Dec 27 2025 22:53:15
 * 2025 Ankur Gangwar
 */

interface JwtConfig{
  secret   : string,
  expiresIn?: string | number,
  algorithm?: string,
  issuer?   : string | number,
  audience? : string,
  rotation? : boolean
}

interface JwtBuildResult {
  secret: string;
  options: {
    expiresIn: string | number;
    algorithm: string;
    issuer?: string | number;
    audience: string;
  };
}

class JwtConfigBuilder {
  private config: Partial<JwtConfig>;

  constructor() {
    this.config = {};
  }

  secret(secret : string): this {
    this.config.secret = secret;
    return this;
  }

  expiresIn(time : string | number): this {
    this.config.expiresIn = time;
    return this;
  }

  algorithm(algo : string): this {
    this.config.algorithm = algo;
    return this;
  }

  issuer(issuer: string):this {
    this.config.issuer = issuer;
    return this;
  }

  audience(audience: string): this {
    this.config.audience = audience;
    return this;
  }

  rotation(rotation: boolean): this {
    this.config.rotation = rotation || false;
    return this;
  }


  /**
   * 
   * @returns 
   */
  build() : JwtBuildResult {
    if (!this.config.secret) {
      throw new Error("JWT secret is required");
    }
    return {
      secret: this.config.secret,
      options: {
        expiresIn: this.config.expiresIn ?? "1h",
        algorithm: this.config.algorithm ?? "HS256",
        issuer   : this.config.issuer,
        audience : this.config.audience ?? 'web-user',
      },
    };
  }
}

export default JwtConfigBuilder;
