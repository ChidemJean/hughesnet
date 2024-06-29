import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import { router } from '@inertiajs/react';
import { notify } from "../Layouts/AuthenticatedLayout";

export default function SaveOrderButtons({ items, model, onCancel, onFinish }) {

    const {
        data,
        setData,
        put,
        post,
        processing,
        reset,
        errors,
    } = useForm(
        { ids: null, model }
    );

    const save = () => {
        let options = {
            preserveScroll: true,
            onSuccess: () => {
                notify({
                    type: 'success',
                    title: 'Ordem salva com sucesso!',
                    description: ''
                });
                onFinish();
            },
            onError: () => {
                notify({
                    type: 'danger',
                    title: 'Ocorreu um erro!',
                    description: 'Houve um erro interno durante a tentativa de atualizar a ordem.'
                });
            }
        };
        post(route('save.order'), options);
    };

    useEffect(() => {
        if (items) {
            setData('ids', items?.map(({ id }) => id));
        }
    }, [items])

    return (
        <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={(e) => onCancel()}>Cancelar</SecondaryButton>
            <PrimaryButton className="ml-3" disabled={processing} onClick={(e) => save()}>
                Salvar ordem
            </PrimaryButton>
        </div>
    );
}
