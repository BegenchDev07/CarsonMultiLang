import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Languages, Users, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ContactsPage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
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
    console.log('Form submitted:', formData);
  };


const offices = [
  {
    id: "john",
    name: t('offices.team.john.name'),
    position: t('offices.team.john.position'),
    languages: t('offices.team.john.languages'),
    phone: "+85261545880",
    email: "john@skyelectronicshk.com",
    whatsapp: "https://wa.link/9sgo22",
  },
  // {
  //   id: "tim",
  //   name: t('offices.team.tim.name'),
  //   position: t('offices.team.tim.position'),
  //   languages: t('offices.team.tim.languages'),
  //   phone: "+77479888860",
  //   email: "timagr@skyelectronicshk.com",
  //   whatsapp: "https://wa.link/z4a4wh",
  // },  
  // {
  //   id: "jack",
  //   name: t('offices.team.jack.name'),
  //   position: t('offices.team.jack.position'),
  //   languages: t('offices.team.jack.languages'),
  //   phone: "+852 6235 2890",
  //   email: "smith@skyelectronicshk.com",
  //   whatsapp: "https://wa.link/htnjz9"
  // },
  // {
  //   id: "David",
  //   name: t('offices.team.diamond.name'),
  //   position: t('offices.team.diamond.position'),
  //   languages: t('offices.team.diamond.languages'),
  //   phone: "+85261574997",
  //   email: "david@skyelectronicshk.com",
  //   whatsapp: "https://wa.link/9dh2wp"
  // },
  // {
  //   id: "Frank",
  //   name: t('offices.team.ray.name'),
  //   position: t('offices.team.ray.position'),
  //   languages: t('offices.team.ray.languages'),
  //   phone: "+85261545880",
  //   email: "frank@skyelectronicshk.com",
  //   whatsapp: "https://wa.link/9dh2wp"
  // }
];

  return (
    <div className={`pt-20 min-h-screen bg-white ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>
      

      {/* Contact Form & Info */}
      <section className="py-24 bg-white">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('contact.sendMessage')}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
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
                  <label htmlFor="company" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('contact.company')}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('contact.company')}
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('contact.subject')} {t('contact.required')}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{t('contact.selectSubject')}</option>
                    <option value="sales">{isRTL ? 'استفسار مبيعات' : 'Sales Inquiry'}</option>
                    <option value="support">{isRTL ? 'دعم تقني':'Technical Support'}</option>
                    <option value="partnership">{isRTL ? 'شراكة' : 'Partnership'}</option>
                    <option value="media">{isRTL ? 'إعلام وصحافة':'Media and Press'}</option>                    
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('contact.message')} {t('contact.required')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('contact.projectDetailsPlaceholder')}
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300 flex items-center justify-center"
                >
                  <Send className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t('contact.send')}
                </button>
              </form>
            </div>            
          </div>
        </div>
      </section>

      {/* Contact Information */}            
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('contact.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('contact.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {offices.map((office, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{office.name}</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-id-card-lanyard-icon lucide-id-card-lanyard h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0"><path d="M13.5 8h-3"/><path d="m15 2-1 2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3"/><path d="M16.899 22A5 5 0 0 0 7.1 22"/><path d="m9 2 3 6"/><circle cx="12" cy="15" r="3"/></svg>
                    {/* <MapPin className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" /> */}
                    <span>{office.position}</span>
                  </div>
                  {
                    office.languages !== null
                    &&
                    <div className="flex items-start">
                      <Languages className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{office.languages}</span>
                    </div>
                  }
                  {
                    (office.phone !== null && office.whatsapp)
                    &&
                  <div className="flex items-center">
                    <div className='flex items-center justify-center'>
                      <Phone className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />                      
                      <h1 className='pr-2'>WA:</h1>
                    </div>
                    <a className='underline' href={office.whatsapp}>{office.phone}</a>
                  </div>
                  }
                  {
                    office.email !== null
                    &&
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                      <span>{office.email}</span>
                    </div>
                  }                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>     
    </div>
  );
};

export default ContactsPage;