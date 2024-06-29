import React, { forwardRef, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const imageUploadUrl = route('images.upload');

export default forwardRef(function TinyEditor({ value, id, onChange }, ref) {
    const editorRef = ref ? ref : useRef();
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const imageUploadHandler = (blobInfo, progress) => new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open('POST', imageUploadUrl);
        xhr.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').getAttribute('content'));
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        xhr.upload.onprogress = (e) => {
            progress(e.loaded / e.total * 100);
        };

        xhr.onload = () => {
            if (xhr.status === 403) {
                reject({ message: 'HTTP Error: ' + xhr.status, remove: true });
                return;
            }

            if (xhr.status < 200 || xhr.status >= 300) {
                reject('HTTP Error: ' + xhr.status);
                return;
            }

            const json = JSON.parse(xhr.responseText);

            if (!json || typeof json.location != 'string') {
                reject('Invalid JSON: ' + xhr.responseText);
                return;
            }

            resolve(json.location);
        };

        xhr.onerror = () => {
            reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
        };

        const formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());

        xhr.send(formData);
    });

    return (
        <>
            <Editor
                apiKey='ht8pctdp68ckmqkpfv1ustqmfq87hip0b8qkxymdkeh2lmm1'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={value}
                onChange={onChange}
                init={{
                    height: 400,
                    // menubar: true,
                    auto_focus: id,
                    toolbar_sticky: true,
                    language: 'pt_BR',
                    menubar: 'edit view insert format tools table help',
                    plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
                    toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    // skin: (window.matchMedia("(prefers-color-scheme: dark)").matches ? "oxide-dark" : ""),
                    // content_css: (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : ""),
                    images_upload_handler: imageUploadHandler,
                }}
            />
        </>
    );
});
