import { Editor, Viewer} from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import '@toast-ui/editor/dist/i18n/ko-kr'

import { collection } from "firebase/firestore";
import { db } from '@/js/db'

const defaultImage = "/img/paca.f07159b0.png"

const userUpdate = collection(db, "users")

const useEditor = collection(db, "editors")

const editorTest = collection(db, "test")

const editorConfirm = collection(db, "edits")

export { Editor, Viewer, useEditor, editorTest, editorConfirm, userUpdate, defaultImage }