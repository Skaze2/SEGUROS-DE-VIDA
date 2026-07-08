import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Configuración pública del proyecto (la seguridad la imponen las reglas de Firestore).
// Analytics NO se inicializa a propósito: los ad-blockers lo bloquean y no aporta nada aquí.
const firebaseConfig = {
  apiKey: 'AIzaSyAowGrSvt24PZSOvzmMxssqYd_ARRX1MSI',
  authDomain: 'venta-de-seguros-953c9.firebaseapp.com',
  projectId: 'venta-de-seguros-953c9',
  storageBucket: 'venta-de-seguros-953c9.firebasestorage.app',
  messagingSenderId: '1089893870955',
  appId: '1:1089893870955:web:3e2a8837a4d353d79e702e',
  measurementId: 'G-MF30JTWEBM',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()
