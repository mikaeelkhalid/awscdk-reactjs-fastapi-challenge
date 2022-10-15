import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api/api';

export const GetTaskIds = () => {
  const [data, setData] = useState(null);
  const [notFound, setNotFound] = useState(null);

  const fetchTaskIds = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/get-task-ids`);

      if (response.data.code === 200) {
        setData(response.data.data);
      }
      if (response.data.code === 404) {
        setNotFound(response.data.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTaskIds();
  }, []);

  return (
    <>
      <div className='container mx-auto p-40'>
        <div className='md:grid md:grid-cols-3 md:gap-6'>
          <div className='md:col-span-1'>
            <div className='px-4 sm:px-0'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                List Of Task IDs
              </h3>
              <p className='mt-1 text-sm text-gray-600'>
                Here, the list of your Task IDs
              </p>
            </div>
          </div>
          <div className='mt-5 md:col-span-2 md:mt-0'>
            <div className='flex flex-col'>
              <div className='overflow-x-auto shadow sm:-mx-6 lg:-mx-8'>
                <div className='bg-white py-2 inline-block min-w-full sm:px-6 lg:px-8'>
                  <label className='py-2 block text-sm font-medium text-gray-700'>
                    {notFound ? notFound : 'The Result is Y-Scrollable'}
                  </label>
                  {!notFound ? (
                    <div className='flex justify-center border-solid border-2 border-indigo-600 overflow-auto h-72'>
                      <ol className='list-decimal'>
                        {data
                          ? data.task_ids.map((taskID, i) => (
                              <li
                                key={i}
                                className='px-10 py-2 border-b border-gray-200 w-full'
                              >
                                {taskID.task_id}
                              </li>
                            ))
                          : null}
                      </ol>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

