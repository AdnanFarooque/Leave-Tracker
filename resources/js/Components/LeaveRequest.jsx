import React, { useState } from 'react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import { useForm, usePage } from '@inertiajs/react';

 
export default function LeaveRequest({ leave_request, from }) {
    const { auth } = usePage().props;
    
    const [action, setAction] = useState(false);
    
    const [done, setDone] = useState(false);
    
    const [flag, setFlag] = useState(from=="welcome" ? true : false);

    const { data, setData, patch, processing, reset, errors } = useForm({
        comment: '',
        state: '',
    });
    
    const submit = (e) => {
        e.preventDefault();
        patch(route('leave_models.update', leave_request.id), { onSuccess: () => setAction(true)});
    };
    
    
    return (
        <>
            <div className="p-6 flex space-x-2">
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <ul>
                            <li className="text-gray-800">Leave Type: {leave_request.type_leave}</li>
                            <br/>
                            <li className="text-gray-800">Start Date: {leave_request.start_date}</li>
                            <li className="text-gray-800">End Date: {leave_request.end_date}</li>
                            <br/>
                            <li className="text-gray-800">Reason For Leave: {leave_request.leave_text}</li>
                            <br/>
                            {(flag && leave_request.state==0) &&
                            <li className="text-blue-800">Status: Pending</li>}
                            {(flag && leave_request.state==1) &&
                            <li className="text-green-800">Status: Approved</li>}
                            {(flag && leave_request.state==2) &&
                            <li className="text-red-800">Status: Rejected</li>}
                            {action  ?
                                (!flag && (<form onSubmit={submit}>
                                    <textarea
                                        type="text"
                                        placeholder="Comment"
                                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                        onChange={e => setData('comment', e.target.value)}
                                    ></textarea>
                                    <InputError message={errors.message} className="mt-2" />
                                    <br/>
                                    <button type="submit" value="1" onClick={e => {setData('state', e.target.value);setDone(true);} } className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Approve Request</button>
                                    <button type="submit" value="2" onClick={e => {setData('state', e.target.value);setDone(true);} } className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Reject Request</button>
                                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => setAction(false)}>Cancel</button>
                                </form>))
                                : (!flag && (<button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                onClick={() => setAction(true)}>Take Action</button>))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}