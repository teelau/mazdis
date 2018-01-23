import firebase from 'firebase';  
import { FIREBASE_CONFIG } from './config';

export const API_ROOT = 'http://some_host:8080/api';

export var firebase_app = firebase.initializeApp(FIREBASE_CONFIG);
export var firebase_db = firebase.database();

export default firebase_app;
