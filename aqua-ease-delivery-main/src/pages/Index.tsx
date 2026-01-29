
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        
        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-b from-white to-aqua-50/50">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready for Effortless Water Delivery?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 md:mb-10">
                Join thousands of satisfied apartment residents who enjoy hassle-free water delivery with AquaEase.
              </p>
              <a 
                href="/auth?register=true" 
                className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium bg-aqua-500 text-white hover:bg-aqua-600 focus:outline-none focus:ring-2 focus:ring-aqua-500 focus:ring-offset-2 transition-all duration-300"
              >
                Get Started Today
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
