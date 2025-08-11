import { useSelector } from "react-redux";
import { useGetTopContributorQuery, useGetTopMoviesQuery, useGetYourContributionQuery } from "../redux/apis/moviesApi";
import TopMoviesTable from "../components/TopMoviesTable";
import ContributionsTable from "../components/ContributionsTable";
import YourContributionsTable from "../components/YourContributionsTable";
import { useEffect } from "react";

const Stats=()=>{
    const user=useSelector((state)=>state.user);
    const dark=user.theme=="dark";
    const {data:mostLikedMovies,isSuccess:mostLikedSuccess,isLoading:mostLikedLoading,isError:mostLikedError}=useGetTopMoviesQuery({sortBy:"likes",limit:10,page:1});
    const {data:highBudgetMovies,isSuccess:highBudgetSuccess,isLoading:highBudgetLoading,isError:highBudgetError}=useGetTopMoviesQuery({sortBy:"budget",limit:10,page:1});
    const {data:highCollectionMovies,isSuccess:highCollectionSuccess,isLoading:highCollectionLoading,isError:highCollectionError}=useGetTopMoviesQuery({sortBy:"movie_collection",limit:10,page:1});
    const {data:topContributors,isSuccess:topContributorsSuccess,isLoading:topContributorsLoading,isError:topContributorsError}=useGetTopContributorQuery({limit:10,page:1});
    const {data:yourContribution,isSuccess:yourContributionSuccess,isLoading:yourContributionLoading,isError:yourContributionError}=useGetYourContributionQuery({limit:10,page:1});

    
    return(
        <div className={`${dark ? "statsDark" : "" } statsContainer`}>
            <div className="table-container">
                <h1 className="stats-title">Most Liked Movies</h1>
                <TopMoviesTable 
                    data={mostLikedMovies} 
                    like={true} 
                    success={mostLikedSuccess}
                    error={mostLikedError}
                    loading={mostLikedLoading}
                />
            </div>
            <div>
                <h1 className="stats-title">Top Budget Movies</h1>
                <TopMoviesTable 
                    data={highBudgetMovies} 
                    success={highBudgetSuccess}
                    error={highBudgetError}
                    loading={highBudgetLoading}
                />
            </div>
            <div>
                <h1 className="stats-title">Highest Collection Movies</h1>
                <TopMoviesTable 
                    data={highCollectionMovies} 
                    success={highCollectionSuccess}
                    error={highCollectionError}
                    loading={highCollectionLoading}
                />
            </div>
            {topContributors?.movies?.length ? 
                <div>
                    <h1 className="stats-title">Top Contributors</h1>
                    <ContributionsTable 
                        data={topContributors} 
                        success={topContributorsSuccess}
                        error={topContributorsError}
                        loading={topContributorsLoading}
                    />
                </div>
            : <></>}
            {yourContribution?.movies?.length ? 
                <div>
                    <h1 className="stats-title">Your Contributions</h1>
                    <YourContributionsTable 
                        data={yourContribution} 
                        success={yourContributionSuccess}
                        error={yourContributionError}
                        loading={yourContributionLoading}
                    />
                </div>
            : <></>}
            
        </div>
    )
}

export default Stats;