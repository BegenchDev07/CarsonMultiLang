import React, { useState } from 'react';
import { X, Send, User, Mail, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface GetQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GetQuoteModal: React.FC<GetQuoteModalProps> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    email: '',         
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    const form = JSON.stringify(formData);    
    // Object.entries(formData).forEach(([key, value]) => {
    //   form.append(key, value);
    // });
    fetch('https://script.google.com/macros/s/AKfycbwrtDXiXZMIegKzw-q8wwvP3nOvv414OTQfj9jgF1hQxGnLRwrtY2VFF0z7ovnZBPBXmw/exec',{
      method: 'POST',
      body: form
    })    
    .catch((err) => {
      console.error(err)
    })            
    console.log('Quote request submitted');
    // Reset form and close modal
    setFormData({
      name: '',
      email: '',             
      message: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`flex items-center justify-between p-8 border-b border-gray-200 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{t('quote.title')}</h2>
            <p className="text-gray-600 mt-2">{t('quote.subtitle')}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close quote modal"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form 
        method='POST'        
        onSubmit={handleSubmit}
         className={`p-8 space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                <User className={`h-4 w-4 inline ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('contact.fullName')} {t('contact.required')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t('contact.fullName')}
              />
            </div>
            <div>
              <label htmlFor="email" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                <Mail className={`h-4 w-4 inline ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('contact.emailAddress')} {t('contact.required')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t('contact.emailAddress')}
              />
            </div>            
          </div>
                    
          

          <div>
            <label htmlFor="message" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              <MessageSquare className={`h-4 w-4 inline ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('contact.projectDetails')} {t('contact.required')}
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t('quote.projectDetailsPlaceholder')}
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">            
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                {t('contact.cancel')}
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-300 flex items-center"
              >
                <Send className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('quote.sendRequest')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetQuoteModal;