import {act, create} from "react-test-renderer";
import TuitStats from "../components/tuits/tuit-stats";

test('stats render correctly v1', () => {
    let stats = {
        likes: 1,
        dislikes: 1,
        replies: 1,
        retuits: 1
    }

    const dislikeTuit = () => {
        act(() => {
            stats.dislikes++;
            tuitStats.update(
                <TuitStats
                    tuit={{stats: stats}}
                    likeTuit={() => {}}
                    dislikeTuit={() => {}}
                />)
        })
    }


    let tuitStats
    act(() => {
        tuitStats = create(
            <TuitStats
                dislikeTuit={dislikeTuit}
                tuit={{stats: stats}}/>
        );
    })

    const root = tuitStats.root;
    const likesCount = root.findByProps({className: 'ttr-stats-likes'})
    const dislikesCount = root.findByProps({className: 'ttr-stats-dislikes'})
    const retuitsCount = root.findByProps({className: 'ttr-stats-retuits'})
    const repliesCount = root.findByProps({className: 'ttr-stats-replies'})
    const dislikeButton = root.findByProps({className: 'ttr-dislike-tuit-click'})

    let likesData = likesCount.children[0];
    let dislikesData = dislikesCount.children[0];
    const repliesData = repliesCount.children[0];
    const retuitsData = retuitsCount.children[0];

    expect(likesData).toBe('1');
    expect(repliesData).toBe('1');
    expect(retuitsData).toBe('1');
    expect(dislikesData).toBe('1');

    act(() => {dislikeButton.props.onClick()})
    dislikesData = dislikesCount.children[0];
    expect(dislikesData).toBe('2');
});
