import {App, mapStateToProps, mapDispatchToProps} from '../App';
import React from 'react';
import { shallow } from 'enzyme';
import * as action from '../../../actions';
import { fetchCheese } from '../../../thunks/fetchFormula';

jest.mock('../../../thunks/fetchFormula');

describe('App', () => {
  let wrapper
  let mockFormulas
  let mockIsLoading
  let mockHasErrored
  let mockFetchFormula
  let mockAddFormulas


  beforeEach(() => {
    mockFormulas = [{title: 'boost'}, { title: 'smoothie'}];
    mockFetchFormula = jest.fn();
    mockAddFormulas = jest.fn();
    mockHasErrored = false
    mockIsLoading = true

    wrapper = shallow(<App
      formulas={mockFormulas}
      isLoading={mockIsLoading}
      hasErrored={mockHasErrored}
      fetchFormula={mockFetchFormula}
      addFormulas={mockAddFormulas}/>)
  })


  it('should match the snapShot', () => {
      expect(wrapper).toMatchSnapshot();
  });

  it('should return a formulas array', () => {
    const mockState = {
      formulas: mockFormulas,
      addFormulas: mockAddFormulas
    };

    const expectedProps = {
      formulas: mockFormulas
    };

    const mappedProps = mapStateToProps(mockState);
    expect(mappedProps).toEqual(expectedProps);
  });

  it('should call dispatch with addFormula', () => {
    const mockState = {
      forumlas: mockFormulas,
      addFormulas: mockAddFormulas,
      fetchFormula: mockFetchFormula
    };

    const mockDispatch = jest.fn();
    const mappedProps = mapDispatchToProps(mockDispatch);
    const actionToDispatch = action.addFormulas({name: 'smoothie-town'});
    mappedProps.addFormulas({name: 'smoothie-town'});
    expect(mockDispatch).toBeCalledWith(actionToDispatch)
  })
})