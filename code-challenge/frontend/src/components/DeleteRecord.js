import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api/api';

export const DeleteRecord = () => {
  const [InputTaskId, setInputTaskId] = useState('');
  const [data, setData] = useState(null);
  const [notFound, setNotFound] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('taskId', InputTaskId);

    try {
      const response = await axios({
        method: 'delete',
        url: `${BASE_URL}/api/delete-record`,
        data: formData,
      });

      if (response.data.code === 204) {
        setData(response.data);
        setNotFound(null);
        setInputTaskId('');
      }
      if (response.data.code === 404) {
        setNotFound(response.data.data.message);
        setData(null);
      }
    } catch (error) {
      console.log(error);
      setNotFound(null);
      setData(null);
    }
  };

  const handleChange = (e) => {
    setInputTaskId(e.target.value);
  };
  return (
    <>
      <div className='container mx-auto p-40'>
        <div className='md:grid md:grid-cols-3 md:gap-6'>
          <div className='md:col-span-1'>
            <div className='px-4 sm:px-0'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                You'll Need Task ID
              </h3>
              <p className='mt-1 text-sm text-gray-600'>
                Please use Task ID to delete record
              </p>
            </div>
          </div>
          <div className='mt-5 md:col-span-2 md:mt-0'>
            <form onSubmit={handleSubmit}>
              <div className='overflow-hidden shadow sm:rounded-md mb-10'>
                <div className='bg-white px-4 py-5 sm:p-6'>
                  <div className='grid grid-cols-6 gap-6'>
                    <div className='col-span-6'>
                      <label
                        htmlFor='task_id'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Enter Task ID to Delete Record
                      </label>
                      <label className='block text-sm font-medium text-green-700'>
                        {data ? data.data.message : null}
                      </label>
                      <label className='block text-sm font-medium text-red-700'>
                        {notFound ? notFound : null}
                      </label>
                      <input
                        type='text'
                        name='task_id'
                        id='task_id'
                        placeholder='Enter Task ID'
                        value={InputTaskId}
                        onChange={handleChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                  <button
                    disabled={InputTaskId.length === 0}
                    type='submit'
                    className={`${
                      InputTaskId.length === 0
                        ? 'cursor-not-allowed inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                        : 'inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                    }`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

