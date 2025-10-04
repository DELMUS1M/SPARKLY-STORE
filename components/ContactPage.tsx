import React from 'react';

const ContactPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4 lg:p-8">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-8 md:p-12"> 
                    <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-6 text-center">Get In Touch</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300 text-center max-w-3xl mx-auto mb-10">
                        We'd love to hear from you! Whether you have a question about our products, need assistance with an order, or just want to share your feedback, our team is ready to help.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Contact Info */}
                        <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg border dark:border-slate-600">
                            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-4">Contact Information</h2>
                            <div className="space-y-4 text-slate-600 dark:text-slate-300">
                                <p><strong>Address:</strong> 1-40500 Nyamira Kenya</p>
                                <p><strong>Phone:</strong> <a href="tel:0111473017" className="text-blue-600 dark:text-blue-400 hover:underline">0111473017</a></p>
                                <p><strong>Email:</strong> <a href="mailto:ogoradelmus1@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">ogoradelmus1@gmail.com</a></p>
                                <p><strong>Hours:</strong> 24/7</p>
                            </div>
                        </div>

                        {/* Contact Form Placeholder */}
                        <div>
                             <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-4">Send Us a Message</h2>
                             <form className="space-y-4">
                                 <div>
                                     <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
                                     <input type="text" id="name" className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Your Name" />
                                 </div>
                                 <div>
                                     <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                                     <input type="email" id="email" className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="your.email@example.com" />
                                 </div>
                                  <div>
                                     <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                                     <textarea id="message" rows={4} className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Your message..."></textarea>
                                 </div>
                                 <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">Submit</button>
                             </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;