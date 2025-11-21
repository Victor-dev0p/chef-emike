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
        link="https://www.instagram.com/_chefeukay?igsh=cGY1dTE3eXo2bWQy&utm_source=qr"
      />

      {/* TIKTOK */}
      <SocialHandles
        title="TikTok"
        handle="@ChefEmike"
        subtitle="Watch behind the scenes"
        videoSrc="/showcase.mp4"
        images={[
          "/Chef.jpg",
          "/pizza.jpg",
          "/Dessert.jpg",
          "/soup.jpg",
        ]}
        link="https://www.tiktok.com/@_chefeukay?_r=1&_t=ZS-91aYyLYZH5c"
      />

      {/* FACEBOOK */}
      <SocialHandles
        title="Facebook"
        handle="Chef Emike"
        subtitle="Join the community!"
        videoSrc="/fb/fbv.mp4"
        images={[
          "/Chef.jpg",
          "/pizza.jpg",
          "/Dessert.jpg",
          "/soup.jpg",
        ]}
        link="https://www.facebook.com/share/1FcowsRq6s/?mibextid=wwXIfr"
      />

      <ContactForm />
      <Footer />
    </>
  )
}