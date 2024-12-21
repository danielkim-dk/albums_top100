import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";

interface SearchBarProps {
	onSearch: (term: string) => void;
	placeholder?: string;
	className?: string;
}

const Searchbar: React.FC<SearchBarProps> = ({
	onSearch,
	placeholder = "Search...",
	className = "w-[400px]",
}) => {
	const [searchTerm, setSearchTerm] = useState("");

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
			className={className}
		/>
	);
};

export default Searchbar;
