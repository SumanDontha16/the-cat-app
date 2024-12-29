import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { useUploadCatImageMutation } from '../../api/catApi';
import { useDispatch } from 'react-redux';
import { addCatImage } from '../../features/catSlice';

export const Upload = () => {
  const [ file, setFile ] = useState(null);
  const [ isUploading, setIsUploading ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ uploadCatImage ] = useUploadCatImageMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Validate file type
    if (selectedFile && (selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/png')) {
      setFile(selectedFile);
      setErrorMessage('');
    } else {
      setFile(null);
      setErrorMessage('Please upload a valid image file (.jpg or .png)');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setErrorMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    setIsUploading(true);

    try {
      const response = await uploadCatImage(formData).unwrap();
      dispatch(addCatImage(response.image));
      navigate('/');
    } catch (error) {
      setErrorMessage('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div data-testid="upload">
      <NavBar />
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Upload a Cat Image</h2>
          <p className="mt-4 text-gray-500">
            Any uploads must comply with the{' '}
            <Link to="https://thecatapi.com/privacy" className="text-indigo-600">
              upload guidelines
            </Link>{' '}
            or face deletion.
          </p>
          {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
          <div className="mt-4 border-t-[1px] border-gray-200 py-6">
            <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
            <button
              onClick={handleUpload}
              className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
              disabled={isUploading || !file}
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
