"use client";
import { supabase } from "@/lib/supabase";
import ToastContext from "@/lib/toastContext";

import {
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
  divider,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const PostJob = ({ clinicId, address, hider }: any) => {
  const [qualification, setQualification] = useState<string>("");
  const [shift, setShift] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [salary, setSalary] = useState<string>("");
  const [type, setType] = useState<string>("");
  //const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  const router = useRouter();
  const {toast} = useContext(ToastContext);
  
  const createJob = async () => {
    if(!title){
      toast({
        message: "Please fill the form",
        type: "error"
      })
      return
    }
    try {
      const { data, error } = await supabase
        .from("jobs")
        .insert([
          {
            qualification,
            timings: shift,
            description,
            remarks,
            salary,
            location: address,
            title,
            type,
            posted_by: clinicId,
          },
        ])
        .select();

      if (data) {
        toast({
          message: "Job Posted Successfully",
          type: "success"
        })
        console.log(data);
        router.push('/home')
        hider();
      }
    } catch (err) {
      toast({
        message: "An error occured! Please try again later",
        type: "error"
      })
      console.error(err);
      hider();
    }
  };

  return (
    <div className="flex flex-wrap w-full">
      <div className="flex flex-col w-2/3 items-center mx-auto">
        <Input
          className="w-80 my-2"
          name="title"
          value={title}
          type="text"
          label="Job Title"
          placeholder=""
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          className="w-80 my-2"
          name="qualification"
          value={qualification}
          type="text"
          label="Qualification"
          placeholder=""
          onChange={(e) => setQualification(e.target.value)}
        />
        <Input
          className="w-80 my-2"
          name="shift"
          value={shift}
          type="text"
          label="Shift"
          placeholder=""
          onChange={(e) => setShift(e.target.value)}
        />
        <Input
          className="w-80 my-2"
          name="description"
          value={description}
          type="text"
          label="Description"
          placeholder=""
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          className="w-80 my-2"
          name="remarks"
          value={remarks}
          type="text"
          label="Additional Remarks"
          placeholder=""
          onChange={(e) => setRemarks(e.target.value)}
        />
        <Select
          onChange={(e) => setType(e.target.value)}
          label="Job Type"
          placeholder=""
          className="w-80 my-2"
        >
          <SelectItem key={"PART_TIME"}>Part Time</SelectItem>
          <SelectItem key={"FULL_TIME"}>Full Time</SelectItem>
          <SelectItem key={"CONTRACT"}>Contract</SelectItem>
        </Select>
        <Input
          className="w-80 my-2"
          name="salary"
          value={salary}
          type="text"
          label="Salary"
          placeholder=""
          onChange={(e) => setSalary(e.target.value)}
        />
        {/* <Select
          label=""
          placeholder="Select the clinic"
          className="max-w-xs"
          onClick={fetchUserClinics}
        >
          {clinics &&
            clinics.map((clinic: any) => (
              <SelectItem
                key={clinic.clinic_id}
                aria-label="select item"
                value={clinic.address}
                onClick={() => {
                  setLocation(clinic.address), setTitle(clinic.name);
                }}
              >
                {clinic.name}
              </SelectItem>
            ))}
        </Select> */}
        {/* <Input
          //disabled
          className="w-80 my-2"
          name="address"
          value={location}
          type="text"
          label=""
          placeholder=""
          onChange={(e) => setLocation(e.target.value)}
        />
        */}
      </div>
      <div className="w-full text-center max-h-fit">
        <Button
          color="secondary"
          onPress={createJob}
          variant="flat"
          className="mx-auto mb-2"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default PostJob;
