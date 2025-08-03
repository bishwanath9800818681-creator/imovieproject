import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Calendar, Clock, Star, Filter, ChevronRight, Play, Heart, Share2 } from 'lucide-react';

const ongoingMovies = [
  {
    id: 1,
    title: 'Animal',
    genre: 'Comedy, Drama',
    language: 'hindi',
    rating: 4.2,
    releaseDate: 'July 11, 2024',
    poster: 'https://upload.wikimedia.org/wikipedia/en/9/90/Animal_%282023_film%29_poster.jpg',
    duration: '2h 25m',
    description: 'A hilarious comedy-drama about family relationships and misunderstandings.',
    cast: ['Srikanth', 'Srithej', 'Vennela Kishore'],
    director: 'Srikanth Vissa'
  },
  {
    id: 2,
    title: 'Avatar',
    genre: 'Action, Thriller',
    language: 'English',
    rating: 3.8,
    releaseDate: 'July 11, 2024',
    poster: 'https://fr.web.img4.acsta.net/pictures/22/11/02/14/49/4565071.jpg',
    duration: '2h 15m',
    description: 'An intense action thriller that keeps you on the edge of your seat.',
    cast: ['Atharvaa', 'Hansika Motwani'],
    director: 'Sam Anton'
  },
  {
    id: 3,
    title: 'Rawayan',
    genre: 'Action, Romance',
    language: 'Hindi',
    rating: 3.5,
    releaseDate: 'July 11, 2024',
    poster: 'https://www.inicinemas.com/Modules/CineUploadFiles/Movie/image/Rawayan_310x390_760674.png',
    duration: '2h 10m',
    description: 'A coming-of-age romantic comedy about friendship and love.',
    cast: ['Aadarsh Balakrishna', 'Divya Pillai'],
    director: 'Rajesh Touchriver'
  },
  {
    id: 4,
    title: 'Vettaiyan',
    genre: 'Drama, Family',
    language: 'Hindi',
    rating: 4.0,
    releaseDate: 'July 11, 2024',
    poster: 'https://assets.voxcinemas.com/posters/P_HO00011507_1727338256716.jpg',
    duration: '2h 30m',
    description: 'A heartwarming family drama about love, sacrifice, and relationships.',
    cast: ['Arjun Das', 'Ritu Varma'],
    director: 'Karthik Subbaraj'
  },
  {
    id: 5,
    title: 'Saiyaara',
    genre: 'Romance, Drama, love',
    language: 'Hindi',
    rating: 4.1,
    releaseDate: 'July 14, 2024',
    poster: 'https://myhdmovie365.s3.amazonaws.com/Top%20Banner%202_Mobile.jpg',
    duration: '2h 35m',
    description: 'An epic action drama based on ancient mythology and heroism.',
    cast: ['Vijay Deverakonda', 'Rashmika Mandanna'],
    director: 'Parasuram'
  },
  {
    id: 6,
    title: 'Chhaava',
    genre: 'Action, thriller',
    language: 'Hindi',
    rating: 3.9,
    releaseDate: 'July 10, 2024',
    poster: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p29362791_p_v10_aa.jpg',
    duration: '2h 20m',
    description: 'An action-comedy entertainer with perfect blend of humor and thrills.',
    cast: ['Sharwanand', 'Krithi Shetty'],
    director: 'Kishore Tirumala'
  },
  {
    id: 7,
    title: 'World Famous Lover',
    genre: 'Romance, love',
    language: 'Hindi',
    rating: 4.3,
    releaseDate: 'July 11, 2024',
    poster: 'https://m.media-amazon.com/images/M/MV5BNzNmZmE0YzQtNTZkYi00MzE5LWE2MzgtYmFhNDc5ZGI5YTFiXkEyXkFqcGc@._V1_.jpg',
    duration: '2h 18m',
    description: 'A gripping psychological thriller that will keep you guessing till the end.',
    cast: ['Anushka Shetty', 'Madhavan'],
    director: 'Krish Jagarlamudi'
  }
];

const upcomingMovies = [
  {
    id: 8,
    title: 'Sikandar',
    genre: 'Action, Drama',
    language: 'hindi',
    rating: 0,
    releaseDate: 'July 24, 2024',
    poster: 'https://upload.wikimedia.org/wikipedia/en/4/4a/Sikandar_2025_film_poster.jpg',
    duration: '2h 22m',
    description: 'A romantic drama that explores the depths of love and relationships.',
    cast: ['Nithiin', 'Keerthy Suresh'],
    director: 'Trivikram Srinivas'
  },
  {
    id: 9,
    title: 'shaitaan',
    genre: 'thriller, mysterious, horror',
    language: 'Telugu, hindi',
    rating: 0,
    releaseDate: 'July 24, 2024',
    poster: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/shaitaan-et00384234-1706179766.jpg',
    duration: '2h 45m',
    description: 'A historical action epic about the legendary warrior Veera Mallu.',
    cast: ['Pawan Kalyan', 'Nidhhi Agerwal'],
    director: 'Krish Jagarlamudi'
  },
  {
    id: 10,
    title: 'Mahavatar Narsimha',
    genre: 'Mythology, Action',
    language: 'Telugu,Hindi',
    rating: 0,
    releaseDate: 'July 25, 2024',
    poster: 'https://assetscdn1.paytm.com/images/cinema/3_Mahavatar-Narsimha_Poster-810b5220-580c-11f0-8c69-e1cfd333c047.jpg',
    duration: '2h 50m',
    description: 'A mythological action film depicting the avatar of Lord Narsimha.',
    cast: ['Hrithik Roshan', 'Deepika Padukone'],
    director: 'Nitesh Tiwari'
  },
  {
    id: 11,
    title: 'Maalik',
    genre: 'Thriller, Action',
    language: 'Hindi',
    rating: 0,
    releaseDate: 'July 27, 2024',
    poster: 'https://i.redd.it/what-are-your-most-awaited-films-of-2025-till-now-v0-9ghyzyynkp7f1.jpg?width=1638&format=pjpg&auto=webp&s=9b044354ec2632399777bce2c63b381add6f65a6',
    duration: '2h 12m',
    description: 'A psychological thriller exploring human nature and moral dilemmas.',
    cast: ['Adivi Sesh', 'Saiee Manjrekar'],
    director: 'Sashi Kiran Tikka'
  },
  {
    id: 12,
    title: 'Bhootnii',
    genre: 'Comedy, Romance, Horror',
    language: 'Hindi',
    rating: 0,
    releaseDate: 'July 28, 2024',
    poster: 'https://image.tmdb.org/t/p/original/7hY958sJ5xfXSBS3hiBtMxpOqRK.jpg',
    duration: '2h 28m',
    description: 'An action-packed romantic entertainer with spectacular visuals.',
    cast: ['Ram Charan', 'Kiara Advani'],
    director: 'Boyapati Srinu'
  },
  {
    id: 13,
    title: 'Sankranthiki Vasthunam',
    genre: 'Action, Drama, comedy',
    language: 'Telugu,hindi',
    rating: 0,
    releaseDate: 'July 31, 2024',
    poster: 'https://s3.ap-south-1.amazonaws.com/media.thesouthfirst.com/wp-content/uploads/2025/01/Sankranthiki-Vasthunam.jpg',
    duration: '2h 40m',
    description: 'A fantasy adventure set in an ancient kingdom with magical elements.',
    cast: ['Mahesh Babu', 'Pooja Hegde'],
    director: 'Anil Ravipudi'
  }
];

const Home = ({ selectedLocation }) => {
  const [searchParams] = useSearchParams();
  const [filteredOngoing, setFilteredOngoing] = useState(ongoingMovies);
  const [filteredUpcoming, setFilteredUpcoming] = useState(upcomingMovies);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [isSticky, setIsSticky] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const filterBarRef = useRef(null);
  const contentRef = useRef(null);

  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    filterMovies();
  }, [searchQuery, selectedGenre, selectedLanguage]);

  // Scroll detection effect for smart sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const filterBarOffset = filterBarRef.current?.offsetTop || 0;
      const filterBarHeight = filterBarRef.current?.offsetHeight || 0;
      
      // Add sticky behavior when scrolling past the filter bar
      if (currentScrollY > filterBarOffset - 64) { // 64px is header height
        setIsSticky(true);
        if (contentRef.current) {
          contentRef.current.style.paddingTop = `${filterBarHeight}px`;
        }
      } else {
        setIsSticky(false);
        if (contentRef.current) {
          contentRef.current.style.paddingTop = '0px';
        }
      }
      
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filterMovies = () => {
    let ongoing = ongoingMovies;
    let upcoming = upcomingMovies;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      ongoing = ongoing.filter(movie => 
        movie.title.toLowerCase().includes(query) ||
        movie.genre.toLowerCase().includes(query) ||
        movie.cast.some(actor => actor.toLowerCase().includes(query))
      );
      upcoming = upcoming.filter(movie => 
        movie.title.toLowerCase().includes(query) ||
        movie.genre.toLowerCase().includes(query) ||
        movie.cast.some(actor => actor.toLowerCase().includes(query))
      );
    }

    // Genre filter
    if (selectedGenre !== 'All') {
      ongoing = ongoing.filter(movie => movie.genre.includes(selectedGenre));
      upcoming = upcoming.filter(movie => movie.genre.includes(selectedGenre));
    }

    // Language filter
    if (selectedLanguage !== 'All') {
      ongoing = ongoing.filter(movie => movie.language === selectedLanguage);
      upcoming = upcoming.filter(movie => movie.language === selectedLanguage);
    }

    setFilteredOngoing(ongoing);
    setFilteredUpcoming(upcoming);
  };

  const genres = ['All', 'Action', 'Comedy', 'Drama', 'Romance', 'Thriller', 'Historical', 'Mythology', 'Fantasy','horror'];
  const languages = ['All', 'Telugu', 'Hindi', 'English','Nepali'];

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 text-white">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-red-700 via-yellow-500 to-red-700 text-white py-16 overflow-hidden shadow-2xl rounded-b-2xl">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 relative z-20">
          <h3 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight tracking-wider drop-shadow-xl">
            BOOK YOUR <br /> MOVIE TICKETS FOR <span className="text-yellow-400">ENTERTAINMENT</span>
          </h3>
          <p className="text-xl md:text-2xl max-w-3xl drop-shadow-lg">
            Safe, secure, reliable ticketing. Your ticket to live entertainment!
          </p>
        </div>
      </div>
 
      {/* Filters */}
      <div 
        ref={filterBarRef}
        className={`bg-yellow-100 bg-opacity-20 shadow-2xl border-b rounded-b-3xl transition-all duration-300 ${
          isSticky ? 'fixed top-16 left-0 right-0 z-50 shadow-lg' : 'relative z-50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 py-6">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center space-x-4">
              <Filter className="h-7 w-7 text-red-700" />
              <span className="font-semibold text-yellow-100 text-xl">Filters:</span>
            </div>
            
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="px-6 py-4 border border-red-700 rounded-2xl focus:ring-6 focus:ring-red-400 focus:border-transparent bg-white shadow-lg hover:shadow-xl transition-shadow text-xl font-semibold text-gray-900"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre} className="text-gray-900">{genre}</option>
                ))}
              </select>

              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-6 py-4 border border-red-700 rounded-2xl focus:ring-6 focus:ring-red-400 focus:border-transparent bg-white shadow-lg hover:shadow-xl transition-shadow text-xl font-semibold text-gray-900"
              >
                {languages.map(language => (
                  <option key={language} value={language} className="text-gray-900">{language}</option>
                ))}
              </select>

            {(searchQuery || selectedGenre !== 'All' || selectedLanguage !== 'All') && (
              <button
                onClick={() => {
                  setSelectedGenre('All');
                  setSelectedLanguage('All');
                  window.history.pushState({}, '', '/');
                }}
                className="px-6 py-4 text-xl text-red-800 hover:text-red-900 font-bold bg-red-200 rounded-2xl hover:bg-red-300 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Now Showing */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-yellow-900 relative">
              Now Showing
              <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-red-700 to-yellow-500 rounded-full"></div>
            </h2>
            <div className="flex items-center space-x-2 text-red-700">
              <span className="text-sm font-medium">View All</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
          
              {filteredOngoing.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                  {filteredOngoing.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-yellow-100 rounded-xl shadow-lg">
                  <p className="text-yellow-900 text-lg">No movies found matching your criteria.</p>
                </div>
              )}
        </section>

        {/* Coming Soon */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-yellow-900 relative">
              Coming Soon
              <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-yellow-600 to-red-700 rounded-full"></div>
            </h2>
            <div className="flex items-center space-x-2 text-red-700">
              <span className="text-sm font-medium">View All</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
          
          {filteredUpcoming.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {filteredUpcoming.map((movie) => (
                <MovieCard key={movie.id} movie={movie} isUpcoming={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-yellow-100 rounded-xl shadow-sm">
              <p className="text-yellow-900 text-lg">No upcoming movies found matching your criteria.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

const MovieCard = ({ movie, isUpcoming = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105 transform">
        <div className="relative">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay on hover */}
          <div className={`absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex space-x-4">
              <Link
                to={`/movie/${movie.id}`}
                className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors"
              >
                <Play className="h-5 w-5" />
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsLiked(!isLiked);
                }}
                className={`p-3 rounded-full transition-colors ${isLiked ? 'bg-red-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button className="bg-white text-gray-800 hover:bg-gray-100 p-3 rounded-full transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {movie.rating > 0 && (
            <div className="absolute top-3 right-3 bg-black bg-opacity-80 text-white px-3 py-1 rounded-full flex items-center space-x-1 backdrop-blur-sm">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-semibold">{movie.rating}</span>
            </div>
          )}
          {isUpcoming && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-full">
              <span className="text-xs font-semibold">Coming Soon</span>
            </div>
          )}
        </div>
        
        <div className="p-5">
          <Link to={`/movie/${movie.id}`}>
            <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
              {movie.title}
            </h3>
          </Link>
          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <p className="font-medium text-red-600">{movie.genre}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{movie.releaseDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{movie.duration}</span>
              </div>
            </div>
          </div>
          
          {!isUpcoming ? (
            <Link
              to={`/movie/${movie.id}`}
              className="block w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 text-center transform hover:scale-105"
            >
              Book Now
            </Link>
          ) : (
            <button className="w-full bg-gray-100 text-gray-600 py-3 rounded-lg font-semibold cursor-not-allowed">
              Coming Soon
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;