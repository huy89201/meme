import { useEffect, useState } from "react";

function usePaging({ itemPaging = [], pageSize = 3, currPage = 1 } = {}) {
  // if(!itemPaging)

  const [lastItem, setLastItem] = useState(pageSize);
  const totalItems = itemPaging.length;
  const currentItem = itemPaging.slice(0, lastItem);

  console.log(itemPaging);


  const handleLoadMore = () => {
    if (lastItem > totalItems) return;

    setLastItem(lastItem + 3);
  };

  return {
    handleLoadMore,
    currentItem,
  };
}

export default usePaging;
