import React from 'react';

export const ResultGrid = ({ data }) => {
  return (
    <>
      <div className='flex flex-col'>
        <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
            <label className='py-2 block text-sm font-medium text-gray-700'>
              The Result is X-Scrollable & Y-Scrollable
            </label>
            <div className='overflow-hidden'>
              <div className='pt-6 border-solid border-2 border-indigo-600 grid grid-cols-4 gap-2 content-center overflow-auto hover:overflow-scroll h-72'>
                {data.data.phone_numbers.map((number, i) => (
                  <span className='px-2' key={i}>
                    {number}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

