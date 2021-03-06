import { FieldValue } from "react-hook-form/dist/types";
import firebase from 'firebase/app';

export type PostType = {
    title: string,
    slug: string,
    uid: string,
    username: string,
    published: boolean,
    content: string,
    createdAt: firebase.firestore.FieldValue,
    updatedAt: firebase.firestore.FieldValue,
    heartCount: 0,
}