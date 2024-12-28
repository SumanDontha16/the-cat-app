import { render, screen, fireEvent } from '@testing-library/react';
import CatCard from '../components/CatCard/CatCard';

const mockCat = {
    id: 1,
    url: 'https://example.com/cat.jpg'
};

describe('CatCard', () => {
    const mockOnVote = jest.fn();
    const mockOnFavorite = jest.fn();

    test('renders cat image and score correctly', () => {
        render(<CatCard cat={mockCat} score={5} onVote={mockOnVote} onFavorite={mockOnFavorite} isFavorite={false} />);
        expect(screen.getByRole('img')).toHaveAttribute('src', mockCat.url);
        expect(screen.getByText('Score: 5')).toBeInTheDocument();
    });

    test('displays score 0 when score prop is not provided', () => {
        render(<CatCard cat={mockCat} onVote={mockOnVote} onFavorite={mockOnFavorite} isFavorite={false} />);
        expect(screen.getByText('Score: 0')).toBeInTheDocument();
    });

    test('displays score correctly when score prop is 0', () => {
        render(<CatCard cat={mockCat} score={0} onVote={mockOnVote} onFavorite={mockOnFavorite} isFavorite={false} />);
        expect(screen.getByText('Score: 0')).toBeInTheDocument();
    });

    test('handles missing score prop gracefully', () => {
        render(<CatCard cat={mockCat} onVote={mockOnVote} onFavorite={mockOnFavorite} isFavorite={false} />);
        expect(screen.getByText('Score: 0')).toBeInTheDocument();
    });

    test('renders outline heart icon when isFavorite is false', () => {
        render(<CatCard cat={mockCat} score={5} onVote={mockOnVote} onFavorite={mockOnFavorite} isFavorite={false} />);
        const favoriteButton = screen.getByLabelText('Toggle Favorite');
        expect(favoriteButton).toHaveTextContent('');
        expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
    });

    test('renders filled heart icon when isFavorite is true', () => {
        render(<CatCard cat={mockCat} score={5} onVote={mockOnVote} onFavorite={mockOnFavorite} isFavorite={true} />);
        const favoriteButton = screen.getByLabelText('Toggle Favorite');
        expect(favoriteButton).toHaveTextContent('');
        expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
    });

    test('calls onVote when upvote button is clicked', () => {
        render(<CatCard cat={mockCat} score={5} onVote={mockOnVote} onFavorite={mockOnFavorite} isFavorite={false} />);
        fireEvent.click(screen.getByLabelText('Upvote'));
        expect(mockOnVote).toHaveBeenCalledWith(mockCat.id, 1);
    });

    test('calls onVote when downvote button is clicked', () => {
        render(<CatCard cat={mockCat} score={5} onVote={mockOnVote} onFavorite={mockOnFavorite} isFavorite={false} />);
        fireEvent.click(screen.getByLabelText('Downvote'));
        expect(mockOnVote).toHaveBeenCalledWith(mockCat.id, -1);
    });
});
