import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter, Route } from 'react-router-dom';

import SideBar from '../../components/SideBar/SideBar';
import renderer from 'react-test-renderer';

describe('<SideBar />', () => {
  it('should match snapshot', () => {
  	let news =[{title: 'news-title', url: 'https://www.test-example.com'},{title: 'news-title', url: 'https://www.test-example.com'}]
	  const wrapper = mount(
	  	<MemoryRouter initialEntries={['/notes']}>
	      <SideBar news={news} />
	    </MemoryRouter>
  	)
  	const tree = renderer.create(wrapper).toJSON()
  	expect(tree).toMatchSnapshot()
	})
});