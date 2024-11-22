import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Use only the Admin SDK service account
const serviceAccount = {
  type: "service_account",
  project_id: "kuikbook-001",
  private_key_id: "cb28625fb89cfcd43bc8556b907477e34841a6ad",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyfOQTl8eA1DkD\nfrUgo1WfOlvr4nVoPvVyCoGDguhr5W8X7u+brqP1Iibx+ZWDqjlqbhkCp5CQP789\nuOVdI19teMwLQ3F7AOyv8ZuUMaTkQHUtdYk+thezPjMVemYKyLNQQd0IOK4t5oha\nYDZPV0GuU5TBIqaRD/sJSA6BQNKybc6GKd7DWioF+gxnhePVyzp4n6lCbiRbOCyb\nEyESR4b0MeFaARePPL7NrcEDkXJVTwRyGWD6VBJ+ZkZ9MEBcTUNYxWMw51IZHy5r\nEnIBHwvOMef69VGtooh4qy64eIksy57ebWgS6SMM98V51zH0Ki2bsp8WRvmkoEDA\nRYysuganAgMBAAECggEAUg7dBKz5CZ+H/rVYLIMrMCMyc4YPmDepvB5cYMvkcwZu\nRsCQ5DAsLNzgrsqiFIBEGUw4r2G+MrM8BvJkcKd8jeXFWUBOgdBxAIrBjiYsustv\nk9C/olcxGjT0Y2F8XGTdG37MUaVNXsjn0zT8gwmIps7CSvDVR0fjj+bS1FWrCGBx\n0ERFQDmFZASBmRQxaSP6vaYkPwVe5GF0dBBGFh5COr32lkGPQBxD4+6Ox57UV49Y\nVHJ9Cn1rY3lHf3vQsEcMZCfnDcFkqjVDlRUDJrKI1tDmAggAfYpyEy4FCg09lMqR\nTh/bEiLAx6zaNoEfXnmB+MqYRQ0wrIk0XSgqSPoecQKBgQDsaAaE39rpditGSUw9\n9ylaZ9gPCaFDLppV8KhYSSwfwmlfHnHnI5pKQYBxzx+Uqiod6QD+UH5f7Rd9EFDP\nD/bOBh7go0AIRBvU8M1YUXnGM0auB965hv5Iem6+h4Yrt3nUYjrkI5pyb7uNo6FL\nX7V2RGA4nR7PpXNSP0C+QN6XkwKBgQDBR/lmQWCD26pccSLOHWSMZSAnbJB4WK0x\nclEj+9y/MV+vNhpzgwEOMmYlIOxRZ53S6QxGEqTTnIjTpgsP7WZgBTXwF+NSOuMM\nLGLEp8wn6CeHErH5Y5IWcsYDD7S8BjNoFvFnqJEf90R170xDvTb6CUSgfZALdm8C\niSMPBOSZHQKBgDS0gHeRPMn92WoDH2dVOjf4nNfFatmCg1ATpkSAk8DE5B8bt4Mz\nkctqTQuShNTtFxSyBNGt+m7CehEc2RdA1OJbxPiKDNWK8bWItg8xoveIKQLVqFcu\nfHSGLzh1GHmYnyW1fLGuKlnHBUZvq58VSGyEk/srNFpQ5aP5jCKebcHXAoGAAqqD\nfi2YrzjweKX23PD62hTrBKAyvfY7LVtuUxi+SsTblQciBkXgVdnMHub9W4IaYzZj\nvPO04lZebMz1ihq0Ns7bl5w8vn2hdCGImz3VSxegs/RGEDKXaUfcA17MF2veeakX\nW16v4cj/YMEURDrv7zMBh1U0D3Rqw5YwrZxbquECgYEAxPTyNj29cSSsRZfGBq+a\ngdiTwlqTRPp4qHGTgMojNpNBWx60u/geuUA3YSSC16M+5Zq32M9u2xxeB9aSxnPI\nyqO4Lj87+LAjoa4G1sHcHbhvUOgWNc+YHI3ntC7Pb3KRyXFp2cn3i6WBq3JBdnwB\nBQ5izHdAYQqwKrXTeXDUrU0=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-kreuj@kuikbook-001.iam.gserviceaccount.com",
  client_id: "104415913243174555804",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-kreuj%40kuikbook-001.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

// Initialize Firebase Admin with single service account
const app = initializeApp({
  credential: cert(serviceAccount)
});

export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);

// Admin utility functions
export const verifyToken = async (idToken) => {
  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw error;
  }
};

export const createCustomToken = async (uid, claims = {}) => {
  try {
    const token = await adminAuth.createCustomToken(uid, claims);
    return token;
  } catch (error) {
    console.error('Error creating custom token:', error);
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const userRecord = await adminAuth.getUserByEmail(email);
    return userRecord;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
};

export const setCustomUserClaims = async (uid, claims) => {
  try {
    await adminAuth.setCustomUserClaims(uid, claims);
  } catch (error) {
    console.error('Error setting custom claims:', error);
    throw error;
  }
};