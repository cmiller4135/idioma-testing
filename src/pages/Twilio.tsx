import React, { useState, useEffect } from "react";
import axios from "axios";

interface Payload {
  fromPhoneNumber: string;
  toPhoneNumber: string;
  messageType: string;
  subject: string;
  selectedOption: string; // Now it's a single string value
}

interface AxiosResponse {
  success: boolean;
  error?: string;
  phoneNumbers?: { phoneNumber: string }[]; // Define the type for the phoneNumbers
}

function Twilio() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // Track multiple selected options
  const [selectedOption, setSelectedOption] = useState<string>(""); // The final option to be sent to backend (sms, whatsapp, or both)
  const [fromPhoneNumber, setFromPhoneNumber] = useState<string>("");
  const [toPhoneNumber, setToPhoneNumber] = useState<string>("");
  const [messageType, setMessageType] = useState<string>(
    "Introductory Message"
  );
  const [subject, setSubject] = useState<string>("");

  // Error states
  const [errors, setErrors] = useState<any>({
    fromPhoneNumber: "",
    toPhoneNumber: "",
    messageType: "",
    subject: "",
    selectedOption: "",
  });

  // Loading state
  const [loading, setLoading] = useState<boolean>(false);
  const [phoneNumbers, setPhoneNumbers] = useState<{ phoneNumber: string }[]>(
    []
  );

  // Fetch phone numbers associated with MessagingServiceSid
  useEffect(() => {
    const fetchPhoneNumbers = async () => {
      try {
        const response = await axios.get<AxiosResponse>(
          "https://idioma-ai-backend-9e283a1b7abf.herokuapp.com/get-phone-numbers"
        );

        if (response.data.success) {
          setPhoneNumbers(response.data.phoneNumbers || []);
        } else {
          alert("Failed to fetch phone numbers: " + response.data.error);
        }
      } catch (error) {
        alert("An error occurred while fetching phone numbers");
      }
    };

    fetchPhoneNumbers();
  }, []);

  // Handle checkbox change
  const handleCheckboxChange = (option: string) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((opt) => opt !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedOptions);

    // Set selectedOption to 'both' if both options are selected, otherwise to the respective option
    if (updatedOptions.includes("sms") && updatedOptions.includes("whatsapp")) {
      setSelectedOption("both");
    } else if (updatedOptions.includes("sms")) {
      setSelectedOption("sms");
    } else if (updatedOptions.includes("whatsapp")) {
      setSelectedOption("whatsapp");
    } else {
      setSelectedOption(""); // If no options are selected
    }
  };

  const handleSendMessage = async () => {
    // Validate inputs
    const newErrors: any = {
      fromPhoneNumber: fromPhoneNumber ? "" : "From phone number is required.",
      toPhoneNumber: toPhoneNumber ? "" : "To phone number is required.",
      messageType: messageType ? "" : "Message type is required.",
      subject: subject ? "" : "Subject is required.",
      selectedOption: selectedOption
        ? ""
        : "Please select at least one message type (SMS or WhatsApp).",
    };

    setErrors(newErrors);

    // If there's any error, don't proceed
    if (Object.values(newErrors).some((error) => error !== "")) return;

    // Start loading (sending message)
    setLoading(true);

    const payload: Payload = {
      fromPhoneNumber,
      toPhoneNumber,
      messageType,
      subject,
      selectedOption, // Send the final selected option (sms, whatsapp, or both)
    };

    try {
      const response = await axios.post<AxiosResponse>(
        "https://idioma-ai-backend-9e283a1b7abf.herokuapp.com/send-message", // Replace with your actual endpoint
        payload
      );

      if (response.data.success) {
        alert("Message sent successfully!");
      } else {
        alert("Error sending message: " + response.data.error);
      }
    } catch (error) {
      alert("An error occurred while sending the message");
    } finally {
      // Stop loading (done sending message)
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Twilio Messaging Setup - Sonu
          </h1>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="sms"
                className="form-checkbox"
                checked={selectedOptions.includes("sms")}
                onChange={() => handleCheckboxChange("sms")}
              />
              <label htmlFor="sms" className="text-gray-700">
                Send an SMS message
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="whatsapp"
                className="form-checkbox"
                checked={selectedOptions.includes("whatsapp")}
                onChange={() => handleCheckboxChange("whatsapp")}
              />
              <label htmlFor="whatsapp" className="text-gray-700">
                Send a WhatsApp Message
              </label>
            </div>
            {errors.selectedOption && (
              <p className="text-red-500 text-sm">{errors.selectedOption}</p>
            )}

            <div>
              <label htmlFor="fromPhoneNumber" className="block text-gray-700">
                From Phone Number
              </label>
              <select
                id="fromPhoneNumber"
                value={fromPhoneNumber}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setFromPhoneNumber(e.target.value)
                }
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Select a phone number</option>
                {phoneNumbers.map((number, index) => (
                  <option key={index} value={number.phoneNumber}>
                    {number.phoneNumber}
                  </option>
                ))}
              </select>
              {errors.fromPhoneNumber && (
                <p className="text-red-500 text-sm">{errors.fromPhoneNumber}</p>
              )}
            </div>

            <div>
              <label htmlFor="toPhoneNumber" className="block text-gray-700">
                To Phone Number
              </label>
              <input
                type="text"
                id="toPhoneNumber"
                value={toPhoneNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setToPhoneNumber(e.target.value)
                }
                placeholder="+18001112222"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {errors.toPhoneNumber && (
                <p className="text-red-500 text-sm">{errors.toPhoneNumber}</p>
              )}
            </div>

            <div>
              <label htmlFor="messageType" className="block text-gray-700">
                Text Message Options
              </label>
              <select
                id="messageType"
                value={messageType}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setMessageType(e.target.value)
                }
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              >
                <option>Introductory Message</option>
                <option>Phrase of the Day</option>
              </select>
              {errors.messageType && (
                <p className="text-red-500 text-sm">{errors.messageType}</p>
              )}
            </div>

            <div>
              <label htmlFor="subject" className="block text-gray-700">
                Subject of Message
              </label>
              <textarea
                id="subject"
                value={subject}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setSubject(e.target.value)
                }
                placeholder="Put test message subject here"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              ></textarea>
              {errors.subject && (
                <p className="text-red-500 text-sm">{errors.subject}</p>
              )}
            </div>

            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              disabled={loading} // Disable the button while sending
            >
              {loading ? "Sending..." : "Send Text Message"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Twilio;
