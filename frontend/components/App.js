import OffersListAndMap from "../components/OffersListAndMap";
import Header from "../components/Header/Header";
import FiltersBar from "../components/FiltersBar/FilterBar";
import styled from "styled-components";

const AppWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default function Home() {
  return (
    <AppWrapper>
      <Header />
      <FiltersBar />
      <OffersListAndMap />
    </AppWrapper>
  );
}
