import React, { useState } from 'react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import LeaveRequest from '@/Components/LeaveRequest';
import { useForm, usePage } from '@inertiajs/react';

 
export default function User({ user }) {
    const { auth } = usePage().props;
    
    const [state, setState] = useState(false);

    const { data, setData, patch, clearErrors, reset, errors } = useForm({
    });
    
    const new_user = () => {
        let leaves = [];
        
        for(let i = 0; i < user.leave_models.length; i++)
        {
            if(user.leave_models[i].state > 0)
            {
                continue;
            }
            
            let first_date = new Date(user.leave_models[i].start_date);
            let second_date = new Date(user.leave_models[i].end_date);
            
            let start_date = first_date.getDate()+"/"+first_date.getMonth()+"/"+first_date.getFullYear();
            let end_date = second_date.getDate()+"/"+second_date.getMonth()+"/"+second_date.getFullYear();
            
            let temp_leave = {
                "id": user.leave_models[i].id,
                "type_leave": user.leave_models[i].type_leave,
                "start_date": start_date,
                "end_date": end_date,
                "leave_text": user.leave_models[i].leave_text,
                "state": user.leave_models[i].state,
            }
            
            leaves[i] = temp_leave;
        }
        
        let temp_user = {
            "name": user.name,
            "leave_models": leaves,
        }
        
        return temp_user;
    };        
    
    return (
        <>
            
            <div className="p-6 flex space-x-2">
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-800">{new_user().name}</span>
                        <button className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" 
                        onClick={() => setState(!state)}>
                            {state ? "Close":"Leave Requests"}
                        </button>
                    </div>
                </div>
            </div>
        
            {state &&
                <>
                    {new_user().leave_models.map( leave_request =>
                        <LeaveRequest leave_request={leave_request} from="dashboard"/>
                    )}
                </>
            }
        </>
    );
}