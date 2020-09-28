import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';

const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top : 2rem;
    @media screen and (max-width : 768px){
        width : 100%;
        padding-left : 1rem;
        padding-right : 1rem;
    }
`; 


const NewsList = ({ category }) => {
    const [articles, setArticles] = useState(null);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        //async 함수 따로 선언
        const fetchData = async () => {
            setLoading(true);
            try{
                const query = category === 'all' ? '' : `&category=${category}`;
                const response = await axios.get(
                    `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=78b2feb1b356442696286aa1df11c249`,
                );
                console.log(response);
                setArticles(response.data.articles);
            } catch(e){
                console.log("news Api Data load error");
            }
            setLoading(false); // 로딩 완료되었으니깐 false로 처리.
        }
        fetchData();
    }, []);
        

    //대기 중일때
    if (loading){
        return <NewsListBlock>대기중...</NewsListBlock>
    }

    if (!articles){
        return null;
    }
    
  return (
    <NewsListBlock>
        {articles.map(article => (
            <NewsItem key={article.url} article = {article} />
        ))}
    </NewsListBlock>
  )
}

export default NewsList;
