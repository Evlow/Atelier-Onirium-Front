import React from 'react';
import '../Formulaires/contactInputForm.css';

interface Props {
  type: 'email' | 'text' | 'area';
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const ContactInputForm: React.FC<Props> = ({ type, value, placeholder, onChange }) => {
  return (
    <div>
      {type === 'area' ? (
        <textarea
          className="contact-form-textarea"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className="contact-form-input"
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default ContactInputForm;
