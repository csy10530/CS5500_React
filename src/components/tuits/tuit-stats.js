import React, {useEffect, useState} from "react";
import {profile} from "../../services/security-service";
import * as likeService from "../../services/likes-service";
import * as dislikeService from "../../services/dislikes-service";

/**
 *
 * @param tuit tuit
 * @param likeTuit likeTuit function handles like tuit on click
 * @param dislikeTuit likeTuit function handles like tuit on click
 * @return {JSX.Element} <TuitStats/>
 * @constructor
 */
const TuitStats = ({tuit, likeTuit = () => {}, dislikeTuit = () => {}}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);

    const init = async () => {
        const user = await profile();
        if (user) {
            const isLiked = await likeService.findUserLikesTuit("me", tuit._id);
            setIsLiked(isLiked.like);
            const isDisliked = await dislikeService.findUserDislikesTuit("me", tuit._id);
            setIsDisliked(isDisliked.dislike);
        }
    }

    useEffect(init, [tuit.stats]);

    return (
        <div className="row mt-2">
            <div className="col">
                <i className="far fa-message me-1"/>
                {
                    tuit.stats &&
                    <span className="ttr-stats-replies">{tuit.stats.replies}</span>
                }
            </div>
            <div className="col">
                <i className="far fa-retweet me-1"/>
                {
                    tuit.stats &&
                    <span className="ttr-stats-retuits">{tuit.stats.retuits}</span>
                }
            </div>
            <div className="col">
                <span className="ttr-like-tuit-click" onClick={() => likeTuit(tuit)}>
                    {
                        tuit.stats && isLiked === true &&
                        <i className="fa-solid fa-thumbs-up me-1" style={{color: 'red'}}/>
                    }
                    {
                        tuit.stats && isLiked === false &&
                        <i className="fa-solid fa-thumbs-up me-1"/>
                    }
                    {tuit.stats &&
                        <span className="ttr-stats-likes">{tuit.stats.likes}</span>
                    }
                </span>
            </div>
            <div className="col">
                <span className="ttr-dislike-tuit-click" onClick={() => dislikeTuit(tuit)}>
                    {
                        tuit.stats && isDisliked === true &&
                        <i className="fa-solid fa-thumbs-down me-1" style={{color: 'orange'}}/>
                    }
                    {
                        tuit.stats && isDisliked === false &&
                        <i className="fa-solid fa-thumbs-down me-1"/>
                    }
                    {
                        tuit.stats &&
                        <span className="ttr-stats-dislikes">{tuit.stats.dislikes}</span>
                    }

                </span>
            </div>
            <div className="col">
                <i className="far fa-inbox-out"/>
            </div>
        </div>
    );
}
export default TuitStats;
