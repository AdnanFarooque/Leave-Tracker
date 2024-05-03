import React from 'react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import SelectBox from '@/Components/SelectBox';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, usePage, Head } from '@inertiajs/react';
 
export default function LeaveForm() {
    
    const { auth } = usePage().props;
    
    const { data, setData, post, processing, reset, errors } = useForm({
        type_leave: '',
        start_date: '',
        end_date: '',
        leave_text: '',
    });
    
    const submit = (e) => {
        e.preventDefault();
        post(route('leave_models.store'), { onSuccess: () => reset() });
    };
    
    const leave_type = ["Casual Leave", "Sick Leave", "Emergency Leave"];
    
    return (
        <>
            <Head title="LeaveForm" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <InputLabel value="Type of Leave"/>
                    <SelectBox
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        content={leave_type}
                        topValue={"Type of Leave"}
                        onChange={e => setData('type_leave', e.target.value)}/>
                    <InputError message={errors.message} className="mt-2" />
                    
                    <InputLabel value="Start Date"/>
                    <TextInput
                        type="date"
                        placeholder="Start Date"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('start_date', e.target.value)}
                    ></TextInput>
                    <InputError message={errors.message} className="mt-2" />
                    
                    <InputLabel value="End Date"/>
                    <TextInput
                        type="date"
                        placeholder="End Date"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('end_date', e.target.value)}
                    ></TextInput>
                    <InputError message={errors.message} className="mt-2" />
                    
                    <InputLabel value="Reason(For leave)"/>
                    <textarea
                        type="text"
                        placeholder="Reason for leave"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('leave_text', e.target.value)}
                    ></textarea>
                    <InputError message={errors.message} className="mt-2" />
                    
                    <PrimaryButton className="mt-4" disabled={processing}>Submit</PrimaryButton>
                </form>
            </div>
        </>
    );
}