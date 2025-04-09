import Home_V1 from "./(home)/home-v5/page";
import Wrapper from "./layout-wrapper/wrapper";

export const metadata = {
  title: "PayParking - Home",
  description: "PayParking - Home",
  
};

export default function MainRoot() {
  return (
    <Wrapper>
      <Home_V1 />
    </Wrapper>
  );
}
