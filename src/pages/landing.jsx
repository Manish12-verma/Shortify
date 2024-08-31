import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  
const [longUrl,setLongUrl] = useState();

const navigate = useNavigate();

const handleShorten=(e)=>{
  e.preventDefault();
  if(longUrl)   navigate(`/auth?createNew=${longUrl}`); 
}

return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-2xl sm:text-3xl lg:text-5xl text-white text-center font-extrabold">
        Shorten links and generate QR codes <br /> simple, sleek, and all-in-one
        🚀
      </h2>
      <form onSubmit={handleShorten} className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2">
        <Input
          type="url"
          value = {longUrl}
          placeholder="Paste your looooooong URL"
          onChange={(e)=>setLongUrl(e.target.value)}
          className="h-full flex-1 py-4 px-4"
        />
        <Button className="h-full" type="Submit" variant="destructive">
          Shorten!
        </Button>
      </form>
      <img
        src="./banner.png"
        alt="no banner found"
        className="w-full my-11 md:px-11"
      />

      <Accordion type="multiple" collapsible className="w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger> What is a URL shortener?</AccordionTrigger>
          <AccordionContent>
          A URL shortener is a tool that converts long URLs into shorter, more manageable links. This is useful for sharing links on social media, in emails, or anywhere space is limited.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger> How does your URL shortener work?</AccordionTrigger>
          <AccordionContent>
          Our URL shortener takes your long URL and creates a shorter version that redirects to the original URL. You can also generate QR codes for the shortened URLs for easy sharing.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger> Can I track the number of clicks on my shortened URLs?</AccordionTrigger>
          <AccordionContent>
          Yes, our URL shortener provides analytics that allows you to track the number of clicks, geographic location of visitors, and other useful metrics.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Is there a limit to the number of URLs I can shorten?</AccordionTrigger>
          <AccordionContent>
          There is no limit to the number of URLs you can shorten. Feel free to shorten as many links as you need!
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger> How do I create a QR code for my shortened URL?</AccordionTrigger>
          <AccordionContent>
          When you shorten a URL, you have the option to generate a QR code. Simply click the QR code option, and it will be created automatically for you to download or share.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div> 
  );
};

export default LandingPage;
