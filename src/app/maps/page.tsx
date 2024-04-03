"use client";
import Marker from "@/components/Marker";
import { supabase } from "@/lib/supabase";
import { getLatLngObj } from "@/lib/utils";
import { Spinner, Tooltip } from "@nextui-org/react";
import GoogleMap from "google-maps-react-markers";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Page = () => {
  const mapRef = useRef<any>(null);

  const [mapReady, setMapReady] = useState<boolean>(false);

  const onGoogleApiLoaded = ({ map, maps }: any) => {
    mapRef.current = map;
    setMapReady(true);
  };

  const router = useRouter()
  const filterClinicsAndNavigate = async (params:string) => {
    let {data:clinics, error} = await supabase.from("clinics").select().eq("name", params)
    if(clinics){
      console.log(clinics[0])
      router.push(`/clinics/${clinics[0].id}`)
    }
  }

  const onMarkerClick = (e: any, { markerId, lat, lng }: any) => {
    console.log("These coordinates ->", lat, lng);



    // inside the map instance you can call any google maps method
    mapRef.current.setCenter({ lat, lng });
    // ref. https://developers.google.com/maps/documentation/javascript/reference?hl=it

    filterClinicsAndNavigate(markerId)
  };

  const mapOptions = {
    zoom: 14,
    mapId: "c0182cb60ad4699b",
    draggable: true,
  };

  const coordinates = [
    {
      lat: 12.8564,
      lng: 77.5888,
      name: "Gottigere",
    },
    {
      lat: 12.9572892,
      lng: 77.5678734,
      name: "Karnataka State Dental Council",
    },
    {
      lat: 12.8757,
      lng: 77.5958,
      name: "Meenakshi Mall",
    },
    {
      lat: 12.8288,
      lng: 77.5878,
      name: "AMC",
    },
  ];
  const [clinics, setClinics] = useState<any>(null);
  const fetchClinics = async () => {
    try {
      const { data } = await supabase.from("clinics").select("*");
      if (data) {
        console.log(data);
        setClinics(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchClinics();
  }, []);

  return (
    <div className="rounded-md px-2 max-h-screen">
      {/* {mapReady && <div>Map is ready. See for logs in developer console.</div>} */}
      <GoogleMap
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        defaultCenter={{ lat: 12.8564, lng: 77.5888 }}
        defaultZoom={5}
        options={mapOptions}
        mapMinHeight="90vh"
        onGoogleApiLoaded={onGoogleApiLoaded}
        onChange={(map) => console.log("Map moved", map)}
      >
        {clinics &&
          clinics.map((item:any, index:any) => (
            <Marker
              className="w-6 h-6 bg-black rounded-md hover:cursor-pointer"
              key={index}
              lat={item?.coordinates?.lat}
              lng={item?.coordinates?.lng}
              markerId={item?.name}
              onClick={onMarkerClick} // you need to manage this prop on your Marker component!
              draggable={false}
              // onDragStart={(e, { latLng }) => {}}
              // onDrag={(e, { latLng }) => {}}
              // onDragEnd={(e, { latLng }) => {}}
            />
          ))}
      </GoogleMap>
    </div>
  );
};

export default Page;
