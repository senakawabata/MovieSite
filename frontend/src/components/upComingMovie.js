import { useState, useEffect } from 'react';
import axios from 'axios';

function UpcomingMovies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('/api/getUpComing');
                setMovies(response.data.results);
            } catch (error) {
                console.error('Error fetching upcoming movies:', error);
            }
        };
        fetchMovies();
    }, []);

    return (
        <div>
            <h2>公開予定の映画</h2>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default UpcomingMovies;