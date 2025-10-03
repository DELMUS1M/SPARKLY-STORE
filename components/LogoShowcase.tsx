import React from 'react';
import LogoOption1 from './Logo';
import LogoOption2 from './logos/LogoOption2';
import LogoOption3 from './logos/LogoOption3';
import LogoOption4 from './logos/LogoOption4';
import LogoOption5 from './logos/LogoOption5';

const logos = [
  { Component: LogoOption1, name: 'Option 1: Modern Drop' },
  { Component: LogoOption2, name: 'Option 2: Abstract Wave' },
  { Component: LogoOption3, name: 'Option 3: Minimalist Sparkle' },
  { Component: LogoOption4, name: 'Option 4: Classic Emblem' },
  { Component: LogoOption5, name: 'Option 5: Eco Clean' },
];

const LogoShowcase: React.FC = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-800 text-center mb-2">
          Choose Your New Logo
        </h2>
        <p className="text-center text-slate-500 mb-8">
          Here are five professional logo designs for Sparkly Detergents. Let us know which one you'd like to use!
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {logos.map((logo, index) => (
            <div key={index} className="border rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-24 h-24 text-blue-600 mb-4">
                <logo.Component className="w-full h-full" />
              </div>
              <h3 className="font-semibold text-slate-700">{logo.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoShowcase;