"use client"
import Marker from "@/components/Marker";
import { Spinner } from "@nextui-org/react";
import GoogleMap from 'google-maps-react-markers'
import React,{ useRef, useState } from "react";

const Page = () => {
    const mapRef = useRef<any>(null)
    const [mapReady, setMapReady] = useState<boolean>(false)


    const onGoogleApiLoaded = ({ map, maps }:any) => {
        mapRef.current = map
        setMapReady(true)
      }

    const onMarkerClick = (e:any, { markerId, lat, lng }:any) => {
    console.log('This is ->', markerId)

    // inside the map instance you can call any google maps method
    mapRef.current.setCenter({ lat, lng })
    // ref. https://developers.google.com/maps/documentation/javascript/reference?hl=it
    }

    const mapOptions = {
        zoom: 14,
        mapId: "c0182cb60ad4699b",
        draggable: true,
    };

    // const isLoaded =  false
    // if(!isLoaded){
    //     return (
    //         <div className="min-h-80 flex justify-center items-center">
    //             <Spinner size="lg" />
    //         </div>
    //     )
    // }

const coordinates = [{
    lat: 12.8564,
    lng: 77.5888,
    name: "Gottigere"
},{
    lat: 12.8757,
    lng: 77.5958,
    name: "Meenakshi Mall"
},{
    lat: 12.8288,
    lng: 77.5878,
    name: "AMC"
}]

    return (
    <>
      {/* {mapReady && <div>Map is ready. See for logs in developer console.</div>} */}
      <GoogleMap
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        defaultCenter={{ lat: 12.8564, lng: 77.5888 }}
        defaultZoom={5}
        options={mapOptions}
        mapMinHeight="90vh"
        onGoogleApiLoaded={onGoogleApiLoaded}
        onChange={(map) => console.log('Map moved', map)}
      >
        {coordinates.map(({ lat, lng, name }, index) => (
          <Marker
            className="w-6 h-6 bg-slate-200 rounded-md"
            key={index}
            lat={lat}
            lng={lng}
            markerId={name}
            onClick={onMarkerClick} // you need to manage this prop on your Marker component!
            draggable={false}
            // onDragStart={(e, { latLng }) => {}}
            // onDrag={(e, { latLng }) => {}}
            // onDragEnd={(e, { latLng }) => {}}
          />
        ))}
      </GoogleMap>
    </>
    )
}

export default Page