import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Calendar, Clock, Users, Play, Heart, Share2, X } from 'lucide-react';
import Header from '../components/Header';

// Trailer Modal Component
const TrailerModal = ({ isOpen, onClose, trailerUrl, movieTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">{movieTitle} - Official Trailer</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={trailerUrl}
            title={`${movieTitle} Trailer`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

// Mock data with trailers and cast photos
const movieData = {
  1: {
    id: 1,
    title: 'Animal',
    genre: 'Comedy, Drama',
    language: 'hindi',
    rating: 4.2,
    releaseDate: 'July 11, 2024',
    poster: 'https://upload.wikimedia.org/wikipedia/en/9/90/Animal_%282023_film%29_poster.jpg',
    banner: 'https://i.pinimg.com/736x/7f/75/0c/7f750cb71813899c44da6caa3f18637e.jpg',
    duration: '2h 25m',
    description: 'A hilarious comedy-drama about family relationships and misunderstandings. The story revolves around a middle-class family and their amusing adventures filled with love, laughter, and life lessons.',
    cast: [
      {
        name: 'Srikanth',
        role: 'Lead Actor',
        photo: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        name: 'Srithej',
        role: 'Supporting Actor',
        photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        name: 'Vennela Kishore',
        role: 'Comedian',
        photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        name: 'Prudhvi Raj',
        role: 'Character Actor',
        photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ],
    director: 'Srikanth Vissa',
    producer: 'Suresh Productions',
    music: 'Devi Sri Prasad',
    certification: 'U/A',
    trailerUrl: 'https://www.youtube.com/embed/8FkLRUJj-o0',
    reviews: [
      { user: 'MovieLover123', rating: 4, comment: 'Great comedy timing and excellent performances!' },
      { user: 'FilmCritic', rating: 4.5, comment: 'A perfect family entertainer with heart and humor.' }
    ]
  },
  2: {
    id: 2,
    title: 'Avatar',
    genre: 'Action, Thriller',
    language: 'English',
    rating: 3.8,
    releaseDate: 'July 11, 2024',
    poster: 'https://fr.web.img4.acsta.net/pictures/22/11/02/14/49/4565071.jpg',
    banner: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhb7JJxzLuI5v29XyFNS-FUp8_L1NlRSlU0NlKeFJO7MnZUzSl3ZlfQYOlvooNKF6UyqcyVU6ilnlPVwttihMQhGM2pMIip0CjawBk5lOWlSfUKOXxf3eh7QqX6ZpacaU5T9BMH_reJXko8/w1200-h630-p-k-no-nu/the+100.jpg',
    duration: '2h 15m',
    description: 'An intense action thriller that keeps you on the edge of your seat. Follow the journey of 100 survivors in a post-apocalyptic world where every decision matters.',
    cast: [
      {
        name: 'Atharvaa',
        role: 'Lead Actor',
        photo: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        name: 'Hansika Motwani',
        role: 'Lead Actress',
        photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        name: 'Yogi Babu',
        role: 'Comedian',
        photo: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ],
    director: 'Sam Anton',
    producer: 'Rockfort Entertainment',
    music: 'Sam CS',
    certification: 'A',
    trailerUrl: 'https://www.youtube.com/embed/nb_fFj_0rq8',
    reviews: [
      { user: 'ActionFan', rating: 4, comment: 'Non-stop action and great cinematography!' },
      { user: 'ThrillerLover', rating: 3.5, comment: 'Good thriller elements but could be better.' }
    ]
  },
  3: {
    id: 3,
    title: 'Rawayan',
    genre: 'Action, Romance',
    language: 'Hindi',
    rating: 3.5,
    releaseDate: 'June 21, 2024',
    poster: 'https://www.inicinemas.com/Modules/CineUploadFiles/Movie/image/Rawayan_310x390_760674.png',
    banner: 'https://images.filmibeat.com/te/img/2025/07/virginboysmoviereviewandrating-1752227528.jpg',
    duration: '2h 5m',
    description: 'A hilarious yet heartwarming coming-of-age comedy about a group of friends navigating love, life, and societal expectations while trying to lose their "virgin" status. Filled with laughter and relatable moments.',
    cast: [
      {
        name: 'Vasanth Ravi',
        role: 'Lead Actor',
        photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        name: 'Vani Bhojan',
        role: 'Lead Actress',
        photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        name: 'Yogi Babu',
        role: 'Comedian',
        photo: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        name: 'Karunakaran',
        role: 'Supporting Actor',
        photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ],
    director: 'Ramesh Thamilmani',
    producer: 'Trident Arts',
    music: 'Arrol Corelli',
    certification: 'UA',
    trailerUrl: 'https://www.youtube.com/embed/A6TypcUi6QE',
    reviews: [
      { user: 'ComedyKing', rating: 4, comment: 'Laughed non-stop! Yogi Babu stole the show.' },
      { user: 'MovieBuff', rating: 3, comment: 'Funny but predictable plot.' }
    ]
  },
  4: {
    id: 4,
    title: 'Vettaiyan',
    genre: 'Drama, Family',
    language: 'Hindi',
    rating: 4.2,
    releaseDate: 'August 15, 2024',
    poster: 'https://assets.voxcinemas.com/posters/P_HO00011507_1727338256716.jpg',
    banner: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/medium/dheerga-ayushman-bhava-et00452078-1751540912.jpg',
    duration: '2h 30m',
    description: 'A heartfelt family drama that explores the bonds between generations, traditions, and modern values. The story revolves around an elderly man\'s journey to reunite his fractured family while imparting timeless wisdom.',
    cast: [
      {
        name: 'Nandamuri Balakrishna',
        role: 'Lead Actor',
        photo: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        name: 'Anupama Parameswaran',
        role: 'Lead Actress',
        photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        name: 'Prakash Raj',
        role: 'Supporting Actor',
        photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        name: 'Sai Pallavi',
        role: 'Supporting Actress',
        photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ],
    director: 'Trivikram Srinivas',
    producer: 'Sithara Entertainments',
    music: 'Devi Sri Prasad',
    certification: 'U',
    trailerUrl: 'https://www.youtube.com/embed/VNRBmh0QGw0',
    reviews: [
      { user: 'FamilyMovieLover', rating: 4.5, comment: 'Emotional and uplifting! Balayya\'s performance is powerful.' },
      { user: 'ClassicFan', rating: 4, comment: 'A beautiful blend of tradition and modernity.' }
    ]
  },
  5: {
   id: 5,
    title: 'Saiyaara',
    genre: 'Romance, Drama, love',
    language: 'Hindi',
    rating: 4.5,
    releaseDate: 'March 8, 2025',
    poster: 'https://myhdmovie365.s3.amazonaws.com/Top%20Banner%202_Mobile.jpg',
    banner: 'https://i.ytimg.com/vi/d3bbZsRTxNk/maxresdefault.jpg',
    duration: '2h 45m',
    description: 'A divine cinematic journey exploring the legend of Lord Shiva as "Mrithyunjay" – the conqueror of death. This epic drama blends mythology, philosophy, and stunning visuals to depict timeless teachings of life, death, and immortality.',
    cast: [
      {
        name: 'Prabhas',
        role: 'Lord Shiva',
        photo: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        name: 'Keerthy Suresh',
        role: 'Parvati',
        photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        name: 'Amitabh Bachchan',
        role: 'Narrator',
        photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        name: 'Nassar',
        role: 'Sage Markandeya',
        photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ],
    director: 'Om Raut',
    producer: 'T-Series',
    music: 'Ajay-Atul',
    certification: 'U/A',
    trailerUrl: 'https://www.youtube.com/embed/9r-tT5IN0vg',
    reviews: [
      { user: 'DevoteeCinema', rating: 5, comment: 'A soul-stirring masterpiece! Visuals and music transport you to another realm.' },
      { user: 'MythologyLover', rating: 4, comment: 'Faithful to scriptures but could delve deeper into Shiva\'s teachings.' }
    ]
  },
  6: {
    id: 6,
    title: 'Chhaava',
    genre: 'Action, thriller',
    language: 'Hindi',
    rating: 3.9,
    releaseDate: 'October 13, 2023',
    poster: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p29362791_p_v10_aa.jpg',
    banner: 'https://content.tupaki.com/en/feeds/2024/04/13/352683-sharwa.webp',
    duration: '2h 18m',
    description: 'A cursed antique doll (Sharwa 36) unleashes supernatural horrors on a group of friends investigating its origins. As they decode its connection to a 1936 witch burning, they realize the curse activates every 36 hours, forcing them to confront their darkest fears.',
    cast: [
      {
        name: 'Siddhu Jonnalagadda',
        role: 'Vikram (Paranormal Investigator)',
        photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        name: 'Anupama Parameswaran',
        role: 'Divya (Occult Specialist)',
        photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        name: 'Priyadarshi Pulikonda',
        role: 'Raju (Comic Relief)',
        photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        name: 'Srinivas Avasarala',
        role: 'Professor Krishnamurthy (Historian)',
        photo: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ],
    director: 'Anand Deverakonda',
    producer: 'Suresh Productions',
    music: 'Mark K. Robin',
    certification: 'UA',
    trailerUrl: 'https://www.youtube.com/embed/77vRyWNqZjM',
    reviews: [
      { 
        user: 'HorrorBuff', 
        rating: 4, 
        comment: 'The doll\'s VFX rivals Hollywood horrors! Siddhu\'s performance anchors the scares.' 
      },
      { 
        user: 'TeluguCinema', 
        rating: 3.5, 
        comment: 'Great atmosphere but relies on jump scares. Anupama steals every scene.' 
      }
    ]
  },
7: {
     id: 7,
    title: 'World Famous Lover',
    genre: 'Romance, love',
    language: 'Hindi',
    rating: 4.1,
    releaseDate: 'July 28, 2023',
    poster: 'https://m.media-amazon.com/images/M/MV5BNzNmZmE0YzQtNTZkYi00MzE5LWE2MzgtYmFhNDc5ZGI5YTFiXkEyXkFqcGc@._V1_.jpg',
    banner: 'https://i.ytimg.com/vi/P4nWO04BM3M/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCL7GhnvERhNQCoK9fXrxqw2g9KcQ',
    duration: '2h 5m',
    description: 'A group of friends venture into the mysterious Ghaati forests for a trek, only to encounter an ancient evil spirit that protects the woods. As they try to escape, they uncover the dark history of human sacrifices made to appease the forest deity.',
    cast: [
      {
        name: 'Darling Krishna',
        role: 'Vijay (Team Leader)',
        photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        name: 'Radhika Narayan',
        role: 'Ananya (Wildlife Photographer)',
        photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        name: 'Achyuth Kumar',
        role: 'Bhatru (Local Guide)',
        photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        name: 'Sampath Maitreya',
        role: 'Dr. Sampath (Anthropologist)',
        photo: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ],
    director: 'Rohit Padaki',
    producer: 'Jayanna Combines',
    music: 'B. Ajaneesh Loknath',
    certification: 'UA',
    trailerUrl: 'https://www.youtube.com/embed/0hRLAqlCgeA',
    reviews: [
      {
        user: 'HorrorLover',
        rating: 4.5,
        comment: 'The forest atmosphere is terrifying! One of the best Kannada horror films in years.'
      },
      {
        user: 'CinemaFan',
        rating: 4,
        comment: 'Great performances and genuine scares. The tribal ritual scenes are haunting.'
      }
    ]
  },
  8: {
     id: 8,
    title: 'Sikandar',
    genre: 'Action, Drama',
    language: 'hindi',
    rating: 4.3,
    releaseDate: 'February 14, 2025',
    poster: 'https://upload.wikimedia.org/wikipedia/en/4/4a/Sikandar_2025_film_poster.jpg',
    banner: 'https://www.greatandhra.com/newphotos10/meghaluchepite1748688133.jpeg',
    duration: '2h 25m',
    description: 'A poetic romance where letters carried by clouds connect two lovers separated by fate. When a city-bred writer discovers decades-old love letters in an antique desk, he embarks on a journey to find the mysterious woman who wrote them.',
    cast: [
      {
        name: 'Nitin',
        role: 'Arjun (Writer)',
        photo: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg'
      },
      {
        name: 'Krithi Shetty',
        role: 'Megha (Artist)',
        photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
      },
      {
        name: 'Prakash Raj',
        role: 'Postmaster',
        photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg'
      }
    ],
    director: 'Sandeep Raj',
    producer: 'Dil Raju',
    music: 'Gopi Sundar',
    certification: 'U',
    trailerUrl: 'https://www.youtube.com/embed/in6mSwNbXS0',
    reviews: [
      {
        user: 'RomanticAtHeart',
        rating: 4.5,
        comment: 'The cloud sequences are visual poetry! Krithi\'s best performance yet.'
      }
    ]
  },
  9: {
    id: 9,
    title: 'shaitaan',
    genre: 'thriller, mysterious, horror',
    language: 'Telugu,hindi',
    rating: 4.7,
    releaseDate: 'January 26, 2025',
    poster: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/shaitaan-et00384234-1706179766.jpg',
    banner: 'https://i.pinimg.com/736x/47/a0/c0/47a0c06d44c71b914fd6619321eb9096.jpg',
    duration: '2h 52m',
    description: 'Epic historical drama about the legendary warrior Veera Mallu who fought against the Mughal empire. The film showcases his guerrilla warfare tactics and ultimate sacrifice for protecting dharma.',
    cast: [
      {
        name: 'Pawan Kalyan',
        role: 'Veera Mallu',
        photo: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg'
      },
      {
        name: 'Nidhhi Agerwal',
        role: 'Princess Leelavati',
        photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
      }
    ],
    director: 'Krish Jagarlamudi',
    producer: 'Mythri Movie Makers',
    music: 'M. M. Keeravani',
    certification: 'UA',
    trailerUrl: 'https://www.youtube.com/embed/A_HQdwRDRrw',
    reviews: [
      {
        user: 'HistoryBuff',
        rating: 5,
        comment: 'Pawan Kalyan\'s career-defining performance! Battle sequences rival Hollywood epics.'
      }
    ]
  },
  10: {
    id: 10,
    title: 'Mahavatar Narsimha',
    genre: 'Mythology, Action',
    language: 'Telugu,Hindi',
    rating: 4.8,
    releaseDate: 'December 12, 2025',
    poster: 'https://assetscdn1.paytm.com/images/cinema/3_Mahavatar-Narsimha_Poster-810b5220-580c-11f0-8c69-e1cfd333c047.jpg',
    banner: 'https://i.pinimg.com/1200x/c3/ab/42/c3ab42e4cd6170383d83278798cc1299.jpg',
    duration: '2h 45m',
    description: 'The divine saga of Lord Vishnu\'s Narasimha avatar, depicting his cosmic battle against the demon Hiranyakashipu to protect his devotee Prahlada.',
    cast: [
      {
        name: 'Prabhas',
        role: 'Lord Narasimha',
        photo: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg'
      },
      {
        name: 'Amitabh Bachchan',
        role: 'Hiranyakashipu',
        photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg'
      }
    ],
    director: 'Om Raut',
    producer: 'T-Series',
    music: 'Ajay-Atul',
    certification: 'U/A',
    trailerUrl: 'https://www.youtube.com/embed/wkOYEhjAXyo',
    reviews: [
      {
        user: 'DevoteeCinema',
        rating: 5,
        comment: 'Prabhas\' transformation scene will give you goosebumps! Faithful to Puranic lore.'
      }
    ]
  },
  11: {
   id: 11,
    title: 'Maalik',
    genre: 'Thriller, Action',
    language: 'Hindi',
    rating: 3.9,
    releaseDate: 'May 20, 2024',
    poster: 'https://i.redd.it/what-are-your-most-awaited-films-of-2025-till-now-v0-9ghyzyynkp7f1.jpg?width=1638&format=pjpg&auto=webp&s=9b044354ec2632399777bce2c63b381add6f65a6',
    banner: 'https://thetelugufilmnagar.com/storage/2023/05/First-Single-Out-Now.webp',
    duration: '2h 12m',
    description: 'A disturbing character study of a successful businessman whose perfect life masks a manipulative personality, exploring how his relationships crumble when his true nature is exposed.',
    cast: [
      {
        name: 'Naga Chaitanya',
        role: 'Vikrant',
        photo: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg'
      },
      {
        name: 'Sai Pallavi',
        role: 'Psychologist',
        photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
      }
    ],
    director: 'Sekhar Kammula',
    producer: 'Dil Raju',
    music: 'Radhan',
    certification: 'UA',
    trailerUrl: 'https://www.youtube.com/embed/0itY1Fhvnnk',
    reviews: [
      {
        user: 'PsychDramaFan',
        rating: 4,
        comment: 'Chay\'s darkest role yet! Makes you analyze toxic relationships.'
      }
    ]
  },
  12: {
    id: 12,
    title: 'Bhootnii',
    genre: 'Comedy, Romance, Horror',
    language: 'Hindi',
    rating: 4.4,
    releaseDate: 'August 15, 2024',
    poster: 'https://image.tmdb.org/t/p/original/7hY958sJ5xfXSBS3hiBtMxpOqRK.jpg',
    banner: 'https://thetelugufilmnagar.com/storage/2024/05/Parada-Featured.webp',
    duration: '2h 28m',
    description: 'A fiery journalist uncovers a political conspiracy involving fake news factories and election manipulation, leading to a dangerous cat-and-mouse game with powerful politicians.',
    cast: [
      {
        name: 'Vijay Deverakonda',
        role: 'Journalist',
        photo: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg'
      },
      {
        name: 'Sanya Malhotra',
        role: 'Whistleblower',
        photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
      }
    ],
    director: 'Sandeep Reddy Vanga',
    producer: 'Mythri Movie Makers',
    music: 'Sanjay Leela Bhansali',
    certification: 'UA',
    trailerUrl: 'https://www.youtube.com/embed/L8Wfzxch7Xo',
    reviews: [
      {
        user: 'PoliticalFilmBuff',
        rating: 4.5,
        comment: 'Vijay\'s most intense performance! The courtroom scene is electrifying.'
      }
    ]
  },
  13: {
    id: 13,
    title: 'Sankranthiki Vasthunam',
    genre: 'Action, Drama, comedy',
    language: 'Telugu, hindi',
    rating: 4.6,
    releaseDate: 'April 2025',
    poster: 'https://s3.ap-south-1.amazonaws.com/media.thesouthfirst.com/wp-content/uploads/2025/01/Sankranthiki-Vasthunam.jpg',
    banner: 'https://i.ytimg.com/vi/yN7LA9N_MqM/maxresdefault.jpg',
    duration: '2h 35m',
    description: 'A RAW agent goes rogue to expose an international arms syndicate operating across India-Pakistan border, leading to high-octane action sequences across multiple countries.',
    cast: [
      {
        name: 'Vijay Deverakonda',
        role: 'Agent Rudra',
        photo: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg'
      },
      {
        name: 'Kiara Advani',
        role: 'Hacker Ally',
        photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
      }
    ],
    director: 'Sujeeth',
    producer: 'Dil Raju',
    music: 'Thaman S',
    certification: 'UA',
    trailerUrl: 'https://www.youtube.com/embed/kmkZ_TJ5oK8',
    reviews: [
      {
        user: 'ActionKing',
        rating: 5,
        comment: 'Vijay\'s transformation into an action hero is complete! The Dubai chase rivals Hollywood.'
      }
    ]
  }
};

const MovieDetails = ({ selectedLocation, user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  const movie = movieData[id] || movieData[1]; // Fallback to first movie

  const handleRatingSubmit = () => {
    if (userRating > 0 && userReview.trim()) {
      // In real app, submit to API
      alert('Review submitted successfully!');
      setUserRating(0);
      setUserReview('');
    }
  };

  const handleBookNow = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/cinemas/${movie.id}`);
  };

  const handleWatchTrailer = () => {
    setShowTrailer(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 text-white">
      <Header user={user} selectedLocation={selectedLocation} setSelectedLocation={() => {}} onLogout={() => {}} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative w-48 md:w-60">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full rounded-lg shadow-2xl relative z-50"
                />
                <Link
                  to={`/seat-selection/${movie.id}`}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg transition-colors"
                >
                  Book Now
                </Link>
              </div>
              
              <div className="text-white flex-1 relative z-50">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-black">
                  {movie.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center space-x-2 bg-red-100 px-3 py-1 rounded-lg">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-black">{movie.rating}/5</span>
                  </div>
                  <span className="bg-red-600 px-3 py-1 rounded-lg font-semibold text-white">
                    {movie.certification}
                  </span>
                  <span className="bg-gray-300 px-3 py-1 rounded-lg text-black">
                    {movie.language}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-6 text-sm mb-6 text-black">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{movie.releaseDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{movie.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>{movie.genre}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handleBookNow}
                    className="block w-40 bg-red-700 hover:bg-red-800 text-white py-3 rounded-lg font-semibold text-center transition-all duration-300 transform hover:scale-105"
                  >
                    <span>{user ? 'Book Tickets' : 'Login to Book'}</span>
                  </button>

                  {/* Added direct booking button */}
                  {/* Removed Direct Book Tickets button as per user request */}
                  
                  <button 
                    onClick={handleWatchTrailer}
                    className="block w-40 bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold text-center transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Play className="h-5 w-5" />
                    <span>Watch Trailer</span>
                  </button>
                  
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-3 rounded-full transition-colors ${
                      isLiked ? 'bg-red-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button className="bg-white text-gray-800 hover:bg-gray-100 p-3 rounded-full transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'about', label: 'About' },
                { id: 'cast', label: 'Cast & Crew' },
                { id: 'reviews', label: 'Reviews' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 border-b-2 font-semibold text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-gray-400 hover:text-red-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3">Synopsis</h3>
                  <p className="text-gray-700 leading-relaxed">{movie.description}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Movie Details</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><span className="font-medium">Director:</span> {movie.director}</p>
                      <p><span className="font-medium">Producer:</span> {movie.producer}</p>
                      <p><span className="font-medium">Music:</span> {movie.music}</p>
                      <p><span className="font-medium">Duration:</span> {movie.duration}</p>
                      <p><span className="font-medium">Genre:</span> {movie.genre}</p>
                      <p><span className="font-medium">Language:</span> {movie.language}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cast' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Cast</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {movie.cast.map((actor, index) => (
                      <div key={index} className="text-center">
                        <img
                          src={actor.photo}
                          alt={actor.name}
                          className="w-24 h-24 rounded-full mx-auto mb-3 object-cover shadow-lg"
                        />
                        <p className="font-medium text-sm">{actor.name}</p>
                        <p className="text-xs text-gray-500">{actor.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Crew</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold">Director</p>
                      <p className="text-gray-600">{movie.director}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold">Music Director</p>
                      <p className="text-gray-600">{movie.music}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* User Review Form */}
                <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Write a Review</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Your Rating</label>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setUserRating(star)}
                            className={`h-8 w-8 ${
                              star <= userRating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            <Star className="h-full w-full fill-current" />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Your Review</label>
                      <textarea
                        value={userReview}
                        onChange={(e) => setUserReview(e.target.value)}
                        rows={4}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        placeholder="Share your thoughts about this movie..."
                      />
                    </div>
                    
                    <button
                      onClick={handleRatingSubmit}
                      className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>

                {/* Existing Reviews */}
                <div>
                  <h3 className="text-xl font-bold mb-4">User Reviews</h3>
                  <div className="space-y-4">
                    {movie.reviews.map((review, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{review.user}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{review.rating}/5</span>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={showTrailer}
        onClose={() => setShowTrailer(false)}
        trailerUrl={movie.trailerUrl}
        movieTitle={movie.title}
      />
    </div>
  );
};

export default MovieDetails;