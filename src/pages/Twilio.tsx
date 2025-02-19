import React, { useState } from 'react';

function Twilio() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleCheckboxChange = (option: string) => {
    setSelectedOption(prev => (prev === option ? null : option));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Twilio Messaging Setup - Sonu</h1>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="sms"
                className="form-checkbox"
                checked={selectedOption === 'sms'}
                onChange={() => handleCheckboxChange('sms')}
              />
              <label htmlFor="sms" className="text-gray-700">Send an SMS message</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="whatsapp"
                className="form-checkbox"
                checked={selectedOption === 'whatsapp'}
                onChange={() => handleCheckboxChange('whatsapp')}
              />
              <label htmlFor="whatsapp" className="text-gray-700">Send a WhatsApp Message</label>
            </div>
            <div>
              <label htmlFor="fromPhoneNumber" className="block text-gray-700">From Phone Number</label>
              <input type="text" id="fromPhoneNumber" placeholder="+18001112222" className="mt-1 p-2 border border-gray-300 rounded w-full" />
            </div>
            <div>
              <label htmlFor="toPhoneNumber" className="block text-gray-700">To Phone Number</label>
              <input type="text" id="toPhoneNumber" placeholder="+18001112222" className="mt-1 p-2 border border-gray-300 rounded w-full" />
            </div>
            <div>
              <label htmlFor="messageType" className="block text-gray-700">Text Message Options</label>
              <select id="messageType" className="mt-1 p-2 border border-gray-300 rounded w-full">
                <option>Introductory Message</option>
                <option>Phrase of the Day</option>
              </select>
            </div>
            <div>
              <label htmlFor="subject" className="block text-gray-700">Subject of Message</label>
              <textarea id="subject" placeholder="Put test message subject here" className="mt-1 p-2 border border-gray-300 rounded w-full"></textarea>
            </div>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Send Text Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Twilio;