import { ADD_TO_CART } from "../Constraints/cartconstraint";
import axios from "axios";

export const addItemscart=(id,quantity)=>async(dispatch)=>{

   try {

    const {data}=await axios.get(`/api/products/find/${id}`);


    
   } catch (e) {

    
   }


}