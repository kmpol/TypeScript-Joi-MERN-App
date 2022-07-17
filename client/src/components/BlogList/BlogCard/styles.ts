import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: flex-start;
    min-width: 20vw;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 4px;
    margin: 10px;
    cursor: pointer;
`;

export const Title = styled.h3`
    font-size: 48px;
    font-weight: lighter;
`;

export const Headline = styled.p`
    display: block;
    font-weight: 300;
    font-style: italic;
`;
export const Author = styled.p`
    font-style: italic;
`;
