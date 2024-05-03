import React from 'react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useForm, Head } from '@inertiajs/react';

export default function SelectBox({ content='', className='', topValue="", isFocused=false, ...props}, ref) {
    const input = ref ? ref : useRef();
    
    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);
    
    return(
        <div className={className}>
            <select {...props} className={className}>
                <option value={topValue}>{topValue}</option>
                {content.map(item =>
                    <option value={item}>{item}</option>
                )}
            </select>
        </div>
    );
}