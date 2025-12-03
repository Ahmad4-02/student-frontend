export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">EduCRM</h1>
        <div className="space-x-4">
          <a href="#services" className="text-gray-700">Services</a>
          <a href="#programs" className="text-gray-700">Programs</a>
          <a href="#contact" className="text-gray-700">Contact</a>
          <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded">
            Login
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Study Abroad With Confidence
        </h2>
        <p className="text-lg mb-6">
          We help students apply to the best universities worldwide
        </p>
        <a
          href="/login"
          className="bg-white text-blue-600 px-6 py-3 rounded font-semibold"
        >
          Get Started
        </a>
      </section>

      {/* Services */}
      <section id="services" className="py-16 px-6 max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-center mb-10">Our Services</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow text-center">
            <h4 className="font-bold mb-2">University Admission</h4>
            <p className="text-gray-600">We help you apply to top universities.</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <h4 className="font-bold mb-2">Visa Assistance</h4>
            <p className="text-gray-600">Full visa support for students.</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <h4 className="font-bold mb-2">Consulting</h4>
            <p className="text-gray-600">Professional educational consulting.</p>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="bg-white py-16 px-6">
        <h3 className="text-2xl font-bold text-center mb-10">Popular Programs</h3>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="border p-4 rounded text-center">Bachelor Programs</div>
          <div className="border p-4 rounded text-center">Master Programs</div>
          <div className="border p-4 rounded text-center">PhD Programs</div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 text-white py-10 text-center">
        <p className="mb-4">© 2025 EduCRM. All rights reserved.</p>
        <div className="space-x-4">
          <a href="#" className="underline">Facebook</a>
          <a href="#" className="underline">Instagram</a>
          <a href="#" className="underline">WhatsApp</a>
        </div>
      </footer>
    </div>
  );
}
