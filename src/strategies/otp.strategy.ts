/*
 * Created on Mon Jan 12 2026 23:12:39
 * File name : otp.strategy.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Mon Jan 12 2026 23:12:39
 * 2026 Ankur Gangwar
 */


interface OtpPayload {
  mobile: number;
  otp: number;
}

class OtpStrategy {
    private userRepo: any;
    private otpRepo: any;
    private tokenFactory: any;

    constructor(userRepo: any, otpRepo: any, tokenFactory: any) {
        this.userRepo = userRepo;
        this.otpRepo = otpRepo;
        this.tokenFactory = tokenFactory;
    }

    async authenticate(payload: OtpPayload) {
        const { mobile, otp } = payload;
        const user = await this.userRepo.findByMobile(mobile);
        return this.tokenFactory.create(user);
    }
}

export default OtpStrategy;