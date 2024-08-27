import React, { useState, useEffect } from 'react';
import './RegisterForm.scss';

const RegisterForm = ({ onUserRegistered }) => {
  const [positions, setPositions] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position_id: '',
    photo: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions');
        const data = await response.json();
        setPositions(data.positions);
      } catch (error) {
        console.error('Error fetching positions:', error);
      }
    };

    fetchPositions();
  }, []);

  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.position_id &&
      formData.photo &&
      Object.keys(errors).length === 0
    );
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (formData.name.length < 2 || formData.name.length > 60) {
      newErrors.name = 'Name should be between 2 and 60 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\+?380([0-9]{9})$/.test(formData.phone)) {
      newErrors.phone = 'Phone number should match +380XXXXXXXXX format.';
    }

    if (!formData.position_id) {
      newErrors.position_id = 'Position is required.';
    }

    if (!formData.photo) {
      newErrors.photo = 'Photo is required.';
    } else {
      const { photo } = formData;
      if (photo.size > 5 * 1024 * 1024) {
        newErrors.photo = 'Photo must be less than 5 MB.';
      } else if (!['image/jpeg', 'image/jpg'].includes(photo.type)) {
        newErrors.photo = 'Photo must be in JPEG/JPG format.';
      } else {
        const img = new Image();
        img.src = URL.createObjectURL(photo);
        img.onload = () => {
          if (img.width < 70 || img.height < 70) {
            setErrors((prev) => ({ ...prev, photo: 'Minimum size of photo is 70x70px.' }));
          }
        };
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setFormData((prev) => ({
      ...prev,
      photo: file,
    }));

    if (errors.photo) {
      setErrors((prev) => ({
        ...prev,
        photo: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const tokenResponse = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token');
      const tokenData = await tokenResponse.json();

      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('position_id', formData.position_id);
      submitData.append('photo', formData.photo);

      const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
        method: 'POST',
        body: submitData,
        headers: {
          Token: tokenData.token,
        },
      });

      const result = await response.json();

      if (result.success) {
        onUserRegistered();
        setFormData({
          name: '',
          email: '',
          phone: '',
          position_id: '',
          photo: null,
        });
        setErrors({});
      } else {
        setErrors({ submit: result.message });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'An error occurred during submission.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="post-section">
      <div className="form-container">
        <h2>Working with POST request</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="input-field">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="input-field">
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <p>+38 (XXX) XXX - XX - XX</p>
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="radio-group">
            <p>Select your position</p>
            {positions.map((pos) => (
              <div className="radio-option" key={pos.id}>
                <input
                  type="radio"
                  name="position_id"
                  value={pos.id}
                  checked={formData.position_id === pos.id.toString()}
                  onChange={handleInputChange}
                />
                <label>{pos.name}</label>
              </div>
            ))}
            {errors.position_id && <span className="error-message">{errors.position_id}</span>}
          </div>

          <div className="upload-field">
            <input type="file" id="photo" name="photo" accept="image/jpeg, image/jpg" onChange={handleFileChange} />
            <label htmlFor="photo">
              <span className="upload-button">Upload</span>
              <span className="file-name">{formData.photo ? formData.photo.name : 'Upload your photo'}</span>
            </label>
            {errors.photo && <span className="error-message">{errors.photo}</span>}
          </div>

          {errors.submit && <span className="error-message submit-error">{errors.submit}</span>}

          <button
            type="submit"
            className="submit-button"
            disabled={!isFormValid() || isSubmitting}
          >
            {isSubmitting ? 'Loading...' : 'Sign up'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegisterForm;


