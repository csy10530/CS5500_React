import {act, create} from 'react-test-renderer';
import TuitStats from "../components/tuits/tuit-stats";

test('stats render correctly', () => {
    let stats = {
        likes: 1,
        dislikes: 1,
        replies: 1,
        retuits: 1
    };

    const likeTuit = () => {
        act(() => {
            stats.likes++;
            tuitStats.update(
                <TuitStats
                    tuit={{stats: stats}}
                    likeTuit={() => {}}
                    dislikeTuit={() => {}}
                />)
        })
    };

    const dislikeTuit = () => {
        act(() => {
            stats.dislikes++;
            tuitStats.update(
                <TuitStats
                    tuit={{stats: stats}}
                    likeTuit={() => {}}
                    dislikeTuit={() => {}}
                />
            )
        })
    };

    let tuitStats;
    act(() => {
        tuitStats = create(
            <TuitStats
                likeTuit={likeTuit}
                dislikeTuit={dislikeTuit}
                tuit={{stats: stats}}/>
        );
    });

    const root = tuitStats.root;
    const likesCount = root.findByProps({className: 'ttr-stats-likes'});
    const dislikesCount = root.findByProps({className: 'ttr-stats-dislikes'});
    const retuitsCount = root.findByProps({className: 'ttr-stats-retuits'});
    const repliesCount = root.findByProps({className: 'ttr-stats-replies'});
    const likeButton = root.findByProps({className: 'ttr-like-tuit-click'});
    const dislikeButton = root.findByProps({className: 'ttr-dislike-tuit-click'});

    let likesText = likesCount.children[0];
    let dislikesText = dislikesCount.children[0];
    const repliesText = repliesCount.children[0];
    const retuitsText = retuitsCount.children[0];

    expect(likesText).toBe('1');
    expect(repliesText).toBe('1');
    expect(retuitsText).toBe('1');
    expect(dislikesText).toBe('1');

    act(() => {likeButton.props.onClick()});
    likesText = likesCount.children[0];
    expect(likesText).toBe('2');

    act(() => {dislikeButton.props.onClick()});
    dislikesText = dislikesCount.children[0];
    expect(dislikesText).toBe('2');
});

