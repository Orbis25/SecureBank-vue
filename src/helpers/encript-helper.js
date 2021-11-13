import tweetnacl, { randomBytes } from "tweetnacl";
import {
  decodeBase64,
  decodeUTF8,
  encodeBase64,
  encodeUTF8,
} from "tweetnacl-util";

const newNonce = () => randomBytes(tweetnacl.secretbox.nonceLength);

// encrypt with secretKey
export const encrypt = (message) => {
  if (!message) throw new Error("Message is required");

  const key = decodeBase64(process.env.VUE_APP_PRIVATE_KEY);
  const nonce = newNonce();
  const messageBuffer = decodeUTF8(message);

  const box = tweetnacl.secretbox(messageBuffer, nonce, key);

  const fullMessage = new Uint8Array(nonce.length + box.length);
  fullMessage.set(nonce);
  fullMessage.set(box, nonce.length);

  return encodeBase64(fullMessage);
};

//decript with secretKey
export const decrypt = (messageWithNonce) => {
  const keyUint8Array = decodeBase64(process.env.VUE_APP_PRIVATE_KEY);
  const messageWithNonceAsUint8Array = decodeBase64(messageWithNonce);

  const nonce = messageWithNonceAsUint8Array.slice(
    0,
    tweetnacl.secretbox.nonceLength
  );

  const message = messageWithNonceAsUint8Array.slice(
    tweetnacl.secretbox.nonceLength,
    messageWithNonce.length
  );

  const decrypted = tweetnacl.secretbox.open(message, nonce, keyUint8Array);

  if (!decrypted) {
    throw new Error("Could not decrypt message");
  }

  return encodeUTF8(decrypted);
};
