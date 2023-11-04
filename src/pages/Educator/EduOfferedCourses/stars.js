import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";

const Star = ({ stars, reviews }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    debugger;
    return (
      <span className="stars" key={index}>
        {stars >= index + 1 ? (
          <FaStar className="icon" />
        ) : stars >= number ? (
          <FaStarHalfAlt className="icon" />
        ) : (
          <AiOutlineStar className="icon" />
        )}
      </span>
    );
  });

  return (
    <Wrapper>
      <div className="icon-style">
        {ratingStar}
    </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  
    .icon {
      font-size: 3rem;
      color: #FFC436;
      margin-left : 20px;
    }

    .empty-icon {
      font-size: 3.5rem;
      color: #FFC436;
      margin-left : 20px;
    }

    .stars:nth-child(1){
        margin-left : -20px;
    }


    @media(max-width: 600px) {
      .icon-style {
        display: flex;
        gap: 0.2rem;
        align-items: center;
        justify-content: flex-start;
      }    
      .icon {
        fontsize : 0 rem;
      }

      .empty-icon{
        fontsize : 0 rem
      }
    }
    
  }
`;

export default Star;