import React from 'react';
import { Link } from "react-router-dom";
import { Aside, DivClick, Log, NewsH2, NewsDiv, NewsOrg } from './css';
import styled from 'styled-components';

const SideBar = (props) => {

	return (
		<Aside>
			<h1>Lambda<br /> Notes</h1>
			<Link to="/notes"><DivClick><p>View Your Notes</p></DivClick></Link>
			<Link to="/create"><DivClick><p>+ Create New Note</p></DivClick></Link>
			<DivClick><p>Log Out</p></DivClick>
			<NewsH2>Current News</NewsH2>
			{props.news.map((n, i )=> (
				<NewsDiv key={i}>
					<a href={n.url}><p>{n.title}</p></a>
				</NewsDiv>
			))}
			<a href="http://newsapi.org"><NewsOrg>- newsapi.org</NewsOrg></a>
		</Aside>
	)
}

export default SideBar;