import { ChangeEvent, FormEvent, useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center w-full max-w-3xl mx-auto"
    >
      <input
        type="text"
        className="border-gray-300 text-black rounded-l py-2 px-4 w-full focus:outline-none focus:border-blue-500"
        value={query}
        onChange={handleChange}
        placeholder="Search for a movie..."
      />
      <button
        type="submit"
        className="bg-red-600 text-white py-2 px-6 rounded-r hover:bg-blue-600 focus:outline-none"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
