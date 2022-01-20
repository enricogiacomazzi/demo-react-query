import React, {useState} from 'react';
import './App.css';
import {useInfiniteQuery} from 'react-query';

interface Response {
    count: number;
    previous: string | null;
    next: string | null;
    results: Array<{name: string; url: string}>
}



const App: React.FC = () => {

    const initialUrl = 'https://pokeapi.co/api/v2/pokemon';

    const {data, isFetching, hasNextPage, isLoading, isError, fetchNextPage} =
        useInfiniteQuery<Response>(
            'pokemon',
            ({pageParam}) => fetch(pageParam ?? initialUrl).then(res => res.json()),
            { getNextPageParam: lastPage => lastPage.next }
        );

    if (isLoading) {
        return <h1>loading...</h1>
    }

    if (isError) {
        return <h1>ERROR!!!</h1>
    }

    return (
        <div>
            <ul>
                {data?.pages.flatMap(page => page.results).map(p => (<li key={p.name}>{p.name}</li>))}
            </ul>
            {isFetching && <h3>loading more items...</h3>}
            <button onClick={() =>fetchNextPage()} disabled={!hasNextPage || isFetching}>Load more</button>
        </div>

    )
}

export default App;
