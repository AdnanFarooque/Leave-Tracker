import React from 'react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import Navbar from '@/Components/Navbar';
// import LeaveForm from '@/Components/LeaveForm';
import { useForm, Link, Head } from '@inertiajs/react';
 

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    
    const { data, setData, post, processing, reset, errors } = useForm({
    });

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="min-h-screen bg-gray-100">
                    <Navbar user={auth.user}/>
                    {auth.user &&
                        (
                            <>
                                <div className="max-w-2xl mx-auto p-4 text-center sm:p-6 lg:p-8">
                                    <div className="flex justify-center items-center">
                                        <span className="text-black-800 text-2xl">
                                            Logged in as {auth.user.name} {auth.user.role=="admin" ? " (Admin)":""}
                                        </span>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    );
}


