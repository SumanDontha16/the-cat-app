import React, { useEffect, useState, useMemo } from 'react';
import { useGetCatImagesQuery, useAddFavoriteMutation, useRemoveFavoriteMutation, useVoteCatImageMutation, useGetVotesQuery } from '../../api/catApi';
import { useDispatch, useSelector } from 'react-redux';
import { favoritesSelector, updateFavorites, updateVotes, votesSelector } from '../../features/catSlice';
import CatCard from '../CatCard/CatCard';
import { paginate } from '../../utils/paginate';
import Skeleton from '../../utils/Skeleton';
import Error from '../../utils/Error';
import { Pagination } from '../Pagination/Pagination';

const CatGallery = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true); 
    const { data: catImages, error: catImagesError } = useGetCatImagesQuery(undefined); 
    const { data: voteData, error: voteDataError } = useGetVotesQuery();

    const cats = useMemo(() => catImages || [], [catImages]);
    const pageCount = useMemo(() => Math.ceil((cats?.length || 0) / 8) || 1, [cats]);
    const paginatedCats = useMemo(() => paginate(cats, 8, page), [cats, page]);

    const favorites = useSelector(favoritesSelector);
    const votes = useSelector(votesSelector);

    const [addFavorite] = useAddFavoriteMutation();
    const [removeFavorite] = useRemoveFavoriteMutation();
    const [voteCatImage] = useVoteCatImageMutation();

    useEffect(() => {
        const fetchVotes = async () => {
            setIsLoading(true); // Set loading state before fetching
            if (voteData) {
                const scores = {};
                voteData.forEach((vote) => {
                    scores[vote.image_id] = (scores[vote.image_id] || 0) + vote.value;
                });
                dispatch(updateVotes(scores));
            }
            setIsLoading(false); // Set loading state to false after fetching
        };

        fetchVotes();
    }, [voteData, dispatch]);


    useEffect(() => {
        // Trigger loading state when the page changes
        setIsLoading(true);
        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 500); // Set loading state to false after 500ms

        return () => clearTimeout(timeoutId);
    }, [page]);


    if (isLoading) return <Skeleton />;
    if (catImagesError) return <Error statusCode={catImagesError.status} message={catImagesError.data.message} />;
    if (voteDataError) return <Error statusCode={voteDataError.status} message={voteDataError.data.message} />;

    const handleVote = async (id, vote) => {
        await voteCatImage({ imageId: id, vote });
        dispatch(updateVotes({ [id]: (votes[id] || 0) + vote }));
    };

    const handleFavorite = async (id) => {
        if (favorites.includes(id)) {
            await removeFavorite(id);
            dispatch(updateFavorites(favorites.filter((favourite) => favourite !== id)));
        } else {
            await addFavorite(id);
            dispatch(updateFavorites([...favorites, id]));
        }
    };

    return (
        <div data-testid="cat-list" className="flex flex-col items-center space-y-6 p-6">
            <main>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {paginatedCats.map((cat) => (
                        <CatCard
                            key={cat.id}
                            cat={cat}
                            favorites={favorites}
                            votes={votes}
                            onFavorite={handleFavorite}
                            onVote={handleVote}
                            isFavorite={favorites.includes(cat.id)}
                            score={votes[cat.id] ?? 0}
                        />
                    ))}
                </div>
            </main>
            {!isLoading && <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />}
        </div>
    );
};

export default CatGallery;
