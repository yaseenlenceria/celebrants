import React, { useState } from 'react';
import { Mail, MapPin, Send, Loader2, CheckCircle, Instagram, Linkedin, Facebook, Phone, Clock, MessageSquare } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);

    // Simulate API call with 1 second delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Clear form after success
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    // Hide success message after 5 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };

  const faqs = [
    {
      question: "How quickly will I receive a response?",
      answer: "We aim to respond to all inquiries within 24 hours during business days. Urgent matters are typically addressed within a few hours."
    },
    {
      question: "What information should I include in my message?",
      answer: "Please include details about which service you're interested in, your location, and any specific requirements or questions you have. The more information you provide, the better we can assist you."
    },
    {
      question: "Do you offer consultation calls?",
      answer: "Yes! We offer free 30-minute consultation calls to discuss your needs and how we can help grow your celebrant business. Mention this in your message to schedule one."
    },
    {
      question: "Can I get a custom quote for my needs?",
      answer: "Absolutely! Every celebrant's business is unique. Contact us with your specific requirements, and we'll create a tailored package that fits your goals and budget."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-champagne-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 font-serif mb-6">
              Get in <span className="text-champagne-600">Touch</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Have questions about our services? Want to discuss how we can help grow your celebrant business? We'd love to hear from you.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-champagne-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-accent-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Contact Form & Info Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 font-serif mb-3">Send Us a Message</h2>
                <p className="text-slate-600">Fill out the form below and we'll get back to you as soon as possible.</p>
              </div>

              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-green-900">Message sent successfully!</h3>
                    <p className="text-sm text-green-700 mt-1">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-slate-300'
                    }`}
                    placeholder="John Smith"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-slate-300'
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors ${
                      errors.subject ? 'border-red-300 bg-red-50' : 'border-slate-300'
                    }`}
                    placeholder="Website Design Inquiry"
                  />
                  {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors resize-none ${
                      errors.message ? 'border-red-300 bg-red-50' : 'border-slate-300'
                    }`}
                    placeholder="Tell us about your needs..."
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-champagne-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-champagne-700 transition-colors shadow-lg shadow-brand-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 font-serif mb-3">Contact Information</h2>
                <p className="text-slate-600">Prefer to reach out directly? Here's how you can contact us.</p>
              </div>

              <div className="flex flex-col gap-6">
                {/* Email */}
                <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-champagne-200 transition-colors">
                  <div className="flex items-center justify-center w-12 h-12 bg-champagne-100 rounded-full flex-shrink-0">
                    <Mail className="h-6 w-6 text-champagne-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Email Us</h3>
                    <a href="mailto:hello@celebrantsuccess.com" className="text-champagne-600 hover:text-champagne-700 transition-colors">
                      hello@celebrantsuccess.com
                    </a>
                    <p className="text-sm text-slate-500 mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-champagne-200 transition-colors">
                  <div className="flex items-center justify-center w-12 h-12 bg-champagne-100 rounded-full flex-shrink-0">
                    <MapPin className="h-6 w-6 text-champagne-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Location</h3>
                    <p className="text-slate-600">London, United Kingdom</p>
                    <p className="text-sm text-slate-500 mt-1">Serving celebrants nationwide</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-champagne-200 transition-colors">
                  <div className="flex items-center justify-center w-12 h-12 bg-champagne-100 rounded-full flex-shrink-0">
                    <Clock className="h-6 w-6 text-champagne-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Business Hours</h3>
                    <p className="text-slate-600">Monday - Friday: 9am - 6pm</p>
                    <p className="text-sm text-slate-500 mt-1">Weekend emergency support available</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 p-6 bg-gradient-to-br from-champagne-50 to-accent-50 rounded-xl border border-champagne-100">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-champagne-600" />
                  Follow Us on Social Media
                </h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-sm hover:shadow-md hover:bg-champagne-50 transition-all group"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5 text-slate-600 group-hover:text-champagne-600 transition-colors" />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-sm hover:shadow-md hover:bg-champagne-50 transition-all group"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5 text-slate-600 group-hover:text-champagne-600 transition-colors" />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-sm hover:shadow-md hover:bg-champagne-50 transition-all group"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5 text-slate-600 group-hover:text-champagne-600 transition-colors" />
                  </a>
                </div>
                <p className="text-sm text-slate-600 mt-4">
                  Join our community for tips, inspiration, and updates on new features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base text-champagne-600 font-semibold tracking-wide uppercase mb-3">FAQ</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-serif">
              Frequently Asked Questions
            </h3>
            <p className="mt-4 text-lg text-slate-600">
              Quick answers to common questions about our services and support.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
                <h4 className="text-lg font-bold text-slate-900 mb-3">{faq.question}</h4>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-champagne-700 to-champagne-600">
        <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white font-serif mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-champagne-100 mb-8 leading-relaxed max-w-2xl mx-auto">
            Don't wait to take your celebrant business to the next level. Get in touch today and let's discuss how we can help you succeed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
