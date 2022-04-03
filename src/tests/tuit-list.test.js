import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

const MOCKED_USERS = [
  {username: 'user0', _id: '123'},
  {username: 'user1', _id: "234"},
  {username: 'user2', _id: '345'}
];

const MOCKED_TUITS = [
  {tuit: 'tuit0', postedBy: '123', _id: "0"},
  {tuit: 'tuit1', postedBy: '234', _id: '1'},
  {tuit: 'tuit2', postedBy: '345', _id: '2'}
];

test('tuit list renders static tuit array', () => {
  render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS}/>
      </HashRouter>
  );

  const linkElement0 = screen.getByText(/tuit0/i);
  expect(linkElement0).toBeInTheDocument();

  const linkElement1 = screen.getByText(/tuit1/i);
  expect(linkElement1).toBeInTheDocument();

  const linkElement2 = screen.getByText(/tuit2/i);
  expect(linkElement2).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  const tuits = await findAllTuits();
  render(
      <HashRouter>
        <Tuits tuits={tuits}/>
      </HashRouter>
  );

  const linkElement0 = screen.getByText(/first tuit/i);
  expect(linkElement0).toBeInTheDocument();

  const linkElement1 = screen.getByText(/second tuit/i);
  expect(linkElement1).toBeInTheDocument();
});

test('tuit list renders mocked', async () => {
  const mock = jest.spyOn(axios, 'get');
  mock.mockImplementation(() => Promise.resolve({data: {tuits: MOCKED_TUITS}}));
  const response = await findAllTuits();
  const tuits = response.tuits;

  render(
      <HashRouter>
        <Tuits tuits={tuits}/>
      </HashRouter>
  );

  const linkElement0 = screen.getByText(/tuit0/i);
  expect(linkElement0).toBeInTheDocument();

  const linkElement1 = screen.getByText(/tuit1/i);
  expect(linkElement1).toBeInTheDocument();

  const linkElement2 = screen.getByText(/tuit2/i);
  expect(linkElement2).toBeInTheDocument();
});
