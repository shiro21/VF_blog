import { collection } from "firebase/firestore";
import { db } from '@/js/db'

const largeCategory = collection(db, "lCategory")
const smallCategory = collection(db, "sCategory")

export { largeCategory, smallCategory }