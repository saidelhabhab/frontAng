import { Injectable } from '@angular/core';

declare var grecaptcha: any;

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {

  constructor() { }

  executeRecaptcha(action: string) {
    return new Promise((resolve, reject) => {
      grecaptcha.execute('6LdghTgfAAAAAEg-BcDOnmLNNwICTxEerJM9EuA-', { action: action })
        .then((token: string) => {
          resolve(token);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
}

