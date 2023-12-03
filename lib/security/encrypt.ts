import CryptoJS from 'crypto-js';

export const encrypt = (message: string | FormDataEntryValue | null) => {
  const secretKey: any = process.env.SECRET_KEY;

  const data = { message: message };
  const dataString = JSON.stringify(data);

  const encrypted = CryptoJS.AES.encrypt(dataString, secretKey);

  const encryptedString = encrypted.toString();

  return encryptedString;
};
