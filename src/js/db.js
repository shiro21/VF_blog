import { getFirestore } from "firebase/firestore";
import { app } from '@/js/firebase'

const db = getFirestore(app);

console.log(db)

export { db }