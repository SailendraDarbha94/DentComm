"use client"

import { useState } from "react"

const Page = () => {

    const [clinic, setClinic] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)

    async function fetchAssociatedClinics() {
        console.log("have to fetch user linked clinics")
    }

    return (
        <div>
            clinic dashboard
        </div>
    )
}

export default Page