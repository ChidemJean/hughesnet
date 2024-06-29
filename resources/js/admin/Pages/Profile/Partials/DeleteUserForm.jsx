import { useRef, useState } from 'react';
import DangerButton from '@/admin/Components/DangerButton';
import InputError from '@/admin/Components/InputError';
import InputLabel from '@/admin/Components/InputLabel';
import Modal from '@/admin/Components/Modal';
import SecondaryButton from '@/admin/Components/SecondaryButton';
import TextInput from '@/admin/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function DeleteUserForm({ className }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Deletar conta</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Depois que sua conta for excluída, todos os seus recursos e dados serão permanentemente excluídos. Antes de excluir sua conta, baixe quaisquer dados ou informações que deseja manter.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>Deletar Conta</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Você tem certeza que quer deletar sua conta?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Assim que sua conta for excluída, todos os seus recursos e dados serão permanentemente excluídos. Por favor, digite sua senha para confirmar que você deseja excluir permanentemente sua conta.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Senha" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Senha"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>

                        <DangerButton className="ml-3" disabled={processing}>
                            Deletar Conta
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
