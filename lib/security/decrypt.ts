import CryptoJS from 'crypto-js';

export const decrypt = (encryptedMessage: string) => {
  const secretKey: any = process.env.NEXT_PUBLIC_SECRET_KEY;

  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
    const decryptedData = JSON.parse(decryptedString);

    return decryptedData;
  } catch {
    return {
      message: 'Error decrypting data, please report the issue on GitHub',
      success: false,
    };
  }
};
