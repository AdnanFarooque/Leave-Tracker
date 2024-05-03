import React from 'react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import SelectBox from '@/Components/SelectBox';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Navbar from '@/Components/Navbar';
import LeaveRequest from '@/Components/LeaveRequest';
import { useForm, usePage, Head } from '@inertiajs/react';
 
export default function Show({ leave_requests }) {
    
    const { auth } = usePage().props;
    
    const { data, setData, post, processing, reset, errors } = useForm({
    });
    
    
    return (
        <>
            <Head title="LeaveForm" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="min-h-screen bg-gray-100">
                    <Navbar />
                    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                        <div className="flex justify-center items-center">
                            <span className="text-purple-800 text-xl">List of leave requests</span>
                        </div>
                        {leave_requests.map( leave_request =>
                            <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                                <LeaveRequest leave_request={leave_request} from="welcome"/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

