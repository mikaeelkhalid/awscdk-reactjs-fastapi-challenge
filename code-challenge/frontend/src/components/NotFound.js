/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className='container mx-auto p-20'>
      <section className='flex items-center h-full dark:bg-gray-800 dark:text-gray-100'>
        <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>
          <div className='max-w-md text-center'>
            <h2 className='mb-8 font-extrabold text-9xl dark:text-gray-600'>
              <span className='sr-only'>Error</span>404
            </h2>
            <p className='text-2xl font-semibold md:text-3xl'>
              Sorry, we couldn't find this page.
            </p>
            <p className='mt-4 mb-8 dark:text-gray-400'>
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
            <Link
              to={'/'}
              className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700'
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

