import { Helmet } from 'react-helmet';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Home/Hero';
import Features from '../Components/Home/Features';
import Showcase from '../Components/Home/Showcase';
import CarBrandSlider from '../Components/Home/CarBrandSlider';
import CarPromotions from '../Components/Home/CarPromotions';
import Avis from '../Components/Home/Avis';
import CallToAction from '../Components/Home/CallToAction';
import Footer from '../Components/Footer';



const Home = ({ voitures, garage }) => {

    return (
        <>
            <Helmet>
                <title>Page d'accueil</title>
            </Helmet>
            <Navbar garage={garage} />
            <Hero />
            <Features />
            <Showcase />
            <CarBrandSlider />
            <CarPromotions voitures={voitures} />
            <Avis />
            <CallToAction />
            <Footer garage={garage} />
        </>
    );
};

export default Home;
