import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

const Listing= ()=>{

    SwiperCore.use([Navigation]);
    const params= useParams();
    const [listing, setListing]= useState(null);
    const [loading, setLoading]= useState(true);
    const [error, setError]= useState(false);


    useEffect(()=>{

        const fetchListing= async ()=>{
            try{
                const response= await fetch(`/api/listing/getListing/${params.id}`);
                const jsonData= await response.json();
                if(jsonData.success== false){
                    console.log(jsonData.message);
                    setError(jsonData.message);
                    setLoading(false);
                    return;
                }
                setListing(jsonData);
                setLoading(false);
                setError(null);

            }catch(e){
                setError(e.message);
                setLoading(false);
            }
        }
        fetchListing();
    
      }, []);

    return (
          <main>
            {loading && <p className="text-2xl my-7 
            text-center font-bold">loading...</p>}
            {error && <p className="text-2xl my-7 
            text-center font-bold">something went wrong</p>}
            {listing && !loading && !error && (
                <div>
                    <Swiper navigation>
                        {
                            listing.imagesUrls.map((url)=>(
                                <SwiperSlide key={url}>
                                    <div className="h-[450px]" 
                                    style={{background: `url(${url}) center no-repeat`,
                                     backgroundSize: 'cover'}}>                                        
                                    </div>
                                </SwiperSlide>
                            ))
                        }                    
                    </Swiper>
                </div>
            )}
            </main>
      
);

}


export default Listing;