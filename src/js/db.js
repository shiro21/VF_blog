// Firebase Store
import { getFirestore } from "firebase/firestore";
// Firebase Storage
import { getDownloadURL, getMetadata, getStorage, ref as fsRef, uploadString } from "firebase/storage";
import { app } from '@/js/firebase'

import { v4 as uuidv4 } from 'uuid'

const db = getFirestore(app);
const storage = getStorage(app);

const saveFile = async (fullPath, file) => {
  const storageRef = fsRef(storage, fullPath)
  const snapshot = await uploadString(storageRef, file, 'data_url')

  if (snapshot) {
    const downloadUrl = await getDownloadURL(snapshot.ref)
    const metadata = await getMetadata(storageRef)
    return { snapshot, downloadUrl, metadata }
  }
}

const uploadFile = async (file) => {
  return await new Promise(function (resolve, reject) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async () => {
      const result = reader.result

      const { snapshot, downloadUrl, metadata } = await saveFile(`images/${uuidv4()}`, result)
      
      if (snapshot) resolve({ snapshot, downloadUrl, metadata })
      else reject()
    }
  })
}

export { db, storage, saveFile, uploadFile }