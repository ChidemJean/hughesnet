import InputError from "@/admin/Components/InputError";
import InputLabel from "@/admin/Components/InputLabel";
import PrimaryButton from "@/admin/Components/PrimaryButton";
import SecondaryButton from "@/admin/Components/SecondaryButton";
import Select from "@/admin/Components/Select";
import TextInput from "@/admin/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { useRef } from "react";
import TinyEditor from "@/admin/Components/TinyEditor";
import CustomSwitch from "@/admin/Components/CustomSwitch";

const UPDATE_URL = `texts.update`;
const STORE_URL = `texts.store`;
const INDEX_URL = `texts.index`;

export default function Form({
    fields,
    authors,
    categories
}) {
    const titleInput = useRef();
    const subtitleInput = useRef();
    const slugInput = useRef();
    const editorInput = useRef();
    const linkInput = useRef();
    const imgInput = useRef();

    if (fields && (fields.hasOwnProperty('background_img') || fields.hasOwnProperty('is_internal'))) {
        let { background_img, is_internal, ..._restFields } = fields;
    }

    let restFields = (typeof _restFields !== 'undefined') ? _restFields : fields;

    const {
        data,
        setData,
        put,
        post,
        processing,
        reset,
        errors,
    } = useForm(
        {
            title: '',
            subtitle: '',
            link: '',
            slug: '',
            content: '',
            img: null,
            ...restFields
        }
    );

    const save = (e) => {
        e.preventDefault();
        let options = { preserveScroll: true, onSuccess: () => router.replace(route(INDEX_URL)) };

        if (fields) {
            post(route(UPDATE_URL), options);
        } else {
            post(route(STORE_URL), options);
        }
    };

    return (
        <form onSubmit={save} className="p-6">
            <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2 mb-4 px-2">
                    <InputLabel htmlFor="title" value="Título" />

                    <TextInput
                        id="title"
                        type="text"
                        name="title"
                        ref={titleInput}
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="mt-1 block w-full"
                        isFocused
                    />

                    <InputError message={errors.title} className="mt-2" />
                </div>

                <div className="w-full md:w-1/2 mb-4 px-2">
                    <InputLabel htmlFor="slug" value="Slug" />

                    <TextInput
                        id="slug"
                        type="text"
                        name="slug"
                        ref={slugInput}
                        value={data.slug}
                        className="mt-1 block w-full"
                        disabled
                        isFocused
                    />

                    <InputError message={errors.slug} className="mt-2" />
                </div>

                <div className="w-full md:w-1/2 mb-4 px-2">
                    <InputLabel htmlFor="subtitle" value="Subtítulo" />

                    <TextInput
                        id="subtitle"
                        type="text"
                        name="subtitle"
                        ref={subtitleInput}
                        value={data.subtitle}
                        onChange={(e) => setData('subtitle', e.target.value)}
                        className="mt-1 block w-full"
                        isFocused
                    />

                    <InputError message={errors.subtitle} className="mt-2" />
                </div>

                <div className="w-full md:w-1/2 mb-4 px-2">
                    <InputLabel htmlFor="link" value="Link" />

                    <TextInput
                        id="link"
                        type="text"
                        name="link"
                        ref={linkInput}
                        value={data.link}
                        onChange={(e) => setData('link', e.target.value)}
                        className="mt-1 block w-full"
                        isFocused
                    />

                    <InputError message={errors.link} className="mt-2" />
                </div>

                <div className="w-full mb-4 px-2">
                    <InputLabel htmlFor="img" value="Imagem" />

                    <TextInput
                        id="img"
                        type="file"
                        name="img"
                        ref={imgInput}
                        onChange={(e) => setData('img', e.target.files[0])}
                        className="mt-1 block w-full"
                        isFocused
                    />

                    <InputError message={errors.img} className="mt-2" />
                </div>

                <div className="w-full mb-4 px-2">
                    <InputLabel htmlFor="content" value="Conteúdo" onClick={(e) => editorInput.current.focus()}/>

                    <TinyEditor
                        id="content"
                        ref={editorInput}
                        onChange={(e) => setData('content', editorInput.current.getContent())}
                        value={data.content}/>

                    <InputError message={errors.content} className="mt-2" />
                </div>

            </div>

            <div className="mt-6 flex justify-end">
                <a href={route(INDEX_URL)}>
                    <SecondaryButton>Cancelar</SecondaryButton>
                </a>

                <PrimaryButton className="ml-3" disabled={processing}>
                    Salvar
                </PrimaryButton>
            </div>
        </form>
    );
}
