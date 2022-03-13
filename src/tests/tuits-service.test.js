import {createUser, deleteUsersByUsername} from "../services/users-service";
import {createTuit, deleteTuit, deleteTuitsByUser, findAllTuits, findTuitById} from "../services/tuits-service";

describe('can create tuit with REST API', () => {
    // sample user to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const testTuit = {
        tuit: 'Test Tuit0',
        postedBy: ''
    };

    // setup test before running test
    beforeAll(async () => {
        await deleteUsersByUsername(ripley.username);
        const user = await createUser(ripley);
        testTuit.postedBy = user._id;
        return deleteTuitsByUser(testTuit.postedBy);
    });

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deleteTuitsByUser(testTuit.postedBy);
        return deleteUsersByUsername(ripley.username);
    });

    test('can create tuit with REST API', async () => {
        const newTuit = await createTuit(testTuit.postedBy, testTuit);
        expect(newTuit.tuit).toEqual(testTuit.tuit);
    });
});

describe('can delete tuit wtih REST API', () => {
    // sample user to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const testTuit = {
        tuit: 'Test Tuit1',
        postedBy: ''
    };

    // setup test before running test
    beforeAll(async () => {
        await deleteUsersByUsername(ripley.username);
        const user = await createUser(ripley);
        testTuit.postedBy = user._id;
        return deleteTuitsByUser(testTuit.postedBy);
    });

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deleteTuitsByUser(testTuit.postedBy);
        return deleteUsersByUsername(ripley.username);
    });

    test('can delete tuit wtih REST API', async () => {
        const newTuit = await createTuit(testTuit.postedBy, testTuit);
        const status = await deleteTuit(newTuit._id);
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    // sample user to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const testTuit = {
        tuit: 'Test Tuit2',
        postedBy: ''
    };

    // setup test before running test
    beforeAll(async () => {
        await deleteUsersByUsername(ripley.username);
        const user = await createUser(ripley);
        testTuit.postedBy = user._id;
        return deleteTuitsByUser(testTuit.postedBy);
    });

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deleteTuitsByUser(testTuit.postedBy);
        return deleteUsersByUsername(ripley.username);
    });

    test('can retrieve a tuit by their primary key with REST API', async () => {
        const newTuit = await createTuit(testTuit.postedBy, testTuit);
        const foundTuit = await findTuitById(newTuit._id);
        expect(foundTuit.tuit).toEqual(newTuit.tuit);
    });
});

describe('can retrieve all tuits with REST API', () => {
    // sample user to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const testTuits = ['t0', 't1', 't2'];

    let user = '';

    // setup test before running test
    beforeAll(async () => {
        await deleteUsersByUsername(ripley.username);
        user = await createUser(ripley);
        testTuits.map(tuit => createTuit(user._id, {
            tuit: tuit,
            postedBy: user._id
        }));
    });

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deleteTuitsByUser(user._id);
        return deleteUsersByUsername(ripley.username);
    });

    test('can retrieve all tuits with REST API', async () => {
        const foundTuits = await findAllTuits();
        expect(foundTuits.length).toBeGreaterThanOrEqual(testTuits.length);

        const newTuits = foundTuits.filter(tuit => testTuits.indexOf(tuit.tuit) >= 0);
        newTuits.forEach(tuit => {
            const contents = testTuits.find(content => content === tuit.tuit);
            expect(contents).toEqual(contents);
        })
    });
});
