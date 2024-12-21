import { useState, useEffect, useCallback } from "react";

interface CachedItem<T> {
	value: string;
	expiry: number;
}

const useFetchData = <T>(
	key: string,
	apiFetchFunction: () => Promise<Response>,
	ttl = 1000 * 60 * 5
) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const itemStr = localStorage.getItem(key);
			if (itemStr) {
				try {
					const item = JSON.parse(itemStr) as CachedItem<T>;
					const parsedValue = JSON.parse(item.value);
					const now = Date.now();

					// Check if the cache is valid and contains actual data
					if (
						now < item.expiry &&
						parsedValue &&
						(Array.isArray(parsedValue)
							? parsedValue.length > 0
							: Object.keys(parsedValue).length > 0)
					) {
						setData(parsedValue);
						setLoading(false);
						return;
					}
				} catch (e) {
					// If there's any error parsing the cached data, remove it
					console.log(e);
					localStorage.removeItem(key);
				}
			}

			const response = await apiFetchFunction();

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			console.log(
				"Hook received data with entries:",
				data.feed?.entry?.length
			);

			if (data) {
				const expiry = Date.now() + ttl;
				const item = {
					value: JSON.stringify(data),
					expiry,
				};
				localStorage.setItem(key, JSON.stringify(item));
			}

			setData(data);
			setLoading(false);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Error Fetching Data"
			);
		} finally {
			setLoading(false);
		}
	}, [key, ttl]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { data, loading, error };
};

export default useFetchData;
