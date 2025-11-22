// components/Services.jsx
'use client';

export default function Services() {
  const services = [
    {
      id: 1,
      icon: '🍽️',
      title: 'Bespoke Celebrations',
      description: 'Customize your special moments with tailored menus for weddings, birthdays, anniversaries, and all your memorable gatherings.'
    },
    {
      id: 2,
      icon: '📦',
      title: 'Meal Preparation',
      description: 'Custom meal prep services for busy professionals, ensuring healthy and delicious meals throughout your week.'
    },
    {
      id: 3,
      icon: '🎬',
      title: 'Culinary Consulting',
      description: 'Expert guidance for restaurants, hotels, and food businesses looking to elevate their culinary offerings.'
    }
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-900 to-orange-500 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-xl text-amber-800">Comprehensive culinary solutions for every occasion</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group p-8 bg-gradient-to-br from-orange-50 to-white border-2 border-orange-100 rounded-2xl hover:border-orange-500 hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-amber-900 mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-amber-800 leading-relaxed">
                {service.description}
              </p>

              {/* Hover accent */}
              <div className="mt-6 w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}