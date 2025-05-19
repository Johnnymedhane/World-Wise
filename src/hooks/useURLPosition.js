import { useSearchParams } from "react-router-dom";


export function useURLPosition() {
   
     const [searchParams] = useSearchParams();
     const lat = searchParams.get("lat") || 0;
    const lng = searchParams.get("lng") || 0;
    



  return [lat, lng];
}