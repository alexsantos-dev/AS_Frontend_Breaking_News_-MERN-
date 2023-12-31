import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchNews } from "../../services/news.services";
import { Card } from "../../components/Card/Card";
import { SearchNews, ContainerResults, TextResults } from "./Search.styles";

export function Search() {
  const { title } = useParams([]);
  const [post, setPost] = useState([]);

  async function search() {
    try {
      const postApi = await searchNews(title);
      setPost(postApi.data.findTitle);
      console.log(postApi);
    } catch (err) {
      console.log(err);
      setPost([]);
    }
  }

  useEffect(() => {
    search();
  }, [title]);

  return (
    <>
      <ContainerResults>
        <TextResults>
          <span>
            {post.length !== 0
              ? `Encontramos ${post.length} ${
                  post.length > 1 ? "resultados" : "resultado"
                } para '${title}'`
              : `Nenhum resultado encontrado`}
          </span>
        </TextResults>
        <SearchNews>
          {post.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              text={item.text}
              banner={item.banner}
              likes={item.likes}
              comments={item.comments}
            />
          ))}
        </SearchNews>
      </ContainerResults>
    </>
  );
}
