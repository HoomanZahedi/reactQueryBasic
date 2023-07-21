import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/home.page';
import { TanstakRQ } from './components/tanstakRQ';
import { SuperHeroes } from './components/superHeroes.page';
import {RQSuperHeroes} from './components/RQSuperHeroes.page';
import SingleHero from './components/singleHero';
import RQSingleSuperHero from './components/RQSingleSuperHero';
import ParallelQueries from './components/parallelQueries.tsx';
import DependentQuery from './components/dependentQuery.tsx';
import LoadMoreUsers from './components/loadMoreUsers.tsx';

function Router()  {
    
    return (
		//<BrowserRouter>
		<BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/RQSuperHeroes" element={<RQSuperHeroes />} />
                <Route path="/SuperHeroes" element={<SuperHeroes />} />
                <Route path="/singleHero" element={<SingleHero />} />
                <Route path="/parallelQueries" element={<ParallelQueries />} />
                <Route path="/loadMore" element={<LoadMoreUsers pageParam={1} />} />
                <Route path="/dependentQuery" element={<DependentQuery userId={2}/>} />
                <Route path="/RQSingleSuperHero/:HeroId" element={<RQSingleSuperHero />} />
            </Routes>
        </BrowserRouter>
    )
}


export default Router;