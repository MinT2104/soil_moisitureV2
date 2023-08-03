import Map, {Marker} from 'react-map-gl';
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import {MAPBOX_token} from '../../constant/constant'


import 'mapbox-gl/dist/mapbox-gl.css';
const MapPopup = () => {
  const {allProjects,setCurrentProject,loading, setLoading,setIsChoosePopup} = useContext(AppContext)
  const handlePopupDetail=(data)=>{
    setCurrentProject(data)
    setLoading(!loading)
    setIsChoosePopup(false)
  } 
  // const myMarker = document.getElementsByClassName("mapboxgl-marker")
  // myMarker[0].addEventListener('mouseover',()=>{
  //   console.log("ok")

  // })
  return ( 
      <Map
      initialViewState={{
        latitude: Number(allProjects[0]?.latitude) || 10.883170996178466,
        longitude: Number(allProjects[0]?.longitude) || 106.78364246424303,
        zoom: 14 ,
        type: "circle",
        paint: {
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            10,
            ['/', ['-', 2017, ['number', ['get', 'Constructi'], 2017]], 30],
            13,
            ['/', ['-', 2017, ['number', ['get', 'Constructi'], 2017]], 10]
          ],
          'circle-opacity': 0.8,
          'circle-color': 'rgb(171, 72, 33)'
        }

      }}
      style={{ height: 530}}
      mapStyle="mapbox://styles/mapbox/satellite-v9"
      mapboxAccessToken={MAPBOX_token}
    >
      {allProjects?.map((data, index)=>
      <div className='relative'>
          <Marker 
          key={index}
          onClick={()=>handlePopupDetail(data)}
          latitude={data.latitude} longitude={data.longitude} color="red" >
            </Marker>
      </div>
         )} 

     
      </Map>
     );
}
 
export default MapPopup
;