import GuestLayout from '@/admin/Layouts/GuestLayout';
import InputError from '@/admin/Components/InputError';
import PrimaryButton from '@/admin/Components/PrimaryButton';
import TextInput from '@/admin/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                <h1 className='font-bold text-lg mb-2'>Esqueceu sua senha?</h1>
                Sem problemas. Basta nos informar seu endereço de e-mail e
                enviaremos um link de redefinição de senha por e-mail que permitirá que você escolha uma nova senha.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">{status}</div>}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={onHandleChange}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        Enviar Link de Redefinição
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
