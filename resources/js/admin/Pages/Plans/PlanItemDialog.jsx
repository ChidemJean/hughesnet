import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import InputLabel from "@/admin/Components/InputLabel";
import TextInput from "@/admin/Components/TextInput";
import TinyEditor from "@/admin/Components/TinyEditor";
import { Button } from "@/admin/Components/shared/Button";
import PrimaryButton from "@/admin/Components/PrimaryButton";
import { z } from "zod";
import { EventEmitter } from "@/events";
import { notify } from "@/admin/Layouts/AuthenticatedLayout";
import { getZodErrorMessage } from "@/formatter";

const PlanItemValidation = z.object({
    title: z.string(),
    text: z.string(),
});

export default function PlanItemDialog({ onSubmit, value = { id: null, title: '', text: ''} }) {

    const [item, setPlanItem] = useState({ id: value.id ?? null, title: value.title, value: value.text, idx: null});
    const [open, onOpenChange] = useState(false);

    useEffect(() => {
        EventEmitter.subscribe('edit_item_plan', (data) => {
            setPlanItem({ idx: null, ...data.item});
            onOpenChange(true);
        });
    }, [])

    function onSave(e) {
        e.preventDefault();
        let valid = PlanItemValidation.safeParse(item);
        if (valid.success) {
            onSubmit(item);
            setPlanItem({ id: null, title: '', text: '', idx: null });
        } else {
            notify({
                type: 'danger',
                title: 'Item inválido',
                description: `${getZodErrorMessage(valid.error)}. Verifique e tente novamente.`
            });
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <PrimaryButton className="mb-3">Novo item</PrimaryButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[780px] lg:max-w-screen-lg overflow-y-auto max-h-screen">
                <DialogHeader>
                    <DialogTitle>
                        {item.id == null && item.idx == null ? 'Criar novo item' : 'Editar item'}
                    </DialogTitle>
                    <DialogDescription>
                        {item.id == null && item.idx == null ? 'Crie itens para dar mais detalhes sobre o plano.' : ''}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSave}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <InputLabel htmlFor="item" className="text-right" value="Título" />
                            <TextInput id="item" value={item.title} onChange={(e) => setPlanItem(item => ({ ...item, title: e.target.value }))} wrapperClassName="col-span-3" className="w-full" />
                            <InputLabel htmlFor="item_value" className="text-right" value="Texto" />
                            <TextInput id="item_text" value={item.text} onChange={(e) => setPlanItem(item => ({ ...item, text: e.target.value }))} wrapperClassName="col-span-3" className="w-full" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit">{item.id == null && item.idx == null ? 'Adicionar' : 'Salvar'}</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}