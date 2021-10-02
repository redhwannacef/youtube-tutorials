import { useInfiniteQuery } from "react-query";
import { useEffect } from "react";

const fetchRepositories = async (page = 1) => {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=topic:reactjs&per_page=30&page=${page}`
  );
  return response.json();
};

const App = () => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    "repositories",
    ({ pageParam = 1 }) => fetchRepositories(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPages = lastPage.total_count / 30;
        const nextPage = allPages.length + 1;
        return nextPage <= maxPages ? nextPage : undefined;
      },
    }
  );

  useEffect(() => {
    let fetching = false;
    const onScroll = async (event) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  console.log(data);

  return (
    <main>
      <h1>Infinite Scroll</h1>
      <ul>
        {data.pages.map((page) =>
          page.items.map((repo) => (
            <li key={repo.id}>
              <p>
                <b>{repo.name}</b>
              </p>
              <p>{repo.description}</p>
            </li>
          ))
        )}
      </ul>
    </main>
  );
};

export default App;
