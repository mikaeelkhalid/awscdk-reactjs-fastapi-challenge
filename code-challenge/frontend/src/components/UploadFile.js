import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api/api';

export const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileTypeError, fsetFileTypeError] = useState(false);
  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', selectedFile);

    if (selectedFile.type === 'text/plain') {
      try {
        const response = await axios({
          method: 'post',
          url: `${BASE_URL}/api/upload-file`,
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log(response);
        setData(response.data);
        setSelectedFile(null);
        fsetFileTypeError(false);
      } catch (error) {
        setSelectedFile(null);
        setData(null);
        console.log(error);
      }
    } else {
      fsetFileTypeError(true);
      setSelectedFile(null);
      setData(null);
    }
  };

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <>
      <div className='container mx-auto p-40'>
        <div className='md:grid md:grid-cols-3 md:gap-6'>
          <div className='md:col-span-1'>
            <div className='px-4 sm:px-0'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Get German Phone #'s.
              </h3>
              <p className='mt-1 text-sm text-gray-600'>
                Upload .txt file to get the Task ID, and you should be able to
                retrieve the results of the submitted file.
              </p>
            </div>
          </div>
          <div className='mt-5 md:col-span-2 md:mt-0'>
            <form onSubmit={handleSubmit}>
              <div className='shadow sm:overflow-hidden sm:rounded-md'>
                <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      {selectedFile ? selectedFile.name : 'Please Select File'}
                    </label>
                    <label className='block text-sm font-medium text-red-700'>
                      {fileTypeError
                        ? 'Wrong file type, only .txt type allowed'
                        : null}
                    </label>
                    <label className='block text-sm font-medium text-green-700'>
                      {data ? `TASK ID: ${data.task_id}` : null}
                    </label>
                    <label className='block text-sm font-medium text-green-700'>
                      {data ? 'SUCCESS' : null}
                    </label>
                    <div className='mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6'>
                      <div className='space-y-1 text-center'>
                        <div className='flex text-sm text-gray-600'>
                          <label
                            htmlFor='file-upload'
                            className='relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500'
                          >
                            <span>Upload a file</span>
                            <input
                              id='file-upload'
                              name='file-upload'
                              type='file'
                              onChange={handleFileSelect}
                              className='sr-only'
                            />
                          </label>
                          <p className='pl-1'>or drag and drop</p>
                        </div>
                        <p className='text-xs text-gray-500'>.TXT</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                  <button
                    disabled={selectedFile === null}
                    type='submit'
                    className={`${
                      selectedFile === null
                        ? 'cursor-not-allowed inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        : 'inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    }`}
                  >
                    Upload
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

