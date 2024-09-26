import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const fetchPosts = async () => {
    if (searchTerm.length > 0) {
      setIsSearching(true);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API}wp-json/wp/v2/posts?search=${encodeURIComponent(searchTerm)}`);
        const posts = await response.json();

        const mediaResponses = await Promise.all(
          posts.map(async (post) => {
            if (post.featured_media) {
              const mediaResponse = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API}wp-json/wp/v2/media/${post.featured_media}`);
              return mediaResponse.json();
            }
            return null;
          })
        );

        const postsWithMedia = posts.map((post, index) => ({
          ...post,
          media: mediaResponses[index],
        }));

        setResults(postsWithMedia);

        if (posts.length > 0) {
          router.push(`/blog/${posts[0].id}`);

          if (!searchHistory.includes(searchTerm)) {
            setSearchHistory((prevHistory) => [...prevHistory, searchTerm]);
          }
        } else {
          setResults([]);
        }

        setSuggestions([]);
      } catch (error) {
        console.error('خطأ في البحث:', error);
      } finally {
        setIsSearching(false);
      }
    } else {
      setResults([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchPosts();
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      setSuggestions(searchHistory.filter((term) => term.toLowerCase().includes(value.toLowerCase())));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    fetchPosts();
  };

  return (
    <div className="relative">

<input  
        
        className="relative m-0 block  min-w-0 flex-auto rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-white transition duration-300 ease-in-out focus:border-primary focus:text-white focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:bg-body-dark dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill"
        type="text"  
        value={searchTerm}  
        onChange={handleChange}  
        onKeyDown={handleKeyDown}  
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="ابحث عن البوستات..."  
        required  
      />  
      {isFocused && suggestions.length > 0 && (
        <ul >
          {suggestions.map((suggestion, index) => (
            <li key={index} onMouseDown={() => handleSuggestionClick(suggestion)} >
              {suggestion}
            </li>
          ))}
        </ul>
      )}


    </div>
  );
};

export default Search;


