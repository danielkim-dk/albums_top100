import React from "react";

const topdata = "";
const data = JSON.parse(topdata);

export default function FavoritesPage() {
	return <div>{data?.feed?.entry?.length}</div>;
}
