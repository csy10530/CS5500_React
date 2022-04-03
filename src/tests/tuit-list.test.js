import Tuits from "../components/tuits/index";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

const MOCKED_TUITS = [
  {tuit: "test0", postBy: "user0", _id: "1"},
  {tuit: "test1", postBy: "user1", _id: "2"},
  {tuit: "test2", postBy: "user2", _id: "3"}
];

test('tuit list renders static tuit array', () => {
  render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS}/>
      </HashRouter>
  )
  const linkElement1 = screen.getByText(/test0/i);
  const linkElement2 = screen.getByText(/test1/i);
  const linkElement3 = screen.getByText(/test2/i);
  expect(linkElement1).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
  expect(linkElement3).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  const tuits = await findAllTuits();
  render(
      <HashRouter>
        <Tuits tuits={tuits}/>
      </HashRouter>
  )
  const linkElement1 = screen.getByText(/bob's 1st tuit/i);
  expect(linkElement1).toBeInTheDocument();

  const linkElement2 = screen.getByText(/bob's 3rd tuit/i);
  expect(linkElement2).toBeInTheDocument();
})

test('tuit list renders mocked', async () => {
  const mock = jest.spyOn(axios, 'get');
  mock.mockImplementation(() =>
      Promise.resolve({data: {tuits: MOCKED_TUITS}}));
  const response = await findAllTuits();
  const tuits = response.tuits;

  render(
      <HashRouter>
        <Tuits tuits={tuits}/>
      </HashRouter>
  )
  const linkElement1 = screen.getByText(/test0/i);
  expect(linkElement1).toBeInTheDocument();

  const linkElement2 = screen.getByText(/test1/i);
  expect(linkElement2).toBeInTheDocument();

  const linkElement3 = screen.getByText(/test2/i);
  expect(linkElement3).toBeInTheDocument();
});
