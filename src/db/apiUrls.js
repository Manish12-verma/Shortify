import { UAParser } from "ua-parser-js";
import supabase, { supabaseUrl } from "./supabase";

export async function getUrls(user_id) {
    const { data, error } = await supabase.from("urls").select("*").eq("user_id", user_id);

    if (error) {
        console.log(error.message);
        throw new Error("Unable to load URLs");
    }
    return data;
}

export async function deleteUrl(id) {
    const { data, error } = await supabase.from("urls").delete().eq("id", id);

    if (error) {
        console.log(error.message);
        throw new Error("Unable to delete URLs");
    }
    return data;
}

export async function createUrl({ title, longUrl, customUrl, user_id }, qrcode) {
    // Upload QR code 
    const short_url = Math.random().toString(36).substring(2, 6);
    const fileName = `qr-${short_url}`;
    const { error: storageError } = await supabase.storage.from("qrs").upload(fileName, qrcode);

    if (storageError) throw new Error(storageError.message);

    const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

    // Insert URL data into the database
    const { data, error } = await supabase.from("urls").insert([
        {
            title,
            original_url: longUrl,
            custom_url: customUrl || null,  // Changed from customUrl to custom_url to match database schema
            user_id,
            short_url,
            qr,
        }
    ]).select(); 

    if (error) {
        console.log(error.message);
        throw new Error("Error creating short URL");
    }
    return data;
}

export async function getLongUrl(id) {
    const { data, error } = await supabase
     .from("urls")
     .select("id,original_url")
     .or(`short_url.eq.${id},custom_url.eq.${id}`)
     .single();

    if (error) {
        console.log(error.message);
        throw new Error("Error in fetching short Link");
    }
    return data;
}

const parser = new UAParser();

export const storeClicks = async({id,originalUrl})=>{
    try {
        const res = parser.getResult();
        const device = res.type || "desktop"; 

        const response = await fetch("https://ipapi.co/json");
        const{city,country_name:country} =  await response.json();

        await supabase.from("clicks").insert({
            url_id:id,
            city:city,
            country:country,
            device:device
        });
        window.location.href = originalUrl;
    } catch (error) {
       console.log("Error recording clicks:",error) ;  
    }
}