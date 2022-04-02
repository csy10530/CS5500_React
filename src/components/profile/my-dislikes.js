import Tuits from "../tuits";
import * as service from "../../services/dislikes-service";
import {useEffect, useState} from "react";

const MyDislikes = () => {
    const [dislikedTuits, setDislikedTuits] = useState([]);
    const findDislikedTuits = async () => {
        const tuits = await service.findAllTuitsDislikedByUser("me");
        setDislikedTuits(tuits);
    }
    useEffect(findDislikedTuits, []);

    return(
        <div>
            <Tuits tuits={dislikedTuits} refreshTuits={findDislikedTuits()}/>
        </div>
    )
}
export default MyDislikes;
