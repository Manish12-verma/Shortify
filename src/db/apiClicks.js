import supabase from "./supabase";

export async function getClicksForUrls(urlIds) {
    const { data, error } = await supabase.from("clicks").select("*").in("url_id", urlIds);

    if (error) {
        console.log(error.message);
        throw new error("Unable to load clicks");
    }
    return data;
}