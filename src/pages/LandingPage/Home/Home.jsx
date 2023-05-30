import Feature from '../../../components/LandingPage/components/Feature/Feature'
import Hero from '../../../components/LandingPage/components/Hero/Hero'
import Pricing from '../../../components/LandingPage/components/Pricing/Pricing'
import Navbar from '../../../components/LandingPage/components/Navbar/Navbar'
import Footer from '../../../components/LandingPage/components/Footer/Footer'

function Home() {
    return (
        <div>
            <Navbar />
            <Hero />
            <Feature />
            <Pricing />
            <Footer />
        </div>
    )
}

export default Home