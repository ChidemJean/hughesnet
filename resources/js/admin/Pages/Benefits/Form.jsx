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

const UPDATE_URL = `benefits.update`;
const STORE_URL = `benefits.store`;
const INDEX_URL = `benefits.index`;

export default function Form({
    fields,
    authors,
    categories
}) {
    const titleInput = useRef();
    const editorInput = useRef();
    const iconInput = useRef();

    if (fields && fields.hasOwnProperty('icon')) {
        let { icon, ..._restFields } = fields;
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
            text: '',
            icon: null,
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
                    <InputLabel htmlFor="icon" value="Ícone" />

                    <TextInput
                        id="icon"
                        type="file"
                        name="icon"
                        ref={iconInput}
                        onChange={(e) => setData('icon', e.target.files[0])}
                        className="mt-1 block w-full"
                        isFocused
                    />

                    <InputError message={errors.icon} className="mt-2" />
                </div>

                <div className="w-full mb-4 px-2">
                    <InputLabel htmlFor="text" value="Texto" onClick={(e) => editorInput.current.focus()}/>

                    <TinyEditor
                        id="text"
                        ref={editorInput}
                        onChange={(e) => setData('text', editorInput.current.getContent())}
                        value={data.text}/>

                    <InputError message={errors.text} className="mt-2" />
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
