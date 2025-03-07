import { Link } from "react-router-dom";
import {motion} from "framer-motion";
import { useState, useEffect } from "react";
import axios from 'axios';
import PetsMarquee from "../components/veterinary/petsMarquee";
import VetServices from "../components/veterinary/vetServiceCards";
import VetTimeTable from "../components/veterinary/vetTimeTable";
import banner01 from "@/assets/images/veterinary/banner01.png";
import banner02 from "@/assets/images/veterinary/banner02.png";
import banner03 from "@/assets/images/veterinary/banner03.png";
import backgroundImage from "@/assets/images/veterinary/8.jpg";



  const images = [
    banner01,
    banner02,
    banner03
  ];
  
  const VeterinaryPage = () => {
    const [treatedAnimals,setTreatedAnimals] = useState([]);
    const [clinicsServices,setClinicsServices] = useState([]);
    const [mainImage,setMainImage] = useState([]);
    const [result, setResult] = useState({});


    useEffect(()=>{
        const url = location.href
        const urlParams = {}

        if(url.includes("?")){
          url.split("?")[1]?.split("&").forEach((item)=>{
            const [key, value] = item.split("=");
            urlParams[key] = decodeURIComponent(value);
          })}
          
          const fetchData = async() => {
            try{
                const clinicsData =  await axios.get(`https://vet-appt-house-backend.onrender.com/vetClinics/${urlParams['clinicId']}`)
                const treatedAnimalsData =  await axios.get(`https://vet-appt-house-backend.onrender.com/treatedAnimals`)
                const servicesData =  await axios.get(`https://vet-appt-house-backend.onrender.com/services`)
/*                 const mainImagesData =  await axios.get(`http://localhost:3000/mainImages`) */

                setTreatedAnimals(treatedAnimalsData.data)
                setClinicsServices(servicesData.data)
                
                /* setMainImage(mainImagesData.data[clinicsData.data.imageUrl].url) */
                setMainImage('https://raw.githubusercontent.com/cyberseris/2025_images/refs/heads/main/react_project/7.jpg')
                setResult(clinicsData.data)

            }catch(err){
              console.log("Error: ", err)
            }
          }
          fetchData();
      },[])

    const [index, setIndex] = useState(0);
  
    useEffect(()=>{
      const interval = setInterval(()=>{
        setIndex((preIndex)=>(preIndex+1) % images.length);
      },2000);
      return ()=>clearInterval(interval);
    },[])

    return result && result.name && (<>
      <section className="veterinaryHeader position-relative" style={{backgroundImage: `url(${mainImage?mainImage:backgroundImage})`, opacity:'0.8'}}>
        <div className="container">
          <div className="bubble position-absolute bottom-138">
            <img src="../src/assets/images/veterinary/bubble.png" className="bubbleJpg" alt="bubble.png" />
            <div className="bannerJpg">
                <motion.img 
                  key={index}
                  src={images[index]}
                  alt={`Slide ${index+1}`}
                  className="image"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 1 }}
                />
            </div>
            <div className="vetBannerTitle d-flex flex-column z-3">
              <h5 className="Kosugi-Maru fz-24 lh-15 mb-2">{result.name}</h5>
              <span className="mb-3 h-116">
                <h3 className="Kosugi-Maru fz-48 lh-12">健康依靠</h3>
                <h3 className="Kosugi-Maru fz-48 lh-12">給毛孩最好的</h3>
              </span>
              <span className="mb-3 h-20">
                <h6 className="roboto fz-16 lh-12">專業關懷，您最信賴的選擇</h6>
              </span>
              <Link to="/" className="btn btn-m btn-primary w-135">
                  立即預約
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="vetService bg-secondary">
        <div className="container">
          <div className="section-title mb-5">
            <h3>診療服務</h3>
          </div>
          <VetServices result={result} treatedAnimals={treatedAnimals} clinicsServices={clinicsServices} />
        </div>
      </section>
      <section className="veterinaryTime">
        <div className="section03-bg">
          <img src="./src/assets/images/veterinary/section-03-bg.png" className="w-100 h-100" alt="section-03-bg.png" />
        </div>
        <div className="container">
          <div className="section-title mb-5">
            <h3>診療時間</h3>
          </div>
          <VetTimeTable result={result} />
        </div>
      </section>
      <section className="petsMarquee">
        <div className="container gap-4">
          <PetsMarquee />
        </div>
      </section>

    </>);
};

export default VeterinaryPage;