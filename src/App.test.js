/* eslint-disable */
import { render, screen, fireEvent } from '@testing-library/react' ;
import '@testing-library/jest-dom' 
import App from './App';

// test('Login disappears', () => {
//   const result = render(<App />);
  
//   const login = screen.getByText('Login');
//   expect(login).toBeInTheDocument();
  
//   fireEvent.click(login);
//   expect(login).not.toBeInTheDocument();
// });
test('Board appears', () => {
  const result = render(<App />);
  
  //board not shown yet
  // expect(theBoard).not.toBeInTheDocument();
  //once login is clicked check login
  const login = screen.getByText('Login');
  expect(login).toBeInTheDocument();
  fireEvent.click(login);
  
  //board should be shown at this point!
  const theBoard = screen.getByTestId('board-shown');
  expect(theBoard).toBeInTheDocument();

});

test('LeaderBoard appears',()=>{
   
   const result = render(<App />);
   const login = screen.getByText('Login');
   fireEvent.click(login);
   
   //check for the button
   const leaderBttn = screen.getByTestId('leader-shown')
   fireEvent.click(leaderBttn)
   
   const rank = screen.getByText('Rank');
   const userName= screen.getByText('Username');
   const score = screen.getByText('Score');
   
   expect(rank).toBeInTheDocument();
   expect(userName).toBeInTheDocument();
   expect(score).toBeInTheDocument();
  
});

test('Board Clicking', () => {
  const result = render(<App />);
  
  const login = screen.getByText('Login');
  fireEvent.click(login);
  
  
  
  
  const boardItem = screen.getByTestId('board-click1');
  fireEvent.click(boardItem, { target: { value: 'X' }});
  
  expect(boardItem).toEqual(expect.arrayContaining(['X','','','','','','','','']))
    
  expect(boardItem).value.toBeInTheDocument();
  

});

