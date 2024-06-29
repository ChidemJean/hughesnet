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

const UPDATE_URL = `banners.update`;
const STORE_URL = `banners.store`;
const INDEX_URL = `banners.index`;

export default function Form({
    fields,
    authors,
    categories
}) {
    const titleInput = useRef();
    const editorInput = useRef();
    const linkInput = useRef();
    const backgroundImgInput = useRef();
    const backgroundImgTabletInput = useRef();
    const backgroundImgMobileInput = useRef();

    if (fields && fields.hasOwnProperty('background_img')) {
        let { background_img, background_img_tablet, background_img_mobile, ..._restFields } = fields;
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
            slug: '',
            content: '',
            resume: '',
            blog_category_id: null,
            blog_author_id: null,
            background_img: null,
            background_img_tablet: null,
            background_img_mobile: null,
            highlight: 0,
            published_at: null,
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
                    <InputLabel htmlFor="background_img" value="Imagem" />

                    <TextInput
                        id="background_img"
                        type="file"
                        name="background_img"
                        ref={backgroundImgInput}
                        onChange={(e) => setData('background_img', e.target.files[0])}
                        className="mt-1 block w-full"
                        isFocused
                    />

                    <InputError message={errors.background_img} className="mt-2" />
                </div>

                <div className="w-full mb-4 px-2">
                    <InputLabel htmlFor="background_img_tablet" value="Imagem tablet" />

                    <TextInput
                        id="background_img_tablet"
                        type="file"
                        name="background_img_tablet"
                        ref={backgroundImgTabletInput}
                        onChange={(e) => setData('background_img_tablet', e.target.files[0])}
                        className="mt-1 block w-full"
                        isFocused
                    />

                    <InputError message={errors.background_img_tablet} className="mt-2" />
                </div>

                <div className="w-full mb-4 px-2">
                    <InputLabel htmlFor="background_img_mobile" value="Imagem celular" />

                    <TextInput
                        id="background_img_mobile"
                        type="file"
                        name="background_img_mobile"
                        ref={backgroundImgMobileInput}
                        onChange={(e) => setData('background_img_mobile', e.target.files[0])}
                        className="mt-1 block w-full"
                        isFocused
                    />

                    <InputError message={errors.background_img_mobile} className="mt-2" />
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
