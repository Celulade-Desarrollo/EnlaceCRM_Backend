import jwt from 'jsonwebtoken';

export class JwtAdapter {
    
    static async generateToken(
        payload: Object,
        duration: string = '2h'): Promise<string | null> {

        return new Promise((resolve) => {
            jwt.sign(payload,'SEED',{ expiresIn: duration as jwt.SignOptions['expiresIn'] },
                (err: Error | null, token: string | undefined) => {

                    if (err) return resolve(null);

                    resolve(token!);
                }
            );
        });
    }
}