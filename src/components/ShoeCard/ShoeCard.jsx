import React from 'react';
import styled from 'styled-components';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'
  const variantName = {
    'new-release': 'Just Released!',
    'on-sale': 'Sale',
  }

  console.log(`${name} price is ${price} and salePrice is ${salePrice}`)

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        {variant !== 'default' ? (<Variant variant={variant}>{variantName[variant]}</Variant>) : ""}
        <Spacer size={12} />
        <PriceRow>
          <Name>{name}</Name>
          <Price salePrice={salePrice}>
            <p>{formatPrice(price)}</p>
            {salePrice ? <SalePrice>{formatPrice(salePrice)}</SalePrice> : ""}
          </Price>
        </PriceRow>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 300px;
`;

const Wrapper = styled.article`
  position: relative;
  isolation: isolate;
`;

const Variant = styled.span`
  position: absolute;
  top: 12px;
  right: -4px;
  background-color: ${(p) => p.variant === 'on-sale' ? COLORS.primary : COLORS.secondary};
  border-radius: 2px;
  padding: 8px 16px;
  text-align: center;
  color: ${COLORS.white};
  font-weight: 700;
  font-size: ${14/16}rem;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
`;

const PriceRow = styled(Row)`
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  position: relative;
  &>p {
    text-decoration: ${(p) => p.salePrice ? "line-through" : "none"};
    color: ${(p) => p.salePrice ? COLORS.gray[700] : COLORS.gray[900]};
  }
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  position: absolute;
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
