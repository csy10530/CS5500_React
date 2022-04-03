import {act, create} from "react-test-renderer"
import tuits from "./react-test-renderer/tuits/tuits.json"
import Tuits from "./react-test-renderer/tuits/tuits";

test('tuits render on dislike screen', () => {
    let tuitsRender
    act(() => {
        tuitsRender = create(
            <Tuits
                tuits={tuits}/>
        )
    })
    const root = tuitsRender.root
    const ttrTuits = root.findAllByProps({className: 'ttr-tuit'})
    expect(ttrTuits.length).toBe(tuits.length)
    ttrTuits.forEach((ttrTuit, ndx) => {
        expect(ttrTuit.props.children).toBe(tuits[ndx].tuit)
    })
})
