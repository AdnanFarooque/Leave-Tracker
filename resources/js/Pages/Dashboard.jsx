import React from 'react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import SelectBox from '@/Components/SelectBox';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Navbar from '@/Components/Navbar';
import User from '@/Components/User';
import { useForm, usePage, Head } from '@inertiajs/react';
 
export default function Index({ users, pen_req, app_req, rej_req, total }) {
    
    const { auth } = usePage().props;
    
    const { data, setData, post, processing, reset, errors } = useForm({
        
    });
    
    
    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                    <div className="min-h-screen bg-gray-100">
                        <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                            <div className="flex justify-between items-center">
                                <span className="text-blue-800">Pending Request: {pen_req}</span>
                                <span className="text-green-800">Approved Request: {app_req}</span>
                                <span className="text-red-800">Rejected Request: {rej_req}</span>
                                <span className="text-purple-800">Total Request: {total}</span>
                            </div>
                        {users.map((user, index) =>
                            <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                                <User index={index} user={user} />
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}