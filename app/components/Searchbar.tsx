import { Input } from '@/components/ui/input';
import { useCallback, useState } from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string;
  className?: string;
}

const Searchbar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search...',
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
      onSearch(value);
    },
    [onSearch]
  );

  return (
    <Input
      value={searchTerm}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder={placeholder}
      className="min-w-[350px] my-6 max-w-[500px] md:max-w-[600px] h-12"
    />
  );
};

export default Searchbar;
