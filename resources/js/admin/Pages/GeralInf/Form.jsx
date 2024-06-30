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

const UPDATE_URL = `geral_inf.update`;
const INDEX_URL = `geral_inf.edit`;

export default function Form({
    fields,
}) {
    const metaDescriptionInput = useRef();
    const footerDescriptionInput = useRef();
    const phoneInput = useRef();
    const whatsappInput = useRef();

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
        <form onSubmit={save} className="p-6" name={`${fields ? 'update' : 'store'}_geral_inf`}>
            <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2 mb-4 px-2">
                    <InputLabel htmlFor="meta_description" value="Meta Descrição (SEO)" />

                    <TextInput
                        id="meta_description"
                        type="text"
                        name="meta_description"
                        ref={metaDescriptionInput}
                        value={data.meta_description}
                        onChange={(e) => setData('meta_description', e.target.value)}
                        className="mt-1 block w-full"
                        isFocused
                    />

                    <InputError message={errors.meta_description} className="mt-2" />
                </div>

                <div className="w-full md:w-1/2 mb-4 px-2">
                    <InputLabel htmlFor="footer_description" value="Texto rodapé" />

                    <TextInput
                        id="footer_description"
                        type="text"
                        name="footer_description"
                        ref={footerDescriptionInput}
                        value={data.footer_description}
                        className="mt-1 block w-full"
                        isFocused
                    />

                    <InputError message={errors.footer_description} className="mt-2" />
                </div>

                <div className="w-full md:w-1/2 mb-4 px-2">
                    <InputLabel htmlFor="phone" value="Telefone" />

                    <TextInput
                        id="phone"
                        type="text"
                        name="phone"
                        ref={phoneInput}
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        className="mt-1 block w-full"
                        isFocused
                    />

                    <InputError message={errors.phone} className="mt-2" />
                </div>

                <div className="w-full md:w-1/2 mb-4 px-2">
                    <InputLabel htmlFor="whatsapp" value="WhatsApp" />

                    <TextInput
                        id="whatsapp"
                        type="text"
                        name="whatsapp"
                        ref={whatsappInput}
                        value={data.whatsapp}
                        onChange={(e) => setData('whatsapp', e.target.value)}
                        className="mt-1 block w-full"
                        isFocused
                    />

                    <InputError message={errors.whatsapp} className="mt-2" />
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
