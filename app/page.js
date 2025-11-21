import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Gallery from '@/components/Gallery'
import About from '@/components/About'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import SocialHandles from '@/components/SocialHandles'
import ContactForm from '@/components/Contact'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'

export default function Home() {
  return (
    <>
      <Navigation />
      <FloatingButtons/>
      <Hero />
      <About />
      <Gallery />
      <Services />
      <Testimonials />

      {/* INSTAGRAM */}
      <SocialHandles
        title="Instagram"
        handle="@ChefEmike"
        subtitle="Follow us for more updates!"
        videoSrc="/pizza.mp4"
        images={[
          "/Chef.jpg",
          "/pizza.jpg",
          "/Dessert.jpg",
          "/soup.jpg",
        ]}
        link="https://instagram.com/chefemike"
      />

      {/* TIKTOK */}
      <SocialHandles
        title="TikTok"
        handle="@ChefEmike"
        subtitle="Watch behind the scenes"
        videoSrc="/pizza.mp4"
        images={[
          "/Chef.jpg",
          "/pizza.jpg",
          "/Dessert.jpg",
          "/soup.jpg",
        ]}
        link="https://tiktok.com/@chefemike"
      />

      {/* FACEBOOK */}
      <SocialHandles
        title="Facebook"
        handle="Chef Emike"
        subtitle="Join the community!"
        videoSrc="/pizza.mp4"
        images={[
          "/Chef.jpg",
          "/pizza.jpg",
          "/Dessert.jpg",
          "/soup.jpg",
        ]}
        link="https://facebook.com/chefemike"
      />

      <ContactForm />
      <Footer />
    </>
  )
}