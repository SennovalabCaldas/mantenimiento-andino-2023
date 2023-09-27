import React, { useEffect, useState } from "react";
import "./WebClient.scss";
import { useDispatch, useSelector } from "react-redux";
import { Mapa } from "../../../components/GeneralLayout";
import { getAllClients } from "../../../actions/clientActions";
import { useTheme } from "@mui/material/styles";
import SliderMenuClients from "./SliderMenuClients";
import { CardClient } from "./CardClient";
import { ENV } from "../../../utils";

export const WebClients = ({ clients }) => {
  const baseApi = ENV.BASE_PATH;

  const handleCategoryClick = (index) => {
    setSelectedCategory(index);
  };
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [avatarsList, setAvatarsList] = useState([]);

  const [menuItems] = useState([
    { text: "NACIONALES" },
    { text: "INTERNACIONALES" },
  ]);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [addressList, setAddressList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getAllClients());
      } catch (error) {
        console.error(error);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    const initialCategoryIndex = menuItems.findIndex(
      (item) => item.text === "NACIONALES"
    );
    setSelectedCategory(initialCategoryIndex);
  }, []);

  useEffect(() => {
    [].slice
      .call(document.querySelectorAll('a[href="#"'))
      .forEach(function (el) {
        el.addEventListener("click", function (ev) {
          ev.preventDefault();
        });
      });
  }, []);

  useEffect(() => {
    const fetchAddresses = async () => {
      const addresses = await Promise.all(
        clients.map(async (client) => {
          try {
            // const result = await getAddress(client.direccion);
            // return result;
          } catch (error) {
            console.error("Error al obtener la dirección del cliente:", error);
            return "Dirección no disponible";
          }
        })
      );
      setAddressList(addresses);
    };

    fetchAddresses();
  }, [clients]);

  useEffect(() => {
    const shuffledAvatars = shuffleArray(
      clients.map((client) => `${baseApi}/${client.avatar}`)
    );
    const requiredCells = clients.length > 12 ? clients.length : 12;
    const filledAvatars = [...shuffledAvatars];
    while (filledAvatars.length < requiredCells) {
      filledAvatars.push(shuffledAvatars.pop());
    }
    setAvatarsList(filledAvatars);
  }, [clients]);

  return (
    <div className="content-client-section">
      <h2>Clientes</h2>
      <SliderMenuClients
        menuItems={menuItems}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="content-service">
        {menuItems.map((category, index) => (
          <div key={index}>
            <h2
              className={index === selectedCategory ? "selected" : "hidden"}
              onClick={() => setSelectedCategory(index)}
            ></h2>
            <div
              className={`grid ${
                index === selectedCategory ? "visible" : "hidden"
              }`}
            >
              {index === selectedCategory && (
                <>
                  {category.text === "NACIONALES" && (
                    <>
                      <Mapa />
                      <div className="item-clients-section">
                        <div>
                          <CardClient
                            clients={clients.filter(
                              (client) => client.national === true
                            )}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {category.text === "INTERNACIONALES" && (
                    <>
                      <div className="item-clients-section">
                        {/* Filtrar clientes internacionales */}
                        <CardClient
                          clients={clients.filter(
                            (client) => client.national === false
                          )}
                        />
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Función para mezclar aleatoriamente un array (Fisher-Yates Shuffle)
function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
