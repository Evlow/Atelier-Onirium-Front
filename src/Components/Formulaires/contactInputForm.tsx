import React from 'react';
import '../Formulaires/contactInputForm.css';

interface Props {
  type:'email' | 'text' | "area";
  value: string;
  label: string;
  onChange: (value: string) => void;

}

const ContactInputForm: React.FC<Props> = ({ type, value, label,onChange  }) => {
  return (
    <div className="contact-input-container">
      <label className="contact-form-label" htmlFor={label}>{label}</label>
      <input className="contact-form-input"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}

      />
    </div>
  );
};

export default ContactInputForm;
