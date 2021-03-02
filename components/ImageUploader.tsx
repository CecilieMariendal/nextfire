import { useState } from 'react';
import { ImHome3 } from 'react-icons/im';
import { auth, storage, STATE_CHANGED } from '../lib/firebase';
import Loader from './Loader';


export default function ImageUploader() {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState(null);

    const uploadFile = (event) =>  {
        const file = Array.from(event.target.files)[0] as File;
        const extension = file.type.split('/')[1];

        // Ref to storage bucket location
        const ref = storage.ref(`uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`);
        setUploading(true);

        // Starts the upload
        const task = ref.put(file);

        // Listen to updates to upload task
        task.on(STATE_CHANGED, (snapshot) => {
            const pct = Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(pct);

            // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
            task
                .then(() => ref.getDownloadURL())
                .then((url) => {
                    setDownloadURL(url);
                    setUploading(false);
                });
        })

    }

    
    return (
        <div className="box">
            <Loader show={uploading} />
            {uploading && <h3>{progress}%</h3>}

            {!uploading && (
                <label className="btn">
                    📸 Upload Image
                    <input type="file" onChange={uploadFile} accept="image/x-png,image/gif,image/jpeg" />
                </label>
            )}

            {downloadURL && <code className="upload-snippet">{`![alt](${downloadURL})`}</code>}
        </div>
    );
}