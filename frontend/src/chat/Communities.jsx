import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectChannelsData,selectChannelFollowers } from "../data/chatSelectors";
export default function Communities(){
    const channels=useSelector(selectChannelsData);
    const followers=useSelector(selectChannelFollowers);
    const dispatch = useDispatch();
    
}