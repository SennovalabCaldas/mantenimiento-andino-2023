import React, { useEffect, useState } from "react";
import { Tab } from "semantic-ui-react";
import NewsComponent from "../../../components/Admin/News/NewsComponent/NewsComponent";
// import "./News.scss";
import { CategoryManagement } from "../../../components/Admin/Category/CategoryManagement";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../../actions/postActions";

export const News = () => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const news = useSelector((state) => state.post.allPosts);
  console.log("News.js", news);
  // Se ejecutará cada vez que dispatch cambie
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllPosts());
      } catch (error) {
        console.error("Error al obtener las noticias:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const panes = [
    {
      menuItem: "Categorías",
      render: () => (
        <Tab.Pane>
          <CategoryManagement news={news} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Noticias",
      render: () => (
        <Tab.Pane>
          <NewsComponent />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div>
      <div className="title-section">
        <h2>Actualidad</h2>
      </div>
      <div className="news-page">
        <Tab
          panes={panes}
          activeIndex={activeTab}
          onTabChange={(_, data) => setActiveTab(data.activeIndex)}
          className="custom-tab"
        />
      </div>
    </div>
  );
};
