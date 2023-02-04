import {
  Wrapper,
  Container,
  Circle,
  Line,
  MidContainer,
  GraphContainer,
  Title,
  RightContainer,
  RightTopContainer,
  DateTime,
  Description,
} from './styled';

export interface Section {
  title: string;
  person: string;
  datetime: string;
  description?: string;
}

export interface TimelineProps {
  sections: Section[];
}

const Timeline: React.FC<TimelineProps> = ({ sections }) => {
  return (
    <Wrapper>
      {sections.map(({ title, person, description, datetime }, i) => (
        <Container key={i}>
          <GraphContainer>
            <Circle />
            <Line hidden={i === sections.length - 1} />
          </GraphContainer>
          <MidContainer>
            <Title>{title}</Title>
          </MidContainer>
          <RightContainer>
            <RightTopContainer>
              <Title>{person}</Title>
              <DateTime>{datetime}</DateTime>
            </RightTopContainer>
            <Description>{description}</Description>
          </RightContainer>
        </Container>
      ))}
    </Wrapper>
  );
};

export default Timeline;
